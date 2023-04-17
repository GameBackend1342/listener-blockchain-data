import ANDROID_ABI from '../abis/android.json';
import EQUIPMENT_ABI from '../abis/equipment.json';
import MEDALLION_ABI from '../abis/medallion.json';
import SPACESHIP_ABI from '../abis/spaceship.json';

const CONSTANTS: any = {
    android: {
        ABI: ANDROID_ABI,
        ADDRESS: '0x77aa13f1a627C37C23b316e4590F1d2930610b8B',
    },
    spaceship: {
        ABI: SPACESHIP_ABI,
        ADDRESS: '0xe4e5d1d49A8A0f703991C84d3378CB2D9Cbbd6ca',
    },
    equipment: {
        ABI: EQUIPMENT_ABI,
        ADDRESS: '0x2a9B59F176EeE58B09624EE0A570eE85dC8e3Bc7',
    },
    medallion: {
        ABI: MEDALLION_ABI,
        ADDRESS: '0x7758B51343e42B79a14c751b770990fbf00695bf',
    },
};

export default CONSTANTS;
