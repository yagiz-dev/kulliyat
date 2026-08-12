package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.dto.ApiDtos.SystemInfoResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootVersion;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.lang.management.ManagementFactory;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;

@Service
public class SystemInfoService {
    private final DataSource dataSource;
    private final String environment;

    public SystemInfoService(DataSource dataSource,
                             @Value("${app.environment:development}") String environment) {
        this.dataSource = dataSource;
        this.environment = environment;
    }

    public SystemInfoResponse getSystemInfo() {
        OffsetDateTime serverTime = OffsetDateTime.now();
        long startedAtMillis = ManagementFactory.getRuntimeMXBean().getStartTime();
        OffsetDateTime startedAt = OffsetDateTime.ofInstant(Instant.ofEpochMilli(startedAtMillis), ZoneId.systemDefault());
        long uptimeSeconds = Math.max(0, (System.currentTimeMillis() - startedAtMillis) / 1000);

        DatabaseProduct database = getDatabaseProduct();
        return new SystemInfoResponse(environment, startedAt, serverTime, uptimeSeconds, ZoneId.systemDefault().getId(),
                System.getProperty("java.version"), SpringBootVersion.getVersion(), database.name(), database.version());
    }

    private DatabaseProduct getDatabaseProduct() {
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metadata = connection.getMetaData();
            return new DatabaseProduct(metadata.getDatabaseProductName(), metadata.getDatabaseProductVersion());
        } catch (SQLException exception) {
            throw new IllegalStateException("Veritabanı bilgileri okunamadı", exception);
        }
    }

    private record DatabaseProduct(String name, String version) {}
}
