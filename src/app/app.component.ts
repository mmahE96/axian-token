import { Component } from '@angular/core';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

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
    
  }
  
  
}
