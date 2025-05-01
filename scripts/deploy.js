const hre = require("hardhat");

async function main() {
  const DaoVoting = await hre.ethers.getContractFactory("DaoVoting");
  const daoVoting = await DaoVoting.deploy();
  await daoVoting.deployed();
  console.log(`DaoVoting deployed to: ${daoVoting.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
