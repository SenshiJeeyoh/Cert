import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BlockchainService } from '../../services/blockchain.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';
@Component({
  selector: 'app-student-page',
  imports: [CommonModule, MatDividerModule, MatListModule, MatIconModule],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent implements OnInit {
 certs: string[] = [];

  constructor(private blockchain: BlockchainService, private dialog: MatDialog) {}

  async ngOnInit() {
    await this.blockchain.loadBlockChain();
    const address = await this.blockchain.getMyAddress();
    const certObjs = await this.blockchain.getCertificatesByOwner(address);
    this.certs = certObjs.map((cert: any) => cert.certHash);
  }

  async openCertificateModal(certHash: string) {
    const cert = await this.blockchain.getCertificate(certHash);
    if (!cert || !cert.isValid) {
      alert('This certificate is not valid.');
      return;
    }

    this.dialog.open(CertificateModalComponent, {
      data: {
        recipientName: cert.recipientName,
        eventName: cert.eventName,
        issuedDate: cert.issuedDate,
        certHash: cert.certHash
      },
      width: '1040px',         // 90% of viewport width
      maxWidth: '100vw',     // ensures it doesn't exceed screen
      panelClass: 'custom-dialog-container' // optional for custom styling
    });
  }
}
