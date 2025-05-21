import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(
    private blockChainService: BlockchainService,
    private router: Router
  ){}



  async login(){
    await this.blockChainService.loadBlockChain();
    if (this.blockChainService.signer){
      this.router.navigate(['/issue']);
    }
  }
}
