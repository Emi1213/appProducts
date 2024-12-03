import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {
  @Input() icon!: string;
  @Input() placeholder!: string;
  @Input() type!: string;
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() autocomplete!: string;
  @Input() control!: FormControl;
  isPassword!: boolean;
  showPassword!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isPassword = this.type === 'password';
    this.showPassword = false;
  }

  tooglePassword() {
    this.showPassword = !this.showPassword;
    if(this.showPassword) this.type = 'password';
    else this.type = 'text';
  }
}
