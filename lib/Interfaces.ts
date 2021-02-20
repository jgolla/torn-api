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

// /faction/

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
    territory_wars: unknown;
    raid_wars: unknown;
    peace: unknown;
    members: Map<string, IMember>;
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

export type IWeapon = IArmor

export type IDrug = IArmoryBase

export type IMedical = IArmoryBase

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

export type IArmoryNews = INews
export type IAttackNews = INews
export type ICrimeNews = INews
export type IFundsNews = INews
export type IMainNews = INews
export type IMembershipNews = INews

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

// /User/

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

export interface IBasicUser {
    level: number;
    gender: string;
    player_id: number;
    name: string;
    status: IStatus;
}

export interface IUser extends IBasicUser {
    rank: string;
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
    property_id: number;
    competition?: unknown;
    life: IUserBar;
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

export interface IAttacksFull {
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

export interface IAttacks extends IAttacksFull {
    attacker_name: string;
    attacker_factionname: string;
    defender_name: string;
    defender_factionname?: string;
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

export interface IUserBar {
    current: number;
    maximum: number;
    increment: number;
    interval: number;
    ticktime: number;
    fulltime: number;
}

export interface IBars {
    server_time: number;
    happy: IUserBar;
    life: IUserBar;
    energy: IUserBar;
    nerve: IUserBar;
    chain: {
        current: number;
        maximum: number;
        timeout: number;
        modifier: number;
        cooldown: number;
    };
}

export interface IBattleStats {
    strength: number;
    speed: number;
    dexterity: number;
    defense: number;
    total: number;
    strength_modifier: number;
    defense_modifier: number;
    speed_modifier: number;
    dexterity_modifier: number;
    strength_info: string[];
    defense_info: string[];
    speed_info: string[];
    dexterity_info: string[];
}

export interface ICooldowns {
    drug: number;
    medical: number;
    booster: number;
}

export interface ICrimes {
    selling_illegal_products: number;
    theft: number;
    auto_theft: number;
    drug_deals: number;
    computer_crimes: number;
    murder: number;
    fraud_crimes: number;
    other: number;
    total: number;
}

export interface IDiscord {
    userID: number;
    discordID: string;
}

export interface IEducation {
    education_current: number;
    education_timeleft: number;
    education_completed: number[];
}

export interface IEvents {
    timestamp: number;
    event: string;
    seen: number;
}

export interface IGym {
    active_gym: number;
}

export interface IHOFStat {
    value: number;
    rank: number;
}

export interface IHOF {
    attacks: IHOFStat;
    battlestats: IHOFStat;
    busts: IHOFStat;
    defends: IHOFStat;
    networth: IHOFStat;
    offences: IHOFStat;
    revives: IHOFStat;
    traveled: IHOFStat;
    workstats: IHOFStat;
    level: IHOFStat;
    rank: IHOFStat;
    respect: IHOFStat;
}

export interface IIcon {
    name: string;
    value: string;
}

export interface IInventory {
    ID: number;
    name: string;
    type: string;
    quantity: number;
    equipped: number;
    market_price: number;
}

export interface IJobs {
    medical: number;
    casino: number;
    education: number;
    law: number;
    grocer: number;
}

export interface ICompany {
    name: string;
    jobpoints: number;
}

export interface IJobPoints {
    jobs: IJobs;
    companies: ICompany[];
}

export interface IMedals {
    medals_awarded: number[];
    medals_time: number[];
}

export interface IMerits {
    'Nerve Bar': number;
    'Critical Hit Rate': number;
    'Life Points': number;
    'Crime Experience': number;
    'Education Length': number;
    Awareness: number;
    'Bank Interest': number;
    'Masterful Looting': number;
    Stealth: number;
    Hospitalizing: number;
    'Addiction Mitigation': number;
    'Employee Effectiveness': number;
    Brawn: number;
    Protection: number;
    Sharpness: number;
    Evasion: number;
    'Heavy Artillery Mastery': number;
    'Machine Gun Mastery': number;
    'Rifle Mastery': number;
    'SMG Mastery': number;
    'Shotgun Mastery': number;
    'Pistol Mastery': number;
    'Club Mastery': number;
    'Piercing Mastery': number;
    'Slashing Mastery': number;
    'Mechanical Mastery': number;
    'Temporary Mastery': number;
}

export interface IMessage {
    timestamp: number;
    ID: number;
    name: string;
    type: string;
    title: string;
    seen: number;
    read: number;
}

export interface IMoney {
    points: number;
    cayman_bank: number;
    vault_amount: number;
    daily_networth: number;
    money_onhand: number;
    city_bank: {
        amount: number;
        time_left: number;
    };
}

export interface INetworth {
    pending: number;
    wallet: number;
    bank: number;
    points: number;
    cayman: number;
    vault: number;
    piggybank: number;
    items: number;
    displaycase: number;
    bazaar: number;
    properties: number;
    stockmarket: number;
    auctionhouse: number;
    company: number;
    bookie: number;
    loan: number;
    unpaidfees: number;
    total: number;
    parsetime: number;
}

export interface INotifications {
    messages: number;
    events: number;
    awards: number;
    competition: number;
}

export interface IPerks {
    job_perks: string[];
    property_perks: string[];
    stock_perks: string[];
    merit_perks: string[];
    education_perks: string[];
    enhancer_perks: string[];
    company_perks: string[];
    faction_perks: string[];
    book_perks: string[];
}

export interface IPersonalStats {
    bazaarcustomers: number;
    bazaarsales: number;
    bazaarprofit: number;
    useractivity: number;
    itemsbought: number;
    pointsbought: number;
    itemsboughtabroad: number;
    moneyinvested: number;
    investedprofit: number;
    weaponsbought: number;
    trades: number;
    itemssent: number;
    auctionswon: number;
    auctionsells: number;
    pointssold: number;
    attackswon: number;
    attackslost: number;
    attacksdraw: number;
    bestkillstreak: number;
    killstreak: number;
    moneymugged: number;
    attacksstealthed: number;
    attackhits: number;
    attackmisses: number;
    attackdamage: number;
    attackcriticalhits: number;
    respectforfaction: number;
    onehitkills: number;
    defendswon: number;
    defendslost: number;
    defendsstalemated: number;
    bestdamage: number;
    roundsfired: number;
    yourunaway: number;
    theyrunaway: number;
    highestbeaten: number;
    peoplebusted: number;
    failedbusts: number;
    peoplebought: number;
    peopleboughtspent: number;
    virusescoded: number;
    cityfinds: number;
    traveltimes: number;
    bountiesplaced: number;
    bountiesreceived: number;
    bountiescollected: number;
    totalbountyreward: number;
    revives: number;
    revivesreceived: number;
    medicalitemsused: number;
    statenhancersused: number;
    refills: number;
    trainsreceived: number;
    totalbountyspent: number;
    drugsused: number;
    overdosed: number;
    meritsbought: number;
    timesloggedin: number;
    personalsplaced: number;
    classifiedadsplaced: number;
    mailssent: number;
    friendmailssent: number;
    factionmailssent: number;
    companymailssent: number;
    spousemailssent: number;
    largestmug: number;
    cantaken: number;
    exttaken: number;
    kettaken: number;
    lsdtaken: number;
    opitaken: number;
    shrtaken: number;
    spetaken: number;
    pcptaken: number;
    xantaken: number;
    victaken: number;
    chahits: number;
    heahits: number;
    axehits: number;
    grehits: number;
    machits: number;
    pishits: number;
    rifhits: number;
    shohits: number;
    smghits: number;
    piehits: number;
    slahits: number;
    argtravel: number;
    mextravel: number;
    dubtravel: number;
    hawtravel: number;
    japtravel: number;
    lontravel: number;
    soutravel: number;
    switravel: number;
    chitravel: number;
    cantravel: number;
    dumpfinds: number;
    dumpsearches: number;
    itemsdumped: number;
    daysbeendonator: number;
    caytravel: number;
    jailed: number;
    hospital: number;
    attacksassisted: number;
    bloodwithdrawn: number;
    networth: number;
    missionscompleted: number;
    contractscompleted: number;
    dukecontractscompleted: number;
    missioncreditsearned: number;
    consumablesused: number;
    candyused: number;
    alcoholused: number;
    energydrinkused: number;
    nerverefills: number;
    unarmoredwon: number;
    h2hhits: number;
    organisedcrimes: number;
    territorytime: number;
    territoryjoins: number;
    stockpayouts: number;
    arrestsmade: number;
    tokenrefills: number;
    booksread: number;
    traveltime: number;
    boostersused: number;
    rehabs: number;
    rehabcost: number;
    awards: number;
    receivedbountyvalue: number;
    networthpending: number;
    networthwallet: number;
    networthbank: number;
    networthpoints: number;
    networthcayman: number;
    networthvault: number;
    networthpiggybank: number;
    networthitems: number;
    networthdisplaycase: number;
    networthbazaar: number;
    networthproperties: number;
    networthstockmarket: number;
    networthauctionhouse: number;
    networthcompany: number;
    networthbookie: number;
    networthloan: number;
    networthunpaidfees: number;
    racingskill: number;
    raceswon: number;
    racesentered: number;
    racingpointsearned: number;
    specialammoused: number;
    cityitemsbought: number;
    hollowammoused: number;
    tracerammoused: number;
    piercingammoused: number;
    incendiaryammoused: number;
    attackswonabroad: number;
    defendslostabroad: number;
    retals: number;
    elo: number;
    strength: number;
    defense: number;
    speed: number;
    dexterity: number;
    totalstats: number;
    manuallabor: number;
    intelligence: number;
    endurance: number;
    totalworkingstats: number;
    activestreak: number;
    bestactivestreak: number;
    jobpointsused: number;
}

export interface IPropertyModifications {
    interior: number;
    hot_tub: number;
    sauna: number;
    pool: number;
    open_bar: number;
    shooting_range: number;
    vault: number;
    medical_facility: number;
    airstrip: number;
    yacht: number;
}

export interface IPropertyStaff {
    maid: number;
    guard: number;
    pilot: number;
    butler: number;
    doctor: number;
}

export interface IProperty {
    owner_id: number;
    property_type: number;
    property: string;
    status: string;
    happy: number;
    upkeep: number;
    staff_cost: number;
    cost: number;
    marketprice: number;
    modifications: IPropertyModifications;
    staff: IPropertyStaff;
}

export interface IRefills {
    energy_refill_used: boolean;
    nerve_refill_used: boolean;
    token_refill_used: boolean;
    special_refills_available: number;
}

export interface TargetLastAction {
    status: string;
    timestamp: number;
}

export interface IRevivesFull {
    timestamp: number;
    reviver_id: number;
    reviver_faction: number;
    target_id: number;
    target_faction: number;
    target_hospital_reason: string;
    target_last_action: TargetLastAction;
}

export interface IRevives extends IRevivesFull {
    reviver_name: string;
    reviver_factionname: string;
    target_name: string;
    target_factionname: string;
}

export interface IStocks {
    stock_id: number;
    shares: number;
    bought_price: number;
    time_bought: number;
    time_listed: number;
}

export interface ITravel {
    destination: string;
    timestamp: number;
    departed: number;
    time_left: number;
}

export interface IWorkStats {
    manual_labor: number;
    intelligence: number;
    endurance: number;
}
