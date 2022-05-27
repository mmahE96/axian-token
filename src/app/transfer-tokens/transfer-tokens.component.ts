import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transfer-tokens',
  templateUrl: './transfer-tokens.component.html',
  styleUrls: ['./transfer-tokens.component.css']
})
export class TransferTokensComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(form:NgForm){
    console.log(form.value.toAddress)
    console.log(form.value.fromAddress)
  }

}
