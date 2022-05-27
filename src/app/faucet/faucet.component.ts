import { Component, OnInit } from '@angular/core';
import { createMint, Mint, getMint, getOrCreateAssociatedTokenAccount, getAccount, mintTo } from '@solana/spl-token';

import {
  Keypair,
  LAMPORTS_PER_SOL,
  Connection,
  clusterApiUrl,
  PublicKey,
} from '@solana/web3.js';
@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.css'],
})
export class FaucetComponent implements OnInit {
  //token creator crew
  payer: Keypair;
  mintAuthority: Keypair;
  freezeAuthority: Keypair;

  //token
  axianMint!: PublicKey;

  //account
  tokenAccount!:any;

  //utils
  

  connection: Connection;
  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    this.payer = Keypair.generate();
    this.mintAuthority = Keypair.generate();
    this.freezeAuthority = Keypair.generate();
  }

  ngOnInit(): void {}

  //airdrop of SOL is necessary for PAYER because he will send transaction(for token creation)
  //to the solana cluster
  async airdropSolToPayerForMinting() {
    console.log('Airdrop clicked');
    const pubKeyOfPayer = await this.payer.publicKey;
    console.log('Publickey of Payer:', pubKeyOfPayer);
    const airdrop = await this.connection.requestAirdrop(
      this.payer.publicKey,
      LAMPORTS_PER_SOL
    );
    console.log(airdrop);
    console.log(LAMPORTS_PER_SOL);
    const accountInfo = await this.connection.getAccountInfo(
      this.payer.publicKey
    );
    console.log('Account info', accountInfo);
  }

  //this method is creating the mint, or creatig token, that can be minted
  async mintAxiTokens() {
    console.log('Mint clicked');
    const mint = await createMint(
      this.connection,
      this.payer,
      this.mintAuthority.publicKey,
      this.freezeAuthority.publicKey,
      9 // We are using 9 to match the CLI decimal default exactly
    );
    this.axianMint = mint;
    
    console.log(mint.toBase58());
    // HHEQWRm5hgppQPGcCufGHPhEGscpsSEfVvmVr59AnVxZ token Address
  }

  //this method will show how much supply of our minted token is available
  async getSupplyInfoForNewToken() {
    const axianMintedTokenFromFirstSuccess = new PublicKey("HHEQWRm5hgppQPGcCufGHPhEGscpsSEfVvmVr59AnVxZ")
    const mintInfo = await getMint(this.connection, this.axianMint);

    console.log(mintInfo.supply);
  }


  //we need to create an accout to be able to hold newly created token

  async createNewAccountForStoringAXItokens(){
    const axianMintedTokenFromFirstSuccess = new PublicKey("HHEQWRm5hgppQPGcCufGHPhEGscpsSEfVvmVr59AnVxZ")
    this.tokenAccount = await getOrCreateAssociatedTokenAccount(
      this.connection,
      this.payer,
      this.axianMint,
      this.payer.publicKey
    )
    
    console.log(this.tokenAccount .address.toBase58());
    // 7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi
  }

  async checkTokenAccountInfo() {
    const tokenAccountInfo = await getAccount(
      this.connection,
      this.tokenAccount.address
    )
    
    console.log(tokenAccountInfo.amount);
    // 0
  }

  async mintTokens(){
    await mintTo(
      this.connection,
      this.payer,
      this.axianMint,
      this.tokenAccount.address,
      this.mintAuthority,
      100000000000 // because decimals for the mint are set to 9 
    )
  }
}
