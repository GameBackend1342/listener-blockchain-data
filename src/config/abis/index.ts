import { AlchemyProvider, ethers } from 'ethers';
import { default as CONSTANTS } from '../constants';

export function getContract(nftType: 'android' | 'spaceship' | 'equipment' | 'medallion', _network: string) {
    if (CONSTANTS[nftType] === undefined) {
        throw new Error('Invalid NFT type: ' + nftType);
    }

    const alchemyProvider = new AlchemyProvider(_network ?? CONSTANTS.COIN, CONSTANTS.API_KEY_ALCHEMY);

    const agnosticContractProvider = new ethers.Contract(
        CONSTANTS[nftType].ADDRESS,
        CONSTANTS[nftType].ABI,
        alchemyProvider,
    );

    return agnosticContractProvider;
}
