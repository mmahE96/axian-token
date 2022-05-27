import { Component, OnInit } from '@angular/core';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  Connection,
  clusterApiUrl,
  PublicKey,
} from '@solana/web3.js';
import {
  createMint,
  Mint,
  getMint,
  getOrCreateAssociatedTokenAccount,
  getAccount,
  mintTo,
} from '@solana/spl-token';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  connection: Connection;
  tokenAccount:any;

  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
   }

  ngOnInit(): void {
  }

  submitForm(form:NgForm){
    this.tokenAccount = form.value.accountAddress
    console.log(this.tokenAccount)

  }

  async checkTokenAccountInfo() {
    const tokenAccountInfo = await getAccount(
      this.connection,
      this.tokenAccount//.address
    );

    console.log(tokenAccountInfo.amount);
    // 0
  }

}
