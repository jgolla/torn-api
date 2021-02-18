export interface ITornApiError {
    code: number;
    error: string;
}

export interface IBank {
    '1w': string;
    '2w': string;
    '1m': string;
    '2m': string;
    '3m': string;
}

export interface ILife {
    current: number;
    maximum: number;
    increment: number;
    interval: number;
    ticktime: number;
    fulltime: number;
}

export interface IStatus {
    description: string;
    details: string;
    state: string;
    color: string;
    until: number;
}

export interface IJob {
    position: string;
    company_id: number;
    company_name: string;
    company_type: number;
}

export interface IMarried {
    spouse_id: number;
    spouse_name: string;
    duration: number;
}

export interface IBasicicons {
    icon7: string;
    icon4: string;
    icon8: string;
    icon27: string;
    icon9: string;
    icon71: string;
}

export interface IStates {
    hospital_timestamp: number;
    jail_timestamp: number;
}

export interface ILastAction {
    status: string;
    timestamp: number;
    relative: string;
}

export interface IUser {
    rank: string;
    level: number;
    gender: string;
    property: string;
    signup: string;
    awards: number;
    friends: number;
    enemies: number;
    forum_posts: number;
    karma: number;
    age: number;
    role: string;
    donator: number;
    player_id: number;
    name: string;
    property_id: number;
    competition?: any;
    life: ILife;
    status: IStatus;
    job: IJob;
    faction: {
        position: string;
        faction_id: number;
        days_in_faction: number;
        faction_name: string;
        faction_tag: string;
    };
    married: IMarried;
    basicicons: IBasicicons;
    states: IStates;
    last_action: ILastAction;
}

export interface IAmmo {
    ammoID: number;
    typeID: number;
    size: string;
    type: string;
    quantity: number;
    equipped: number;
}

export interface IStatus {
    description: string;
    details: string;
    state: string;
    color: string;
    until: number;
}

export interface IBasic {
    level: number;
    gender: string;
    player_id: number;
    name: string;
    status: IStatus;
}

export interface IFaction {
    ID: number;
    name: string;
    tag: string;
    leader: number;
    'co-leader': number;
    respect: number;
    age: number;
    best_chain: number;
    territory_wars: ITerritoryWars;
    raid_wars: IRaidWars;
    peace: IPeace;
    members: Map<string, IMember>;
}

export interface ITerritoryWars {
}

export interface IRaidWars {
}

export interface IPeace {
}

export interface IMember {
    name: string;
    days_in_faction: number;
    last_action: ILastAction;
    status: IStatus;
    position: string;
}

interface IArmoryBase {
    ID: number;
    name: string;
    type: string;
    quantity: number;
}

export interface IArmor extends IArmoryBase {
    available: number;
    loaned: number;
    loaned_to?: string;
}

export interface IWeapon extends IArmor { }

export interface IDrug extends IArmoryBase { }

export interface IMedical extends IArmoryBase { }

export interface IStats {
    drugsused: number;
    gymtrains: number;
    gymstrength: number;
    gymdefense: number;
    gymspeed: number;
    criminaloffences: number;
    jails: number;
    gymdexterity: number;
    hosps: number;
    medicalitemsused: number;
    medicalcooldownused: number;
    medicalitemrecovery: number;
    attacksdamagehits: number;
    attacksdamage: number;
    hosptimegiven: number;
    attacksleave: number;
    attackswon: number;
    candyused: number;
    attacksdamaging: number;
    energydrinkused: number;
    hosptimereceived: number;
    attackslost: number;
    attacksmug: number;
    attackshosp: number;
    organisedcrimefail: number;
    alcoholused: number;
    organisedcrimerespect: number;
    organisedcrimemoney: number;
    organisedcrimesuccess: number;
    attacksrunaway: number;
    busts: number;
    drugoverdoses: number;
    bestchain: number;
    traveltimes: number;
    traveltime: number;
    rehabs: number;
    hunting: number;
    caymaninterest: number;
    revives: number;
}

interface INews {
    timestamp: number;
    news: string;
}

export interface IArmoryNews extends INews { }
export interface IAttackNews extends INews { }
export interface ICrimeNews extends INews { }
export interface IFundsNews extends INews { }
export interface IMainNews extends INews { }
export interface IMembershipNews extends INews { }

export interface IAttackFull {
    code: string;
    timestamp_started: number;
    timestamp_ended: number;
    attacker_id: number;
    attacker_faction: number;
    defender_id: number;
    defender_faction: number;
    result: string;
    stealthed: number;
    respect_gain: number;
}

export interface IAttack extends IAttackFull {
    attacker_name: string;
    attacker_factionname: string;
    defender_name: string;
    defender_factionname: string;
    chain: number;
    modifiers: {
        fairFight: number;
        war: number;
        retaliation: number;
        groupAttack: number;
        overseas: number;
        chainBonus: number;
    };
}

export interface IChain {
    current: number;
    max: number;
    timeout: number;
    modifier: number;
    cooldown: number;
    start: number;
}

export interface ICompleteChain {
    chain: number;
    respect: string;
    start: number;
    end: number;
}

export interface IApplication {
    userID: number;
    name: string;
    level: number;
    stats: {
        strength: number;
        speed: number;
        dexterity: number;
        defence: number;
    };
    message: string;
    expires: number;
}

export interface ICrimeParticipant {
    id: string;
    description?: string;
    details?: string;
    state?: string;
    color?: string;
    until?: number;
}

export interface ICrime {
    crime_id: number;
    crime_name: string;
    participants: ICrimeParticipant[];
    time_started: number;
    time_ready: number;
    time_left: number;
    time_completed: number;
    initiated: number;
    initiated_by: number;
    planned_by: number;
    success: number;
    money_gain: number;
    respect_gain: number;
}

export interface ICurrency {
    faction_id: number;
    points: number;
    money: number;
}

export interface IDonation {
    name: string;
    money_balance: number;
    points_balance: number;
}

export interface IRevivesFull {
    timestamp: number;
    reviver_id: number;
    reviver_faction: number;
    target_id: number;
    target_faction: number;
    target_hospital_reason: string;
    target_last_action: {
        status: string;
        timestamp: number;
    };
}

export interface IRevives extends IRevivesFull {
    reviver_name: string;
    reviver_factionname: string;
    target_name: string;
    target_factionname: string;
}

export interface IUpgrade {
    branch: string;
    branchorder: number;
    branchmultiplier: number;
    name: string;
    level: number;
    basecost: number;
    ability: string;
    unlocked: string;
}