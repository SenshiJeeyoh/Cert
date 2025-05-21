import { Component, HostListener } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs, {send, type EmailJSResponseStatus} from '@emailjs/browser';
@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(
    private blockChainService: BlockchainService,
    private router: Router
  ){}

  toggle = 1;
  name = '';
  email = '';
  isOtp = false;
  msg = '';
  otpmsg = '';

  otp : number | null = null;
  randomNumber = Math.floor(Math.random() * 900000 + 100000);

  

  async login(){
    await this.blockChainService.loadBlockChain();
    if (this.blockChainService.signer){
      const address = await this.blockChainService.getMyAddress();
      const isAdmin = await this.blockChainService.isAdminExists(address);
      const isStudent = await this.blockChainService.isStudentExists(address);
      if(isAdmin){
        this.router.navigate(['/issue']);
      }else if(isStudent){
        this.router.navigate(['/student']);
      }else{
        this.toggle = 2;
      }
    }
  }


  async registerStudent(){
    await this.blockChainService.loadBlockChain();
    if (!this.email.includes('@gordoncollege.edu.ph')){
      this.msg = 'Please enter a valid Gordon College email address.';
    }else{
      this.msg = '';
      this.toggleOtp();
    }
    
  }


  toggleOtp(){
    this.isOtp = !this.isOtp;
    this.randomNumber = Math.floor(Math.random() * 900000 + 100000);
    console.log(this.randomNumber);
    const templateParams = {
      passcode: this.randomNumber,
      email: this.email,
    };

    emailjs.send('certichain', 'template_1trocfn', templateParams, 'HYIkGIefO9zz6RG4v').then((response) => {
      this.otpmsg = 'OTP sent successfully';
    }).catch((error) => {
      this.otpmsg = 'Failed to send OTP. Please try again.';
    });

  }

  async verifyOtp(){
    if(this.otp == this.randomNumber){
      this.blockChainService.loadBlockChain();
      this.otpmsg = 'OTP verified successfully. Please confirm transaction...';
      const address = await this.blockChainService.getMyAddress();
      await this.blockChainService.addStudent(this.name, address);
      this.router.navigate(['/student']);
    }else{
      this.otpmsg = 'Invalid OTP. Please try again.';
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const fox = document.getElementById('foxLogo');
    if (fox) {
      const centerX = window.innerWidth / 5;
      const centerY = window.innerHeight / 5;

      const rotateX = (event.clientY - centerY) / 60;
      const rotateY = (event.clientX - centerX) / 60;

      fox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }

}
