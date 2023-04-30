import { AndroidBlockchainResponse, AndroidNft } from './types';
 
export function parser(data: AndroidBlockchainResponse): AndroidNft {
    const [tokenId, , skills, attributes] = data;

    const type = getAttr('type', attributes)!;
    const _class = getAttr('class', attributes)!;
    const rarity = getAttr('rarity', attributes)!;
    const version = getAttr('version', attributes)!;

    const result: AndroidNft = {
        rarity,
        nftType: 'android',
        version,
        tokenId: tokenId.toString(),
        type,
        class: _class,
        skills: getSkills(skills),
    };

    return result;
}

export function getSkills(skills: [bigint, bigint, string, string, string][]) {
    const result: string[] = [];

    for (const skill of skills) {
        const [, level, , , name] = skill;

        if (level <= 0 || !level) {
            continue;
        }

        if (level > 2) {
            throw new Error(`O level ${level} da ${name} não foi implementado`);
        }

        const finalName = `${mapSkill(name)} ${level}`;

        result.push(finalName);
    }

    return result;
}

export function mapSkill(skill: string) {
    // FIXME, colocar o restante das skills aqui

    switch (skill) {
        case 'flash_blade':
            return 'Flash Blade';
        case 'heavy_cut':
            return 'Heavy Cut';
        case 'shield_bash':
            return 'Shield Bash';
        case 'raise_shield':
            return 'Raise Shield';
        case 'leg_shot':
            return 'Leg Shot';
        case 'quick_reload':
            return 'Quick Reload';
        case 'piercing_strike':
            return 'Piercing Strike';
        case 'quick_stab':
            return 'Quick Stab';
        case 'freeze_gas':
            return 'Freeze Gas';
        case 'slick_movement':
            return 'Slick Movement';
        case 'double_blast':
            return 'Double Blast';
        case 'charged_laser':
            return 'Charged Laser';
        case 'wave_slash':
            return 'Wave Slash';
        case 'critical_strike':
            return 'Critical Strike';
        case 'fierce_shield':
            return 'Fierce Shield';
        case 'provoke':
            return 'Provoke';
        case 'arm_shot':
            return 'Arm Shot';
        case 'first_aid':
            return 'First Aid';
        case 'low_blow':
            return 'Low Blow';
        case 'easy_prey':
            return 'Easy Prey';
        case 'hypnotic_syphon':
            return 'Hypnotic Syphon';
        case 'syphon_blast':
            return 'Syphon Blast';
        case 'laser_ricochet':
            return 'Laser Ricochet';
        case 'violent_barrage':
            return 'Violent Barrage';
        case 'mega_slash':
            return 'Mega Slash';
        case 'triple_slash':
            return 'Triple Slash';
        case 'immovable_shield':
            return 'Immovable Shield';
        case 'shield_smash':
            return 'Shield Smash';
        case 'focus':
            return 'Focus';
        case 'eletric_shrapnel':
            return 'Eletric Shrapnel';
        case 'natural_hunter':
            return 'Natural Hunter';
        case 'dagger_frenzy':
            return 'Dagger Frenzy';
        case 'flame_thrower':
            return 'Flame Thrower';
        case 'energy_gas':
            return 'Energy Gas';
        case 'blind_wave':
            return 'Blind Wave';
        case 'corrosion_laser':
            return 'Corrosion Laser';

        default:
            throw new Error(`A skill ${skill} não foi implementada!`);
    }
}

export function getAttr(name: string, attributes: [string, string][]) {
    return attributes.find(([key]: any) => key === name)?.[1];
}
