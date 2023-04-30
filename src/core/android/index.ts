import { getContract } from '../../config/abis';

import { parser } from './parser';
import { AndroidBlockchainResponse } from './types';

export async function handle(tokenId: string, network: string) {
    const result = await downloadBlockchain(tokenId, network);

    return parser(result);
}

export async function downloadBlockchain(tokenId: string, network: string): Promise<AndroidBlockchainResponse> {
    const contract = getContract('android', network);

    const blockchainResponse = await contract.metadata(tokenId);

    return blockchainResponse;
}
