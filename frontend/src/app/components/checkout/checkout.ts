import { Component, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { Book } from '../../models/book';
import { BookCopy } from '../../models/copy';
import { Loan } from '../../models/loan';
import { Member } from '../../models/member';
import { CopyService } from '../../services/copy';
import { BookService } from '../../services/book';
import { LoanService } from '../../services/loan';
import { MemberService } from '../../services/member';

@Component({ selector: 'app-checkout', standalone: true, imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, RouterLink], templateUrl: './checkout.html', styleUrl: './checkout.css' })
export class CheckoutComponent {
  private readonly memberService = inject(MemberService);
  private readonly copyService = inject(CopyService);
  private readonly bookService = inject(BookService);
  private readonly loanService = inject(LoanService);
  private readonly route = inject(ActivatedRoute);
  readonly memberSearch = signal('');
  readonly members = signal<Member[]>([]);
  readonly memberSearchPerformed = signal(false);
  readonly selectedMember = signal<Member | null>(null);
  readonly inventoryNumber = signal('');
  readonly selectedCopy = signal<BookCopy | null>(null);
  readonly selectedBookDetails = signal<Book | null>(null);
  readonly selectedCopyLoan = signal<Loan | null>(null);
  readonly loadingBookDetails = signal(false);
  readonly loadingCopyLoan = signal(false);
  readonly preselectedBookId = signal<number | null>(null);
  readonly loadingMembers = signal(false);
  readonly checkingCopy = signal(false);
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly copyError = signal('');
  readonly completedLoan = signal<Loan | null>(null);

  constructor() {
    afterNextRender(() => {
      const memberId = Number(this.route.snapshot.queryParamMap.get('memberId'));
      if (memberId) this.preselectMember(memberId);
      const bookId = Number(this.route.snapshot.queryParamMap.get('bookId'));
      if (bookId) this.preselectBook(bookId);
    });
  }

  searchMembers(): void {
    const search = this.memberSearch().trim();
    if (!search) {
      this.members.set([]);
      this.memberSearchPerformed.set(false);
      return;
    }
    this.memberSearchPerformed.set(true);
    this.loadingMembers.set(true); this.error.set('');
    this.memberService.list(search, 0, 12).pipe(finalize(() => this.loadingMembers.set(false))).subscribe({ next: (response) => this.members.set(response.content), error: (error) => this.error.set(apiErrorMessage(error)) });
  }
  preselectMember(id: number): void { this.loadingMembers.set(true); this.memberService.get(id).pipe(finalize(() => this.loadingMembers.set(false))).subscribe({ next: (member) => { this.selectedMember.set(member); this.members.set([member]); }, error: (error) => this.error.set(apiErrorMessage(error)) }); }
  preselectBook(id: number): void { this.preselectedBookId.set(id); this.checkingCopy.set(true); this.copyError.set(''); this.copyService.list('', 'AVAILABLE', 0, 1, '', id).pipe(finalize(() => this.checkingCopy.set(false))).subscribe({ next: (response) => { const copy = response.content[0] ?? null; this.setSelectedCopy(copy); this.inventoryNumber.set(copy?.inventoryNumber ?? ''); if (!copy) this.copyError.set('Bu kitap için ödünç verilebilir nüsha bulunamadı.'); }, error: (error) => this.copyError.set(apiErrorMessage(error)) }); }
  selectMember(member: Member): void { this.selectedMember.set(member); if (!this.preselectedBookId()) this.setSelectedCopy(null); this.error.set(''); this.copyError.set(''); }
  initials(member: Member): string { return `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`.toLocaleUpperCase('tr-TR'); }

  lookupCopy(): void {
    const inventory = this.inventoryNumber().trim();
    if (!inventory) return;
    this.checkingCopy.set(true); this.setSelectedCopy(null); this.copyError.set('');
    this.copyService.list(inventory, undefined, 0, 10).pipe(finalize(() => this.checkingCopy.set(false))).subscribe({
      next: (response) => {
        const copy = response.content.find((item) => item.inventoryNumber.toLocaleUpperCase('tr-TR') === inventory.toLocaleUpperCase('tr-TR')) ?? null;
        this.setSelectedCopy(copy);
        if (!copy) this.copyError.set('Bu envanter numarasıyla eşleşen bir nüsha bulunamadı.');
      },
      error: (error) => this.copyError.set(apiErrorMessage(error)),
    });
  }

  setSelectedCopy(copy: BookCopy | null): void {
    this.selectedCopy.set(copy);
    this.selectedBookDetails.set(null);
    this.selectedCopyLoan.set(null);
    this.loadingBookDetails.set(!!copy);
    this.loadingCopyLoan.set(copy?.status === 'LOANED');
    if (copy) this.bookService.getBook(copy.book.id).subscribe({
      next: (book) => {
        if (this.selectedCopy()?.id !== copy.id) return;
        this.selectedBookDetails.set(book);
        this.loadingBookDetails.set(false);
      },
      error: () => {
        if (this.selectedCopy()?.id !== copy.id) return;
        this.loadingBookDetails.set(false);
      },
    });
    if (copy?.status === 'LOANED') this.loanService.list('ACTIVE', 0, 1, undefined, { copyId: copy.id }).subscribe({
      next: (response) => {
        if (this.selectedCopy()?.id !== copy.id) return;
        this.selectedCopyLoan.set(response.content[0] ?? null);
        this.loadingCopyLoan.set(false);
      },
      error: () => {
        if (this.selectedCopy()?.id !== copy.id) return;
        this.loadingCopyLoan.set(false);
      },
    });
  }

  coverUrl(copy: BookCopy): string | null { return copy.book.coverImageUrl?.trim() || null; }
  authorNames(): string { return this.loadingBookDetails() ? 'Yazar bilgisi yükleniyor' : this.selectedBookDetails()?.authors.map((author) => author.name).join(', ') || 'Yazar belirtilmemiş'; }
  publisherName(): string { return this.loadingBookDetails() ? 'Yükleniyor' : this.selectedBookDetails()?.publisher?.name || 'Yayınevi belirtilmemiş'; }
  statusLabel(copy: BookCopy): string { return ({ AVAILABLE: 'Ödünç verilebilir', LOANED: 'Ödünçte', MAINTENANCE: 'Bakımda', LOST: 'Kayıp' })[copy.status]; }
  overdueDays(loan: Loan): number { return loan.overdue ? Math.max(1, Math.floor((Date.now() - new Date(`${loan.dueDate}T00:00:00`).getTime()) / 86400000)) : 0; }

  checkout(): void {
    const member = this.selectedMember(); const copy = this.selectedCopy();
    if (!member || !copy || copy.status !== 'AVAILABLE' || this.submitting()) return;
    this.submitting.set(true); this.error.set('');
    this.loanService.checkout(member.id, copy.inventoryNumber).pipe(finalize(() => this.submitting.set(false))).subscribe({ next: (loan) => this.completedLoan.set(loan), error: (error) => this.error.set(apiErrorMessage(error)) });
  }
  reset(): void { this.completedLoan.set(null); this.selectedMember.set(null); this.setSelectedCopy(null); this.preselectedBookId.set(null); this.inventoryNumber.set(''); this.memberSearch.set(''); this.members.set([]); this.memberSearchPerformed.set(false); this.copyError.set(''); }
  formatDate(value: string): string { return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`)); }
}
