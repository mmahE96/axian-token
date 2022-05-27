import { Component } from '@angular/core';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

declare global {
  interface Window {
      FB:any;
      solana:any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent {
  
  title = 'axian-token';
  connection: Connection;
  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    this.connectToPhantomWallet()
   
    
  }

  async connectToPhantomWallet(){
    console.log("Connecting wallet")
    try {
      const resp = await window.solana.connect();
      resp.publicKey.toString()
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
  } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
  }
  }
  
  
}
