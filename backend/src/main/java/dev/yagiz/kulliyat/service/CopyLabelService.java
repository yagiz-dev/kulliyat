package dev.yagiz.kulliyat.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import dev.yagiz.kulliyat.dto.ApiDtos.CopyLabelRequest;
import dev.yagiz.kulliyat.entity.BookCopy;
import dev.yagiz.kulliyat.repository.BookCopyRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CopyLabelService {
    private static final int COLUMNS = 4;
    private static final int ROWS = 5;
    private static final int LABELS_PER_PAGE = COLUMNS * ROWS;
    private static final float POINTS_PER_MM = 72f / 25.4f;
    private static final float LABEL_SIZE = 42f * POINTS_PER_MM;
    private static final float LABEL_GAP = 4f * POINTS_PER_MM;
    private static final Color BRAND = new Color(0x73, 0x1e, 0x30);
    private static final Color BORDER = new Color(0xdc, 0xd2, 0xd5);

    private final BookCopyRepository bookCopyRepository;

    public CopyLabelService(BookCopyRepository bookCopyRepository) {
        this.bookCopyRepository = bookCopyRepository;
    }

    @Transactional(readOnly = true)
    public byte[] createLabels(CopyLabelRequest request) {
        List<BookCopy> copies = orderedCopies(request.copyIds());
        int startPosition = request.startPosition() == null ? 1 : request.startPosition();
        try (PDDocument document = new PDDocument();
             InputStream semiboldStream = font("Poppins-SemiBold.ttf")) {
            PDFont semibold = PDType0Font.load(document, semiboldStream);
            int pageCount = (int) Math.ceil((startPosition - 1 + copies.size()) / (double) LABELS_PER_PAGE);

            for (int pageIndex = 0; pageIndex < pageCount; pageIndex++) {
                PDPage page = new PDPage(PDRectangle.A4);
                document.addPage(page);
                try (PDPageContentStream content = new PDPageContentStream(document, page)) {
                    for (int slot = 0; slot < LABELS_PER_PAGE; slot++) {
                        int absoluteSlot = pageIndex * LABELS_PER_PAGE + slot;
                        int copyIndex = absoluteSlot - (startPosition - 1);
                        if (copyIndex < 0 || copyIndex >= copies.size()) continue;
                        drawLabel(content, page, copies.get(copyIndex), slot, semibold);
                    }
                }
            }

            document.getDocumentInformation().setTitle("Külliyat nüsha etiketleri");
            document.getDocumentInformation().setCreator("Külliyat Kütüphane Yönetim Sistemi");
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            document.save(output);
            return output.toByteArray();
        } catch (IOException | WriterException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Etiket PDF'i oluşturulamadı", exception);
        }
    }

    private List<BookCopy> orderedCopies(List<Long> ids) {
        Map<Long, BookCopy> byId = new HashMap<>();
        bookCopyRepository.findAllById(ids).forEach(copy -> byId.put(copy.getId(), copy));
        List<Long> missingIds = ids.stream().filter(id -> !byId.containsKey(id)).distinct().toList();
        if (!missingIds.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nüsha bulunamadı: " + missingIds);
        }
        return ids.stream().map(byId::get).toList();
    }

    private void drawLabel(PDPageContentStream content, PDPage page, BookCopy copy, int slot, PDFont semibold)
            throws IOException, WriterException {
        float gridWidth = COLUMNS * LABEL_SIZE + (COLUMNS - 1) * LABEL_GAP;
        float gridHeight = ROWS * LABEL_SIZE + (ROWS - 1) * LABEL_GAP;
        float horizontalMargin = (page.getMediaBox().getWidth() - gridWidth) / 2;
        float verticalMargin = (page.getMediaBox().getHeight() - gridHeight) / 2;
        int column = slot % COLUMNS;
        int row = slot / COLUMNS;
        float x = horizontalMargin + column * (LABEL_SIZE + LABEL_GAP);
        float y = page.getMediaBox().getHeight() - verticalMargin - (row + 1) * LABEL_SIZE - row * LABEL_GAP;

        content.setStrokingColor(BORDER);
        content.setLineWidth(.55f);
        content.addRect(x, y, LABEL_SIZE, LABEL_SIZE);
        content.stroke();

        float qrSize = 31.5f * POINTS_PER_MM;
        float qrX = x + (LABEL_SIZE - qrSize) / 2;
        float qrY = y + 5.25f * POINTS_PER_MM;
        drawQr(content, copy.getInventoryNumber(), qrX, qrY, qrSize);

        drawCenteredText(content, semibold, 8.5f, BRAND, x, y + LABEL_SIZE - 4.8f * POINTS_PER_MM,
                LABEL_SIZE, "KÜLLİYAT");
        drawCenteredText(content, semibold, 6.8f, Color.BLACK, x, y + 3.3f * POINTS_PER_MM,
                LABEL_SIZE, copy.getInventoryNumber());
    }

    private void drawQr(PDPageContentStream content, String value, float x, float y, float size)
            throws WriterException, IOException {
        Map<EncodeHintType, Object> hints = Map.of(
                EncodeHintType.CHARACTER_SET, "UTF-8",
                EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M,
                EncodeHintType.MARGIN, 0
        );
        BitMatrix matrix = new QRCodeWriter().encode(value, BarcodeFormat.QR_CODE, 33, 33, hints);
        float module = size / matrix.getWidth();
        content.setNonStrokingColor(Color.BLACK);
        for (int matrixY = 0; matrixY < matrix.getHeight(); matrixY++) {
            for (int matrixX = 0; matrixX < matrix.getWidth(); matrixX++) {
                if (matrix.get(matrixX, matrixY)) {
                    content.addRect(x + matrixX * module, y + (matrix.getHeight() - matrixY - 1) * module,
                            module + .05f, module + .05f);
                }
            }
        }
        content.fill();
    }

    private void drawText(PDPageContentStream content, PDFont font, float size, Color color,
                          float x, float y, String text) throws IOException {
        content.beginText();
        content.setFont(font, size);
        content.setNonStrokingColor(color);
        content.newLineAtOffset(x, y);
        content.showText(text);
        content.endText();
    }

    private void drawCenteredText(PDPageContentStream content, PDFont font, float size, Color color,
                                  float x, float y, float width, String text) throws IOException {
        float textX = x + (width - width(text, font, size)) / 2;
        drawText(content, font, size, color, textX, y, text);
    }

    private String fit(String value, PDFont font, float fontSize, float maxWidth) throws IOException {
        if (value == null || value.isBlank()) return "";
        String normalized = value.trim().replaceAll("\\s+", " ");
        if (width(normalized, font, fontSize) <= maxWidth) return normalized;
        String ellipsis = "…";
        int end = normalized.length();
        while (end > 1 && width(normalized.substring(0, end).trim() + ellipsis, font, fontSize) > maxWidth) end--;
        return normalized.substring(0, end).trim() + ellipsis;
    }

    private float width(String value, PDFont font, float fontSize) throws IOException {
        return font.getStringWidth(value) / 1000f * fontSize;
    }

    private InputStream font(String name) {
        InputStream stream = getClass().getResourceAsStream("/fonts/" + name);
        if (stream == null) throw new IllegalStateException("Etiket fontu bulunamadı: " + name);
        return stream;
    }
}
