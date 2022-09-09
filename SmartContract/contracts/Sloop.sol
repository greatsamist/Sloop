//SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

contract Sloop {
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
    }

    // Orders
    struct Order {
        address srcAddr;
        address destAddr;
        Department singleDept;
        mapping(uint256 => Product) public products;
        uint256 timeOfOrder;
    }

    mapping(uint8 => Product) public products;
    mapping(string => Department) public departments;
    mapping(string => Order) public orders;

    // Events
    event addProduct(uint8 productId);
    event createDept(string deptName);

    constructor() {}

    /// @notice Add a single product
    /// @param _id The unique Id of a product
    /// @param _productType The product type
    function addProduct(uint8 _id, string memory _productType) external {
        Product storage oneProduct = products[_id];
        oneProduct.id = _id;
        oneProduct.productType = _productType;
        emit addProduct(_id);
    }

    /// @notice Adds products in group
    /// @dev Required that both parameters are of equal lengths to add new products
    /// @param _id The unique Id of a product
    /// @param _productType The product type
    function addProducts(uint8[] _id, string[] memory _productType) external {
        require(_id.length == _productType.length, "Length mismatch");
        Product storage oneProduct = products[_id];
        for(uint8 i = 0; i <= 200; i++) {
            Product memory oneProducts_ = products[_id[i]];
            oneProducts_.id = _id[i];
            oneProducts_.productType = _productType[i];
            emit addProduct(_id[i]);
        }
        oneProduct = oneProducts_;
    }

    /// @notice Create a new department with their location
    /// @param _dept The name of the department
    /// @param _location The location where a department is based
    function createDept(string memory _dept, string memory _location) external {
        Department storage oneDept = departments[_dept];
        oneDept.departmentName = _dept;
        oneDept.location = _location;
        emit createDept(_dept);
    }

    /// @notice Rename a department
    /// @param _oldName The department old name intended to be changed
    /// @param _newName The department new name
    function renameDept(string memory _oldName, string memory _newName) external {
        Department storage _dept = departments[_oldName];
        _dept.departmentName = _newName;
        // Emit the changes 
    } 

    /// @notice Update product src and dest when a product is initialized to be moved
    /// @dev Algorithm is targeted to update each individual products and order
    /// @param _srcAddr The source address that starts the product movement
    /// @param _deptName The name of the department from which a product is being moved
    /// @param _location The department location
    /// @param productId Array of products Id to move
    function MoveProducts(address _destAddr, string memory _deptName, string memory _location, uint8[] memory productId) external {
        // Update the product when moved
        // Product storage _theProduct = products[];
        for(uint8 i = 0; i <= 200; i++) {
            Product storage _theProduct = products[i]
            _theProduct.srcAddr = _srcAddr;
        }

        // Update the Order
        Order storage oneOrder = orders[msg.sender];
        oneOrder.srcAddr = msg.sender;
        oneOrder.destAddr = _destAddr;
        oneOrder.Department.departmentName = _deptName;
        oneOrder.Department.location = _location;
        oneOrder.timeOfOrder = block.timestamp;
        // Emit update of state changes
    }

    /// @notice Claim moved product at the destination end.
    /// @dev Algorithm to check who is claiming and afterwards update the products destination
    /// @param _srcAddr The source address from where products come from
    /// @param _productsId All of the products Id in order to update their destination addresses
    function claimProducts(address _srcAddr, uint8[] memory _productsId) external {
        Order storage oneOrder = orders[_srcAddr];
        require(msg.sender == oneOrder.destAddr, "Not the dest address");

        // If it the expected address, products destination gets updated
    }

}