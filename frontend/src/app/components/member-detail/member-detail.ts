import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Member } from '../../models/member';

@Component({ selector: 'app-member-detail', standalone: true, imports: [MatButtonModule, MatIcon, RouterLink], templateUrl: './member-detail.html', styleUrl: './member-detail.css' })
export class MemberDetailComponent {
  @Input({ required: true }) member!: Member;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Member>();
  initials(): string { return `${this.member.firstName.charAt(0)}${this.member.lastName.charAt(0)}`.toLocaleUpperCase('tr-TR'); }
  joinedDate(): string { return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(this.member.joinedAt)); }
}
