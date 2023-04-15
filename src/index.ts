import * as Sentry from '@sentry/serverless';
import * as dotenv from 'dotenv';
import { AlchemyProvider, ethers } from 'ethers';
import { default as CONSTANTS } from './constants/index';

dotenv.config();
Sentry.AWSLambda.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
});

Object.assign(CONSTANTS, { COIN: process.env.COIN, API_KEY_ALCHEMY: process.env.API_KEY_ALCHEMY });

/*
 * Retrieves metadata for NFTs and checks if they exist in the database.
 * If they don't exist, it fetches their rarity and inserts them into the database.
 * @returns {Promise<void>}
 */
export async function handlerEvent({
    nftType = '',
    tokenId = 0,
    _network = '',
}: {
    nftType: string;
    tokenId: number;
    _network: any;
}): Promise<any> {
    if (CONSTANTS[nftType] === undefined) {
        throw new Error('Invalid NFT type: ' + nftType);
    }

    const alchemyProvider = new AlchemyProvider(_network ?? CONSTANTS.COIN, CONSTANTS.API_KEY_ALCHEMY);
    const agnosticContractProvider = new ethers.Contract(
        CONSTANTS[nftType].ADDRESS,
        CONSTANTS[nftType].ABI,
        alchemyProvider,
    );

    try {
        const blockchainResponse = await agnosticContractProvider.attributes(tokenId);
        const data = new Map(blockchainResponse.filter(([key, value]: any) => key !== '' && value !== ''));
        const response = Object.fromEntries(data);

        return Object.assign(response, { nftType });
    } catch (error: any) {
        throw new Error(error);
    }
}

/**
 * Executes a callback function that converts the body of an SQS queue event to JSON, handles each event with a given handler,
 * and returns a success response with the results.
 * @param event - An SQS queue event.
 * @param context - The AWS Lambda context object.
 * @returns A success response object with a message and the results of processing each event.
 */
const callback = async (event: any, context: any) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // Converte o body da fila SQS para JSON
    const events = event.Records.map(({ body }: any) => JSON.parse(body));

    const res = await Promise.all(events.map((ev: any) => handlerEvent(ev)));

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { message: 'Success', res },
    };
};

exports.handler = Sentry.AWSLambda.wrapHandler(callback);
