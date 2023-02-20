const { ethers } = require("hardhat");

async function main() {
  const DalleInu = await hre.ethers.getContractFactory("DalleInu");
  const token = await DalleInu.deploy();
  await token.deployed();
  console.log("Dalle deployed to:", token.address);

  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await token.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
  await run(`verify:verify`, {
    address: token.address,
  });

  console.log("Dalle contract verified");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
