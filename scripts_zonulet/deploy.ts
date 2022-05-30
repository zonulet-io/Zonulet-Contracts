import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying the contracts with the address:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const IterableMappingLibrary = await ethers.getContractFactory("IterableMapping");
  const iterableMappingLibrary = await IterableMappingLibrary.deploy();
  await iterableMappingLibrary.deployed();

  console.log("IterableMappingLibrary deployed to:", iterableMappingLibrary.address);

  
  const TokenDividen = await ethers.getContractFactory("ZonuletDividendTracker", {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  const TokenZonulet = await ethers.getContractFactory("Zonulet",  {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  
  const tokenDividen = await TokenDividen.deploy();
  await tokenDividen.deployed();

  const tokenZonulet = await TokenZonulet.deploy();
  await tokenZonulet.deployed();

  console.log("$ZonuletDividendTracker deployed to:", tokenDividen.address);
  console.log("$Zonulet deployed to:", tokenZonulet.address);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
