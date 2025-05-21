import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-issue-cert',
  imports: [CommonModule, FormsModule],
  templateUrl: './issue-cert.component.html',
  styleUrl: './issue-cert.component.css'
})
export class IssueCertComponent implements OnInit{
  name : string = '';
  event: string = '';
  date: string = '';
  formattedDate: any;
  serial: string | any = '';
  studentAddress: string = '';
  eventHandler : string = '';

  constructor(private blockchainService: BlockchainService, private pdfService: PdfService) {}

  ngOnInit(){
    this.blockchainService.loadBlockChain();
  }
  ngDoCheck(){
    this.formattedDate = this.date.split('T')[0];
  }
  async issueCert(){
    this.blockchainService.loadBlockChain();
    try{
        await this.blockchainService.issueCertificate(this.name, this.event, this.date, this.studentAddress).then(serial => {
          this.serial = serial;
          setTimeout(() => {
            this.pdfService.generatePDF();
          }, 1000);
        });
        alert(`Certificate Issued: Serial Code ${this.serial}`);
        
    }catch(error){
      alert(`Error: ${error}`);
    }
  }


}
