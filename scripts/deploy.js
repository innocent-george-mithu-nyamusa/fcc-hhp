const { ethers, run, network } = require('hardhat');

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

	console.log('Deploying contracts .....');
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();

	console.log(`Deployed contract to : ${simpleStorage.address}`);

	if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}

	const currentValue = await simpleStorage.retrieve();
	console.log(`Current Value is: ${currentValue}`);

	const TransactionResponse = await simpleStorage.store('99');

	await TransactionResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();

	console.log(`Updated value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
	try {
		await run('verify:verify', {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		if (error.message.toLoweCase().includes('already verified')) {
			console.log('Already verfied');
		} else {
			cosnole.log(e);
		}
	}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
