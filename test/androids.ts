import * as dotenv from 'dotenv';
import path from 'node:path';
import { callbackLambda } from '../src/index';

dotenv.config({ path: path.join(__dirname, '.env') });

/* // Test android nft
handlerEvent({ _network: 'matic-mumbai', nftType: 'android', tokenId: 1 }).then((e) => console.log('Android: ', e));
// Test spaceship nft
handlerEvent({ _network: 'matic-mumbai', nftType: 'spaceship', tokenId: 1 }).then((e) => console.log('Spaceship: ', e));
// Test equipment nft
handlerEvent({ _network: 'matic-mumbai', nftType: 'equipment', tokenId: 1 }).then((e) => console.log('Equipment: ', e));
// Test medallion nft
handlerEvent({ _network: 'matic-mumbai', nftType: 'medallion', tokenId: 1 }).then((e) => console.log('Medallion: ', e));
 */
console.log(JSON.stringify({ _network: 'matic-mumbai', nftType: 'android', tokenId: 1 }));
callbackLambda(
    {
        Records: [
            {
                body: '{ \\"_network\\": \\"matic-mumbai\\", \\"nftType\\": \\"android\\", \\"tokenId\\": \\"1\\" }',
            },
        ],
    },
    {},
).then((e) => console.log('Android: ', e));
