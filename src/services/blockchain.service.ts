import { Injectable } from '@angular/core';
import {ethers} from 'ethers';
import * as CryptoJS from 'crypto-js';

const contractAddress = '0x51C32708b1297234CA06A19ca7840B4Cd20082F1';
const abi = [
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
      "type": "function"
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
      "type": "function"
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


  async issueCertificate(name: string, event: string, date: string, studentAddress: string){
    if (!this.contract) return;
    const serial = this.genSerial(name, event, date);
    console.log(serial);
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




  




}
