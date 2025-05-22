import { Injectable } from '@angular/core';
import {ethers} from 'ethers';
import * as CryptoJS from 'crypto-js';

const contractAddress = '0x3aa49aC93792108BA8F53D95da1fA2D639739BFE';
const abi =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "certHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "recipientName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "eventName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "issuedDate",
          "type": "string"
        }
      ],
      "name": "CertificateIssued",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "certHash",
          "type": "string"
        }
      ],
      "name": "CertificateRevoked",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "admins",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "adminAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "students",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "studentAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getMyAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_studentName",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_studentAddress",
          "type": "address"
        }
      ],
      "name": "addStudent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_adminName",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_adminAddress",
          "type": "address"
        }
      ],
      "name": "addAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getStudentNames",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_studentName",
          "type": "string"
        }
      ],
      "name": "getStudentAddressByName",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_studentAddress",
          "type": "address"
        }
      ],
      "name": "isStudent",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAdminNames",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_adminName",
          "type": "string"
        }
      ],
      "name": "getAdminAddressByName",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_adminAddress",
          "type": "address"
        }
      ],
      "name": "isAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_studentName",
          "type": "string"
        }
      ],
      "name": "updateStudent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_adminName",
          "type": "string"
        }
      ],
      "name": "updateAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_recipientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_eventName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_issuedDate",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_certHash",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_studentAddress",
          "type": "address"
        }
      ],
      "name": "issueCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_certHash",
          "type": "string"
        }
      ],
      "name": "verifyCertificate",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_certHash",
          "type": "string"
        }
      ],
      "name": "revokeCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_certHash",
          "type": "string"
        }
      ],
      "name": "getCertificate",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "recipientName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "eventName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "issuedDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "certHash",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isValid",
              "type": "bool"
            }
          ],
          "internalType": "struct CertificateRegistry.Certificate",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getCertificatesByOwner",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "recipientName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "eventName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "issuedDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "certHash",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isValid",
              "type": "bool"
            }
          ],
          "internalType": "struct CertificateRegistry.Certificate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public provider: ethers.BrowserProvider | undefined;
  public signer: ethers.Signer | undefined;
  public contract: ethers.Contract | undefined;

  constructor() { }

  async loadBlockChain(){
    if ((window as any).ethereum){
      this.provider = new ethers.BrowserProvider((window as any).ethereum);
      this.signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(contractAddress, abi, this.signer);
    }else{
      console.log('Please install MetaMask');
    }
  }


  genSerial(name: string, event: string, date: string){
    const serial = name + event + date;
    return  CryptoJS.SHA256(serial).toString();  
  }

async getMyAddress() {
  if (!this.contract) return;
  return await (this.contract as any).getMyAddress();
}


  async isStudentExists(studentAddress: string){
    if (!this.contract) return;
    return await (this.contract as any).isStudent(studentAddress);
  }

async isAdminExists(adminAddress: string) {
  if (!this.contract) return;
  return await (this.contract as any).isAdmin(adminAddress);
}


  async issueCertificate(name: string, event: string, date: string, studentAddress: string){
    if (!this.contract) return;
    const serial = this.genSerial(name, event, date);
    
    const tx = await (this.contract as any).issueCertificate(name, event, date, serial, studentAddress);
    await tx.wait();
    return serial;
  }

  async verifyCertificate(serial: string){
    if (!this.contract) return;
    return await (this.contract as any).verifyCertificate(serial);

  }

  async revokeCertificate(serial: string){
    if (!this.contract) return;
    const tx = await (this.contract as any).revokeCertificate(serial);
    await tx.wait();
  }

  async getCertificate(serial: string){
    if (!this.contract) return;
    return await (this.contract as any).getCertificate(serial);
  }

  async getCertificatesByOwner(owner: string){
    if (!this.contract) return;
    return await (this.contract as any).getCertificatesByOwner(owner);
  }

  async addStudent(name: string, address: string){
    if (!this.contract) return;
    const tx = await (this.contract as any).addStudent(name, address);
    await tx.wait();
  }

  async getStudentNames(){
    if (!this.contract) return;
    return await (this.contract as any).getStudentNames();
  }

  async getStudentAddressByName(studentName: string) {
    if (!this.contract) return;
    return await (this.contract as any).getStudentAddressByName(studentName);
  }




async addAdmin(adminName: string, adminAddress: string) {
  if (!this.contract) return;
  const tx = await (this.contract as any).addAdmin(adminName, adminAddress);
  await tx.wait();
}


  async getAdminNames() {
    if (!this.contract) return;
    return await (this.contract as any).getAdminNames();
  }

  async getAdminAddressByName(adminName: string) {
    if (!this.contract) return;
    return await (this.contract as any).getAdminAddressByName(adminName);
  }


}
