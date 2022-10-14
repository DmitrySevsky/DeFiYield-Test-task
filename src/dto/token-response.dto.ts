import { TokenDto } from "./token.dto";

export interface TokenResponseDto extends Omit<TokenDto, 'decimals'> {
  balance: string;
}


