import * as dotenv from 'dotenv';
import path from 'node:path';
import { handlerEvent } from '../src/index';

dotenv.config({ path: path.join(__dirname, '.env') });

// Test android nft
handlerEvent({ _network: 'matic-mumbai', nftType: 'android', tokenId: 1 }).then((e) => console.log('Android: ', e));
// Test spaceship nft
handlerEvent({ _network: 'matic-mumbai', nftType: 'spaceship', tokenId: 1 }).then((e) => console.log('Spaceship: ', e));
// Test equipment nft
handlerEvent({ _network: 'matic-mumbai', nftType: 'equipment', tokenId: 1 }).then((e) => console.log('Equipment: ', e));
// Test medalion nft
handlerEvent({ _network: 'matic-mumbai', nftType: 'medalion', tokenId: 1 }).then((e) => console.log('Medalion: ', e));
