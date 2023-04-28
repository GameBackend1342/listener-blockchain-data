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
    _network = null,
}: {
    nftType: string;
    tokenId: number;
    _network: any;
}): Promise<any> {
    console.log({ nftType, tokenId, _network });

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

        return Object.assign(response, { nftType, tokenId });
    } catch (error: any) {
        throw new Error(error);
    }
}

/**
 * Escapes special characters in a JSON string.
 *
 * @param json - The JSON string to escape.
 * @returns The escaped JSON string.
 */
const escape = (json: string) => {
    return json
        .replace(/\\n/g, '\\n')
        .replace(/\\'/g, '\\"')
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, '\\&')
        .replace(/\\r/g, '\\r')
        .replace(/\\t/g, '\\t')
        .replace(/\\b/g, '\\b')
        .replace(/\\f/g, '\\f')
        .replace(/\\/g, '');
};

/**
 * Executes a callback function that converts the body of an SQS queue event to JSON, handles each event with a given handler,
 * and returns a success response with the results.
 * @param event - An SQS queue event.
 * @param context - The AWS Lambda context object.
 * @returns A success response object with a message and the results of processing each event.
 */
export const callbackLambda = async (event: any, context: any) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // Converte o body da fila SQS para JSON
    //console.log('Event: ', event.Records[0].body);
    const events = event.Records.map(({ body }: any) => JSON.parse(escape(body)));
    console.log('Events: ', events);
    const res = await Promise.all(events.map((ev: any) => handlerEvent(ev)));

    // Call lambda generate metadata
    return {
        statusCode: 200,
        body: JSON.stringify(res),
    };
};

exports.handler = Sentry.AWSLambda.wrapHandler(callbackLambda);
