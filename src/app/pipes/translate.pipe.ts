import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'trans',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private sub: Subscription;
  private currentVal = '';
  private lastKey = '';
  private lastFallback?: string;

  constructor(
    private transService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.sub = this.transService.currentLang$.subscribe(() => {
      if (this.lastKey) {
        this.currentVal = this.transService.t(this.lastKey, this.lastFallback);
        this.cdr.markForCheck();
      }
    });
  }

  transform(key: string, fallback?: string): string {
    this.lastKey = key;
    this.lastFallback = fallback;
    this.currentVal = this.transService.t(key, fallback);
    return this.currentVal;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
