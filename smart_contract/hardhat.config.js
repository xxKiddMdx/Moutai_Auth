//https://eth-sepolia.g.alchemy.com/v2/UrWOgCkykMkOJ5sKkTP0VybHcjqhPdSo
//https://eth-goerli.g.alchemy.com/v2/SbFB7JMz0KHxXFrlYKrvdz-mAkcC95Sb

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/UrWOgCkykMkOJ5sKkTP0VybHcjqhPdSo',
      accounts: [ '1cdf6b4ab85f6c478000032be8630457d24fac5ef42223d487a3a106346dafcd' ]
    }
  }
}
