//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IStraps.sol";

contract StrapsFactory is Ownable {
    address public implementation;
    address[] public allStraps;
    

    mapping(bytes32 => address) private idToAddress;

    event NewStraps(address indexed contractAddress);

    constructor(address _implementation) {
        implementation = _implementation;
    }

    /**
     * @dev Deploys and returns the address of a clone that mimics the behaviour of `implementation`.
     *
     * This function uses the create2 opcode and a `salt` to deterministically deploy
     * the clone. Using the same `implementation` and `salt` multiple time will revert, since
     * the clones cannot be deployed twice at the same address.
     */
    function createStraps(string memory _name, address _deployer)
        external
        payable
        returns (address strapsContract)
    {
        bytes32 id = _getOptionId(_name, _deployer);
        require(idToAddress[id] == address(0), "Straps type exist");
        bytes32 salt = keccak256(abi.encodePacked(_name, _deployer));
        strapsContract = Clones.cloneDeterministic(implementation, salt);
        IStraps(strapsContract).initalize(_deployer);
        allStraps.push(strapsContract);
        idToAddress[id] = strapsContract;

        emit NewStraps(strapsContract);
    }

    function getStrapsSource(string memory _name, address _deployer)
        external
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

    function getAllStrapsClone() external view returns (address[] memory) {
        return allStraps;
    }

    function getNumberofStrapsMade() external view returns (uint256) {
        return allStraps.length;
    }
}
