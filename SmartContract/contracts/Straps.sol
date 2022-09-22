//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract Starps is Initializable, AccessControl {
    address deployer;
    bytes32 constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");
    bytes32 constant ADMIN_ROLE = keccak256("DEFAULT_ADMIN_ROLE");

    // Product
    struct Product {
        uint8 id;
        string productType;
        address srcAddr;
        address destAddr;
    }

    // Departments
    struct Department {
        string departmentName;
        string location;
        uint256 numOfProductsInStock;
    }

    // Orders
    struct Order {
        address srcAddr;
        address destAddr;
        Department singleDept;
        mapping(uint256 => Product) products;
        uint256 timeOfOrder;
    }

    mapping(uint8 => Product) public products;
    mapping(string => Department) public departments;
    mapping(address => Order) public orders;

    // Events
    event addProductEvent(uint8 productId_);
    event createDeptEvent(string deptName);
    event renameDeptEvent(string deptName);
    event moveProductsEvent(address srcAddr, address destAddr, uint8 products);


   function initialize(address _deployer) public initializer {
    deployer = _deployer;
    _grantRole(ADMIN_ROLE, _deployer);
   }

    /// @notice Add a single product
    /// @param _id The unique Id of a product
    /// @param _productType The product type
    function addProduct(uint8 _id, string memory _productType, string memory _dept) onlyRole(MODERATOR_ROLE) external {
        Product storage oneProduct = products[_id];
        require(_id != oneProduct.id, "already exist");
        Department storage oneDept = departments[_dept];
        string memory deptToCheck = oneDept.departmentName;
        require(keccak256(abi.encodePacked((deptToCheck))) == keccak256(abi.encodePacked((_dept))), "Wrong dept passed.");
        oneProduct.id = _id;
        oneProduct.productType = _productType;
        oneDept.numOfProductsInStock += 1;
        emit addProductEvent(_id);
    }

    /// @notice Adds products in group
    /// @dev Required that both parameters are of equal lengths to add new products
    /// @param _id The unique Id of a product
    /// @param _productType The product type
    function addProducts(uint8[] memory _id, string[] memory _productType, string memory _dept)  onlyRole(MODERATOR_ROLE) external {
        require(_id.length == _productType.length, "Length mismatch");
        Department storage oneDept = departments[_dept];
        string memory deptToCheck = oneDept.departmentName;
        require(keccak256(abi.encodePacked((deptToCheck))) == keccak256(abi.encodePacked((_dept))), "Wrong dept passed.");
        for(uint8 i = 0; i <= _productType.length; i++) {
            Product memory oneProducts_ = products[_id[i]];
            require(_id[i] != oneProducts_.id, "already exist");
            oneProducts_.id = _id[i];
            oneProducts_.productType = _productType[i];
            oneDept.numOfProductsInStock += 1;
            emit addProductEvent(_id[i]);
        }
    }

    /// @notice Create a new department with their location
    /// @param _dept The name of the department
    /// @param _location The location where a department is based
    function createDept(string memory _dept, string memory _location) external {
        Department storage oneDept = departments[_dept];
        oneDept.departmentName = _dept;
        oneDept.location = _location;
        emit createDeptEvent(_dept);
    }

    /// @notice Rename a department
    /// @param _oldName The department old name intended to be changed
    /// @param _newName The department new name
    function renameDept(string memory _oldName, string memory _newName) external {
        Department storage _dept = departments[_oldName];
        _dept.departmentName = _newName;
        emit renameDeptEvent(_newName);
    } 

    /// @notice Update product src and dest when a product is initialized to be moved
    /// @dev Algorithm is targeted to update each individual products and order
    /// @param _deptName The name of the department from which a product is being moved
    /// @param _location The department location
    /// @param productId Array of products Id to move
    function MoveProducts(address _destAddr, string memory _deptName, string memory _location, uint8[] memory productId) external onlyRole(MODERATOR_ROLE) {
        // Update the product when moved
        // Product storage _theProduct = products[];
        for(uint8 i = 0; i <= 200; i++) {
            uint8[] memory newId = new uint8[](productId.length);
            Product storage _theProduct = products[i];
            _theProduct.srcAddr = msg.sender;
            _theProduct.destAddr = _destAddr;
            emit moveProductsEvent(msg.sender, _destAddr, newId[i]);
        }

        // Update the Order
        Order storage oneOrder = orders[msg.sender];
        oneOrder.srcAddr = msg.sender;
        oneOrder.destAddr = _destAddr;
        oneOrder.singleDept.departmentName = _deptName;
        oneOrder.singleDept.location = _location;
        oneOrder.timeOfOrder = block.timestamp;
    }

    /// @notice Claim moved product at the destination end and update Order information.
    /// @dev Algorithm to check who is claiming and afterwards update the products destination
    /// @param _srcAddr The source address from where products come from
    /// @param _productsId All of the products Id in order to update their destination addresses
    function claimProducts(address _srcAddr, uint8[] memory _productsId, string memory receivingDept) external {
        Order storage oneOrder = orders[_srcAddr];
        require(msg.sender == oneOrder.destAddr, "Not the dest address");
        oneOrder.destAddr = msg.sender; 
        oneOrder.singleDept.departmentName = receivingDept;
        // Decreases the products in source department end
        Department storage srcDept = departments[oneOrder.singleDept.departmentName];
          // Increases the products in destination department end
        Department storage destDept = departments[receivingDept];
        for(uint i = 0; i < _productsId.length; i++) {
            srcDept.numOfProductsInStock -= 1;
            destDept.numOfProductsInStock += 1;
        }
    }

     /// @notice Claim moved product at the destination end and update Order information.
    /// @dev Algorithm to check who is claiming and afterwards update the products destination
    /// @param _moderator The new moderator address to move the products
    function addModerators(address _moderator) external onlyRole(ADMIN_ROLE) {
        _grantRole(MODERATOR_ROLE, _moderator);
    }

}