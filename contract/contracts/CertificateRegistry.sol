// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        string recipientName;
        string eventName;
        string issuedDate;
        string certHash;
        bool isValid;
    }

    mapping(string => Certificate) public certificates;
    address public admin;

    event CertificateIssued(string certHash, string recipientName, string eventName, string issuedDate);

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(
        string memory _recipientName,
        string memory _eventName,
        string memory _issuedDate,
        string memory _certHash
    ) public {
        require(msg.sender == admin, "Only admin can issue certificates");

        certificates[_certHash] = Certificate(
            _recipientName,
            _eventName,
            _issuedDate,
            _certHash,
            true
        );

        emit CertificateIssued(_certHash, _recipientName, _eventName, _issuedDate);
    }

    function verifyCertificate(string memory _certHash) 
        public 
        view 
        returns (string memory, string memory, string memory, bool) 
    {
        Certificate memory cert = certificates[_certHash];
        require (cert.isValid, "Certificate is not valid");
        return (cert.recipientName, cert.eventName, cert.issuedDate, cert.isValid);
    }
}
