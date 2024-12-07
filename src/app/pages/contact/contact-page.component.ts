import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent implements OnInit {
  private _title = inject(Title);
  private _meta = inject(Meta);

  ngOnInit(): void {
    this._title.setTitle('Contact');
    this._meta.updateTag({ name: 'description', content: 'Prove of SRR in Angular v19' });
    this._meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this._meta.updateTag({ name: 'keywords', content: 'Angular, Contact, SSR, Example' });
  }
}
