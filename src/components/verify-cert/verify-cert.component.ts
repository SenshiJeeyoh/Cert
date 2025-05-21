import { Component } from '@angular/core';
import { routes } from '../../app/app.routes';
import { CommonModule } from '@angular/common';
import { BlockchainService } from '../../services/blockchain.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-verify-cert',
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-cert.component.html',
  styleUrl: './verify-cert.component.css'
})
export class VerifyCertComponent {
  certHash: string = '';
  certificate: {
    recipientName: string;
    eventName: string;
    issuedDate: string;
    isValid: boolean;
  } | null = null;
  errorMessage: string = '';

  constructor(private BlockchainService: BlockchainService) {}

  async verifyCertificate(): Promise<void> {
    this.errorMessage = '';
    this.certificate = null;

    if (!this.certHash) {
      this.errorMessage = 'Please enter a certificate hash.';
      return;
    }

    try {
      const result = await this.BlockchainService.verifyCertificate(this.certHash);

      // Assuming smart contract returns (string recipientName, string eventName, string issuedDate, bool isValid)
      this.certificate = {
        recipientName: result[0],
        eventName: result[1],
        issuedDate: result[2],
        isValid: result[3]
      };
    } catch (error) {
      console.error('Error verifying certificate:', error);
      this.errorMessage = 'Certificate could not be verified. Please check the hash and try again.';
    }
  }
}
