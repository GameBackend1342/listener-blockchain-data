import { getContract } from '../../config/abis';

import { parser } from './parser';
import { SpaceshipBlockchainResponse } from './types';

export async function handle(tokenId: string, network: string) {
    const result = await downloadBlockchain(tokenId, network);

    return parser(result);
}

export async function downloadBlockchain(tokenId: string, network: string): Promise<SpaceshipBlockchainResponse> {
    const contract = getContract('spaceship', network);

    const blockchainResponse = await contract.metadata(tokenId);

    return blockchainResponse;
}
