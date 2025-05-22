import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PdfService } from '../../services/pdf.service';
import { BlockchainService } from '../../services/blockchain.service';


@Component({
  selector: 'app-certificate-modal',
  imports: [MatDialogModule],
  templateUrl: './certificate-modal.component.html',
  styleUrl: './certificate-modal.component.css'
})
export class CertificateModalComponent {
  dialog: any;
constructor(@Inject(MAT_DIALOG_DATA) public data: any , private pdfService: PdfService, private blockchainService: BlockchainService) {}


  async downloadPDF() {
    this.pdfService.generatePDF(this.data.certHash);
    // if (!element) return;

    // const canvas = await html2canvas(element);
    // const imgData = canvas.toDataURL('image/png');
    // const pdf = new jsPDF('landscape', 'px', 'a4');
    // pdf.addImage(imgData, 'PNG', 30, 30);
   
    // pdf.save(`${this.data.recipientName}_Certificate.pdf`);
  }

}
