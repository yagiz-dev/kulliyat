import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({ selector: 'app-placeholder', standalone: true, imports: [RouterLink], templateUrl: './placeholder.html', styleUrl: './placeholder.css' })
export class PlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title = this.route.snapshot.data['title'] as string;
  readonly description = this.route.snapshot.data['description'] as string;
}
