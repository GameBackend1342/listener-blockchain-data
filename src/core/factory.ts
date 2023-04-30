import { handle as handleAndroid } from './android';
import { NftType } from './nft/types';
import { handle as handleSpaceship } from './spaceship';
import * as Sentry from '@sentry/serverless';

export function factory(tokenId: string, nftType: NftType, network: string) {
    Sentry.setTags({ 
        network,
    });

    Sentry.setExtras({
        tokenId,
        nftType,
        network,
    });

    Sentry.setContext('nft', {
        tokenId,
        nftType,
        network,
    });

    switch (nftType) {
        case 'android':
            return handleAndroid(tokenId, network);
        case 'spaceship':
            return handleSpaceship(tokenId, network);

        default:
            throw new Error(`Handler ${nftType} não implementado (token: ${tokenId}, network: ${network})!`);
        // case 'equipment':
        //     return handle(tokenId, network);
        // case 'medallion':
        //     return handle(tokenId, network);
    }
}
