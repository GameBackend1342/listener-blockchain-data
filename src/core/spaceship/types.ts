export interface SpaceshipNft {
    skills: string[];
    tokenId: string;
    type: string;
    rarity: string;
    version: string;
    class: string;
    nftType: 'spaceship';
}

export type SpaceshipBlockchainResponse = [
    bigint,
    string[],
    [bigint, bigint, string, string, string][],
    [string, string][],
];
