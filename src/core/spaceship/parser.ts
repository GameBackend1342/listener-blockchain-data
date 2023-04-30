import { SpaceshipBlockchainResponse, SpaceshipNft } from './types';

export function parser(data: SpaceshipBlockchainResponse): SpaceshipNft {
    const [tokenId, , , attributes] = data;

    const type = getAttr('type', attributes)!;
    const _class = getAttr('class', attributes)!;
    const rarity = getAttr('rarity', attributes)!;
    const version = getAttr('version', attributes)!;

    const result: SpaceshipNft = {
        rarity,
        nftType: 'spaceship',
        version,
        tokenId: tokenId.toString(),
        type,
        class: _class,
        skills: [], // TODO, as skills seram feitas posteriormente com um upgrade durante o game
    };

    return result;
}

export function getAttr(name: string, attributes: [string, string][]) {
    return attributes.find(([key]: any) => key === name)?.[1];
}
