export interface AndroidNft {
    skills: string[];
    tokenId: string;
    type: string;
    rarity: string;
    version: string;
    class: string;
    nftType: 'android';
}

export type AndroidBlockchainResponse = [
    bigint,
    string[],
    [bigint, bigint, string, string, string][],
    [string, string][],
];
