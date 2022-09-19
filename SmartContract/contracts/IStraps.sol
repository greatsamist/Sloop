//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;


interface IStraps {
    function initalize(address _deployer) external;

    function addProduct(uint8 _id, string memory _productType) external;

    function addProducts(uint8[] memory _id, string[] memory _productType) external;

    function createDept(string memory _dept, string memory _location) external;

    function renameDept(string memory _oldName, string memory _newName)
        external;

    function MoveProducts(
        address _destAddr,
        string memory _deptName,
        string memory _location,
        uint8[] memory productId
    ) external;

    function claimProducts(address _srcAddr, uint8[] memory _productsId)
        external;
}