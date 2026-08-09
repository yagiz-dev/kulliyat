import { Component, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { apiErrorMessage } from '../../interceptors/api-error';
import { BookCopy } from '../../models/copy';
import { Loan } from '../../models/loan';
import { Member } from '../../models/member';
import { CopyService } from '../../services/copy';
import { LoanService } from '../../services/loan';
import { MemberService } from '../../services/member';

@Component({ selector: 'app-checkout', standalone: true, imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, RouterLink], templateUrl: './checkout.html', styleUrl: './checkout.css' })
export class CheckoutComponent {
  private readonly memberService = inject(MemberService);
  private readonly copyService = inject(CopyService);
  private readonly loanService = inject(LoanService);
  private readonly route = inject(ActivatedRoute);
  readonly memberSearch = signal('');
  readonly members = signal<Member[]>([]);
  readonly memberSearchPerformed = signal(false);
  readonly selectedMember = signal<Member | null>(null);
  readonly inventoryNumber = signal('');
  readonly selectedCopy = signal<BookCopy | null>(null);
  readonly loadingMembers = signal(false);
  readonly checkingCopy = signal(false);
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly completedLoan = signal<Loan | null>(null);

  constructor() {
    afterNextRender(() => {
      const memberId = Number(this.route.snapshot.queryParamMap.get('memberId'));
      if (memberId) this.preselectMember(memberId);
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
  selectMember(member: Member): void { this.selectedMember.set(member); this.selectedCopy.set(null); this.error.set(''); }
  initials(member: Member): string { return `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`.toLocaleUpperCase('tr-TR'); }

  lookupCopy(): void {
    const inventory = this.inventoryNumber().trim();
    if (!inventory) return;
    this.checkingCopy.set(true); this.selectedCopy.set(null); this.error.set('');
    this.copyService.list(inventory, undefined, 0, 10).pipe(finalize(() => this.checkingCopy.set(false))).subscribe({
      next: (response) => {
        const copy = response.content.find((item) => item.inventoryNumber.toLocaleUpperCase('tr-TR') === inventory.toLocaleUpperCase('tr-TR')) ?? null;
        this.selectedCopy.set(copy);
        if (!copy) this.error.set('Bu envanter numarasıyla eşleşen bir nüsha bulunamadı.');
      },
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }

  checkout(): void {
    const member = this.selectedMember(); const copy = this.selectedCopy();
    if (!member || !copy || copy.status !== 'AVAILABLE' || this.submitting()) return;
    this.submitting.set(true); this.error.set('');
    this.loanService.checkout(member.id, copy.inventoryNumber).pipe(finalize(() => this.submitting.set(false))).subscribe({ next: (loan) => this.completedLoan.set(loan), error: (error) => this.error.set(apiErrorMessage(error)) });
  }
  reset(): void { this.completedLoan.set(null); this.selectedMember.set(null); this.selectedCopy.set(null); this.inventoryNumber.set(''); this.memberSearch.set(''); this.members.set([]); this.memberSearchPerformed.set(false); }
  formatDate(value: string): string { return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`)); }
}
