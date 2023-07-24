async function main() {
  const SimonToken = await ethers.getContractFactory("SimonToken");

  // Start deployment, returning a promise that resolves to a contract object
  const simonToken = await SimonToken.deploy();
  await simonToken.deployed();
  console.log("Contract deployed to address:", simonToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
