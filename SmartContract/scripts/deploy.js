const { ethers, upgrades } = require("hardhat");

const deployStrap = async () => {
  const [owner] = await ethers.getSigners();
  const strapLauncher = await ethers.getContractFactory("Straps");
  const strapContract = await strapLauncher.deploy();
  await strapContract.deployed();

  //   await upgrades.deployProxy(
  //     strapLauncher,
  //     [owner.address],
  //     {
  //       initializer: "initialize",
  //     }
  //   );

  console.log("Implementation:", strapContract.address);

  const strapFactoryLauncher = await ethers.getContractFactory("StrapsFactory");
  const strapFactoryContract = await strapFactoryLauncher.deploy(
    strapContract.address
  );

  await strapFactoryContract.deployed();

  console.log("Factory is:", strapFactoryContract.address);
};

deployStrap()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
