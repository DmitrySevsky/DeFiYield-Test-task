
import { TokenResponseDto } from "../dto/token-response.dto.js";
import TokenService from "../services/token-service.js";
import cron from "node-cron";
import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();

router.get('/display/:address', async (req: Request, res: Response) => {
  const walletAddress = req.params.address;
  const tokenResponseDto: TokenResponseDto[] = await TokenService.getBalanceByAddress(walletAddress);
  res.send(tokenResponseDto);
});

router.get('/save/:address', async (req: Request, res: Response) => {
  const walletAddress = req.params.address; 
  process.env.ADDRESS = walletAddress;

  // await TokenService.saveBalanceByAddress(walletAddress);

  await TokenService.saveBalanceByAddress(walletAddress);

  


  res.sendStatus(200);
});

export = router;