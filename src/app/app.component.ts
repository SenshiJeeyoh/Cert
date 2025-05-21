import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlockchainService } from '../services/blockchain.service';
import { Inject } from '@angular/core';
import { Block } from 'ethers';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CertiChain';

  


  


}
