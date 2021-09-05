import { Component, OnInit, Input, ContentChild, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any
  @Input() label: string
  @Input() errorMessage: string
  @Input() description: string
  @Input() require: boolean
  @Input() hidden: boolean = false
  @Input() inline: boolean = false
  @Input() options: any[]
  @Output() setObjectSelected = new EventEmitter();

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

  ngAfterContentInit() {
    this.input = this.model || this.control
    if (this.input === undefined)
      throw new Error("Este componente precisa ser utilizado com a diretiva NgModule ou FormControlName")
  }

  get getErrorMessage() {
    if (this.hasError()) {
      let errors: any = this.control.errors;
      if (this.errorMessage)
        return this.errorMessage
      if (errors.required)
        return "Campo obrigatório!"
      if (errors.email)
        return "E-mail inválido!"
      if (errors.maxlength)
        return `Campo com máximo de ${errors.maxlength.requiredLength} dígitos!`
      if (errors.minlength)
        return `Campo com mínimo de ${errors.minlength.requiredLength} dígitos!`
      if (errors.pattern)
        return "Formato inválido!"
      else
        return "Campo inválido!"
    }

    return ""
  }

  ngOnInit() {
  }

  setOptionSelected(itemSelected: any) {
    if (itemSelected && this.setObjectSelected) {
      this.setObjectSelected.emit(itemSelected);
      this.options = [];
    }
  }

}
