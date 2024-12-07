import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent implements OnInit {
  private _title = inject(Title);
  private _meta = inject(Meta);

  ngOnInit(): void {
    this._title.setTitle('About');
    this._meta.updateTag({ name: 'description', content: 'Prove of SRR in Angular v19' });
    this._meta.updateTag({ name: 'og:title', content: 'About Page' });
    this._meta.updateTag({ name: 'keywords', content: 'Angular, About, SSR, Example' });
  }
}
