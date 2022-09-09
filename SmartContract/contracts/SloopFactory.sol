//SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ISloop.sol";

contract SloopFactory is Ownable {
    address public implementation;
    address[] public allSloop;

    mapping(bytes32 => address) private idToAddress;

    event NewSloop(address indexed contractAddress);

    constructor(address _implementation) {
        implementation = _implementation;
    }

    function createSloop(string memory _name, address _deployer)
        external
        payable
        returns (address sloopContract)
    {
        bytes32 id = _getOptionId(_name, _deployer);
        require(idToAddress[id] == address(0), "Sloop sourcing type exist");
        bytes32 salt = keccak256(abi.encodePacked(_name, _deployer));
        sloopContract = Clones.cloneDeterministic(implementation, salt);
        ISloop(sloopContract).initialize(_deployer);
        allSloop.push(sloopContract);
        idToAddress[id] = sloopContract;

        emit NewSloop(sloopContract);
    }

    function getSloopSource(string memory _name, address _deployer)
        public
        view
        returns (address)
    {
        bytes32 id = _getOptionId(_name, _deployer);
        return idToAddress[id];
    }

    function _getOptionId(string memory _name, address _deployer)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_name, _deployer));
    }

    function getAllSloopClone() external view returns (address[]) {
        return allSloop;
    }

    function getNumberofSloopMade() external view returns (uint256) {
        return allSloop.length;
    }
}
