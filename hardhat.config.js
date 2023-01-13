const { task } = require('hardhat/config');
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
require('./tasks/block-number');

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

console.log(`Private key is : ${PRIVATE_KEY}`);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	defaultNetwork: 'hardhat',
	networks: {
		goerli: { url: GOERLI_RPC_URL, accounts: [`${PRIVATE_KEY}`], chainId: 5 },
		localhost: {
			url: 'http://127.0.0.1:8545/',
			chainId: 31337,
		},
	},
	solidity: '0.8.9',
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
};
