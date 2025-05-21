// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {

    struct Students {
        string name;
        address studentAddress;
    }

    struct Admin {
        string name;
        address adminAddress;
    }

    struct Certificate {
        string recipientName;
        string eventName;
        string issuedDate;
        string certHash;
        bool isValid;
    }

    mapping(address => Students) public students;
    mapping(address => Admin) public admins;

    address[] private studentAddresses;
    address[] private adminAddresses;

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
        admins[msg.sender] = Admin("Super Admin", msg.sender);
        adminAddresses.push(msg.sender);
    }

    function addStudent(string memory _studentName, address _studentAddress) public onlyAdmin {
        require(students[_studentAddress].studentAddress == address(0), "Student already exists");
        students[_studentAddress] = Students(_studentName, _studentAddress);
        studentAddresses.push(_studentAddress);
    }

    function addAdmin(string memory _adminName, address _adminAddress) public onlyAdmin {
        require(admins[_adminAddress].adminAddress == address(0), "Admin already exists");
        admins[_adminAddress] = Admin(_adminName, _adminAddress);
        adminAddresses.push(_adminAddress);
    }

    function getStudentNames() public view returns (string[] memory) {
        string[] memory studentNames = new string[](studentAddresses.length);
        for (uint256 i = 0; i < studentAddresses.length; i++) {
            studentNames[i] = students[studentAddresses[i]].name;
        }
        return studentNames;
    }

    
    function getStudentAddressByName(string memory _studentName) public view returns (address) {
        for (uint256 i = 0; i < studentAddresses.length; i++) {
            if (keccak256(abi.encodePacked(students[studentAddresses[i]].name)) == keccak256(abi.encodePacked(_studentName))) {
                return studentAddresses[i];
            }
        }
        return address(0);
    }



    function getAdminNames() public view returns (string[] memory) {
        string[] memory adminNames = new string[](adminAddresses.length);
        for (uint256 i = 0; i < adminAddresses.length; i++) {
            adminNames[i] = admins[adminAddresses[i]].name;
        }
        return adminNames;
    }

    
    function getAdminAddressByName(string memory _adminName) public view returns (address) {
        for (uint256 i = 0; i < adminAddresses.length; i++) {
            if (keccak256(abi.encodePacked(admins[adminAddresses[i]].name)) == keccak256(abi.encodePacked(_adminName))) {
                return adminAddresses[i];
            }
        }
        return address(0);
    }

    
    function updateStudent(string memory _studentName) public {
        require(students[msg.sender].studentAddress != address(0), "Student does not exist");
        students[msg.sender].name = _studentName;
    }

function updateAdmin(string memory _adminName) public  onlyAdmin{
    require(admins[msg.sender].adminAddress != address(0), "Admin does not exist");
    admins[msg.sender].name = _adminName;
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
