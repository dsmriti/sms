import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-pizza-status',
  templateUrl: './pizza-status.component.html',
  styleUrls: ['./pizza-status.component.css']
})
export class PizzaStatusComponent implements OnInit {

  numberForm: FormGroup;
  order: any;

  constructor( private db: AngularFireDatabase, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm()
    this.order = this.db.object('/orders/testPizza123')
  }

  updatePhoneNumber() {
      this.order.update({ phoneNumber: this.e164 })
  }

  buildForm() {
    this.numberForm = this.fb.group({
      country: this.validateMinMax(1, 2),
      area:    this.validateMinMax(3, 3),
      prefix:  this.validateMinMax(3, 3),
      line:    this.validateMinMax(4, 4)
    });
  }

  /// helper to add validations to form based on min/max length
  validateMinMax(min, max) {
    return ['', [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern('[0-9]+')  // validates input is digit
    ]]
  }

  /// converts the current form values to E164
  get e164() {
    const form = this.numberForm.value
    const num = form.country + form.area + form.prefix + form.line
    return `+${num}`
  }


}
