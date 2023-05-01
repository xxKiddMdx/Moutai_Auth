// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract Transactions {
    uint256 propertyCount;

    event Transfer(address from, address receiver, uint amount, uint propertyID, uint256 timestamp);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        uint propertyID;
        uint256 timestamp;
    }

    struct Property {
        uint256 propId;
        uint256 value;
        address currOwner;
        address pendingOwner;
    }

    enum Status {NotExist, Approved}
    enum Role {Admin, User}

    TransferStruct[] transactions;
    Property[] properties;
    mapping (address => Role) public userRoles;
    mapping (uint256 => address) public pendingOwner;

    constructor() {
        address creatorAdmin = msg.sender;
        userRoles[creatorAdmin] = Role.Admin;
        properties.push(Property(0, 0, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4));
    }

    // Modifier to ensure only the verified admin access a function
    modifier verifiedAdmin() {
        require(
            userRoles[msg.sender] == Role.Admin
        );
        _;
    }

    function findIndex(uint target) public view returns (uint index) {
        uint length = properties.length;

        for (uint i = length - 1; i >= 0; i--) {
            if (properties[i].propId == target) {
                return i;
            }
            if (i == 0) {
            break;
            }
        }
        return 0;
    }

    function findAddress(address target) public view returns (Property[] memory) {
        uint256 length = properties.length;
        Property[] memory tempWallet = new Property[](length);
        uint256 count = 0;

        for (uint256 i = length - 1; i >= 0; i--) {
            if (properties[i].currOwner == target) {
                tempWallet[count] = properties[i];
                count++;
            }
            if (i == 0) {
                break;
            }
        }
        Property[] memory wallet = new Property[](count);
        for (uint256 j = 0; j < count; j++) {
            wallet[j] = tempWallet[j];
        }
        return wallet;
    }

    function addToBlockchain(address payable receiver, uint amount, uint propertyID) public {
        uint index = findIndex(propertyID);
        require (index != 0, "Property does not exist");
        require (properties[index].value == amount, "Incorrect amount");
        require (properties[index].pendingOwner == msg.sender, "Ownership transfer not initiated");
        properties[index].currOwner = msg.sender;
        propertyCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, propertyID, block.timestamp));
        emit Transfer(msg.sender, receiver, amount, propertyID, block.timestamp);
    }

    function getPropertyDetails(uint256 _id) public view returns (Property memory) {
        uint index = findIndex(_id);
        require (index != 0, "Property does not exist");
        return properties[index];
    }

    function createProperty  (
        uint256 _propId,
        uint256 _value,
        address _owner
    ) external verifiedAdmin returns (bool)
     {
        uint index = findIndex(_propId);
        require (index == 0, "Property already exists");
        properties.push(Property(_propId, _value, _owner, _owner));
        return true;
    }

    function getAllProperties () public view returns (Property[] memory) {
        return properties;
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getPropertyCount() public view returns (uint256) {
        return propertyCount;
    }

    function getOwnedBottles(address owner) public view returns (uint256[] memory) {
        uint256[] memory ownedBottles = new uint256[](propertyCount);
        uint256 ownedBottleCount = 0;
        for (uint256 i = 1; i < properties.length; i++) {
        if (properties[i].currOwner == owner) {
            ownedBottles[ownedBottleCount] = properties[i].propId;
            ownedBottleCount++;
        }
    }
    // Resize the array to match the actual number of owned bottles
        uint256[] memory result = new uint256[](ownedBottleCount);
        for (uint256 i = 0; i < ownedBottleCount; i++) {
            result[i] = ownedBottles[i];
        }
        return result;
    }
    function changeValue(uint256 _propId, uint256 _newValue) public returns (bool){
        uint index = findIndex(_propId);
        require (index != 0, "Property does not exist");
        require(properties[index].currOwner == msg.sender, "Only the owner can change the value");
        properties[index].value = _newValue;
        return true;
    }

    function initOwnershipTransfer(uint256 propertyId, address currentOwner, address newOwner) public {
        uint index = findIndex(propertyId);
        require(properties[index].currOwner == currentOwner, "Only the owner can initiate the ownership transfer.");
        require (index != 0, "Property does not exist");
        require(newOwner != address(0), "New owner cannot be the zero address.");
        require(currentOwner != address(0), "Current owner cannot be the zero address.");
        require(msg.sender == currentOwner, "Only the current owner can call this function.");
        properties[index].pendingOwner = newOwner;
    }




}

