import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPageComponent implements OnInit {
  private _title = inject(Title);
  private _meta = inject(Meta);
  private _platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // Check if the current platform is the server or browser
    // if (!isPlatformServer(this._platform)) {
    //   document.title = 'Pricing';
    // }

    this._title.setTitle('Pricing');
    this._meta.updateTag({ name: 'description', content: 'Prove of SRR in Angular v19' });
    this._meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this._meta.updateTag({ name: 'keywords', content: 'Angular, Pricing, SSR, Example' });
  }
}
