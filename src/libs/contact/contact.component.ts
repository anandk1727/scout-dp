import { Component, effect, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { contactStore } from './store/contact.store';
import { MessageModule } from 'primeng/message';
import { EMAIL_REGEX } from '@shared/constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [InputTextModule, TextareaModule, ReactiveFormsModule, ButtonModule, MessageModule],
  providers: [contactStore],
})
export class ContactComponent {
  private _fb = inject(FormBuilder);
  protected store = inject(contactStore);

  protected readonly form = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    company: ['', [Validators.minLength(2), Validators.maxLength(10)]],
    employee_count: [''],
    message: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      if (this.store.status() === 'success') this.form.reset();
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      console.log(this.form.get('name')?.errors);
      return;
    }

    this.store.submit(this.form.getRawValue());
  }
}
