import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-issue-cert',
  imports: [CommonModule, FormsModule],
  templateUrl: './issue-cert.component.html',
  styleUrl: './issue-cert.component.css'
})
export class IssueCertComponent {
  recipientName: string = '';
  eventName: string = '';
  issuedDate: string = '';
  certHash: string = '';

  constructor(private blockchainService: BlockchainService) {}

  
}
