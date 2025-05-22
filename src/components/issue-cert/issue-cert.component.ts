import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-issue-cert',
  imports: [CommonModule, FormsModule, SidebarComponent],
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
  students: any[] = [];
  selectedStudent: string = '';

  constructor(private blockchainService: BlockchainService, private pdfService: PdfService) {}

  async ngOnInit(){
    await this.blockchainService.loadBlockChain();
    await this.getStudentNames();
    this.students = await this.blockchainService.getStudentNames();
  }
  ngDoCheck(){
    this.formattedDate = this.date.split('T')[0];
    
  }
  async issueCert(){
    this.blockchainService.loadBlockChain();
    
    const studentAddress = await this.blockchainService.getStudentAddressByName(this.selectedStudent);
    
    try{
        await this.blockchainService.issueCertificate(this.name, this.event, this.date, studentAddress).then(serial => {
          this.serial = serial;
          
          setTimeout(() => {
            this.pdfService.generatePDF(this.serial);
          }, 1000);
        });
        alert(`Certificate Issued: Serial Code ${this.serial}`);
        
    }catch(error){
      alert(`Error: ${error}`);
    }
  }

  async getStudentNames(){
    this.blockchainService.loadBlockChain();
    this.students = await this.blockchainService.getStudentNames();
  }

  async getStudentAddressByName(studentName: string){
    this.blockchainService.loadBlockChain();
    this.studentAddress = await this.blockchainService.getStudentAddressByName(studentName);
  }


}
