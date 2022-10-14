
import Web3 from "web3";
import fs from "fs";
import abi_erc20 from "../storage/abi-erc20.js";
import tokenList from "../storage/token-list";
import { TokenResponseDto } from "../dto/token-response.dto.js";

const provider = process.env.PROVIDER || 'https://cloudflare-eth.com';
const web3 = new Web3(provider)

class TokenService {
  async getBalanceByAddress(walletAddress: string): Promise<TokenResponseDto[]> {
    const tokenResponseDto: TokenResponseDto[] = [];

    let ethBalance: string = await web3.eth.getBalance(walletAddress, 'latest');
    ethBalance = +ethBalance / Math.pow(10, 18) + '';
    
    tokenResponseDto.push({
      name: 'Ethereum',
      contract: '',
      balance: ethBalance,
    })
    
    for (const token of tokenList) {
      const contract = new web3.eth.Contract(abi_erc20, token.contract);
      let balance: string = await contract.methods.balanceOf(walletAddress).call();
      balance = +balance / Math.pow(10, token.decimals) + '';
    
      tokenResponseDto.push({
        name: token.name, 
        contract: token.contract, 
        balance,
      })
    }
  
    return tokenResponseDto;
  }

  async saveBalanceByAddress(walletAddress: string) {
    const tokenResponseDto: TokenResponseDto[] = await this.getBalanceByAddress(walletAddress);
    const json = JSON.stringify({fetchedAt: new Date(), latestBalance: tokenResponseDto});
    fs.writeFile('./files/tokensOnWallet.json', json, 'utf8', (err) => { 
      if(err) console.error(err); 
    });  
    
    setTimeout(async () => {
      await this.saveBalanceByAddress(walletAddress);
    }, 60000);
  }
}

export default new TokenService();
