// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {

    struct Students{
        string name;
        address studentAddress;
    }
    mapping (address => Students) public students;

    struct Admin{
        string name;
        address adminAddress;
    }

    mapping (address => Admin) public admins;


    struct Certificate {
        string recipientName;
        string eventName;
        string issuedDate;
        string certHash;
        bool isValid;
    }

    mapping(string => Certificate) private certificates;
    mapping(address => string[]) private ownerToCertHashes;

    address public admin;

    event CertificateIssued(string certHash, string recipientName, string eventName, string issuedDate);
    event CertificateRevoked(string certHash);

    modifier onlyAdmin() {
        require(msg.sender == admin || admins[msg.sender].adminAddress != address(0), "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }


    
    
    function addStudent(string memory _studentName, address _studentAddress) public onlyAdmin{
        students[msg.sender] = Students(_studentName, _studentAddress);
        
    }


    
    
    function addAdmin(string memory _adminName, address _adminAddress) public onlyAdmin{
        admins[msg.sender] = Admin(_adminName, _adminAddress);
        
    }


    function issueCertificate(
        string memory _recipientName,
        string memory _eventName,
        string memory _issuedDate,
        string memory _certHash,
        address _studentAddress
    ) public onlyAdmin {
        require(!certificates[_certHash].isValid, "Certificate with this hash already exists");

        Certificate memory newCert = Certificate({
            recipientName: _recipientName,
            eventName: _eventName,
            issuedDate: _issuedDate,
            certHash: _certHash,
            isValid: true
        });

        certificates[_certHash] = newCert;
        ownerToCertHashes[_studentAddress].push(_certHash);

        emit CertificateIssued(_certHash, _recipientName, _eventName, _issuedDate);
    }

    function verifyCertificate(string memory _certHash) 
        public 
        view 
        returns (string memory, string memory, string memory, bool) 
    {
        Certificate memory cert = certificates[_certHash];
        require(cert.isValid, "Certificate is not valid or doesn't exist");
        return (cert.recipientName, cert.eventName, cert.issuedDate, cert.isValid);
    }

    function revokeCertificate(string memory _certHash) public onlyAdmin {
        require(certificates[_certHash].isValid, "Certificate already revoked or doesn't exist");
        certificates[_certHash].isValid = false;

        emit CertificateRevoked(_certHash);
    }

    function getCertificate(string memory _certHash) public view returns (Certificate memory) {
        return certificates[_certHash];
    }

    function getCertificatesByOwner(address _owner) public view returns (Certificate[] memory) {
        string[] memory hashes = ownerToCertHashes[_owner];
        Certificate[] memory certList = new Certificate[](hashes.length);

        for (uint i = 0; i < hashes.length; i++) {
            certList[i] = certificates[hashes[i]];
        }

        return certList;
    }
}
