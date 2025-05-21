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
      const address = await this.blockChainService.getMyAddress();
      const isAdmin = await this.blockChainService.isAdminExists(address);
      const isStudent = await this.blockChainService.isStudentExists(address);
      if(isAdmin){
        this.router.navigate(['/issue-cert']);
      }else if(isStudent){
        this.router.navigate(['/student']);
      }
    }
  }
}
