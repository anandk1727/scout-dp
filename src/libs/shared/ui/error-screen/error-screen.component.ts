import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-screen',

  templateUrl: './error-screen.component.html',
})
export class ErrorScreenComponent {
  message = input<string>('An unexpected error occurred while loading the data.');

  retry = output<void>();

  onRetry() {
    this.retry.emit();
  }
}
