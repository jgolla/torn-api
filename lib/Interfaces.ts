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
    capacity: number;
    best_chain: number;
    territory_wars: IFactionTerritoryWar[];
    raid_wars: IFactionRaid[];
    peace: IPeace[];
    members: IMember[];
}

export interface IPeace {
    faction_id: number;
    until: number;
}

export interface IFactionTerritoryWar {
    territory: string;
    assaulting_faction: number;
    defending_faction: number;
    score: number;
    required_score: number;
    start_time: number;
    end_time: number;
}

export interface IFactionRaid {
    raiding_faction: number;
    defending_faction: number;
    raider_score: string;
    defender_score: string;
    start_time: number;
}

export interface IMember {
    id: string;
    level: number;
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
    loaned_to?: string | number;
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

export interface INews {
    id: string;
    timestamp: number;
    news: string;
}

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
    raid: number;
    respect_gain: number;
    respect_loss: number;
    modifiers: {
        fair_fight: number;
        war: number;
        retaliation: number;
        group_attack: number;
        overseas: number;
        chain_bonus: number;
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
    id: string;
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
    id: string;
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
    id: string;
    name: string;
    money_balance: number;
    points_balance: number;
}

export interface IReport {
    strength?: number;
    speed?: number;
    defense?: number;
    dexterity?: number;
    total_battlestats?: number;
    manual_labor?: number;
    intelligence?: number;
    endurance?: number;
    total_workstats?: number;
}

export interface IFactionReport {
    id: string;
    user_id: number;
    target: number;
    type: string;
    report: IReport | string[];
    timestamp: number;
}

export interface IRevivesFull {
    id: string;
    timestamp: number;
    result: string;
    chance: number;
    reviver_id: number;
    reviver_faction: number;
    target_id: number;
    target_faction: number;
    target_hospital_reason: string;
    target_early_discharge: number;
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
    id: string;
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
    basicicons: IIcon[];
    states: IStates;
    last_action: ILastAction;
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
    id: string;
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

export interface IUserCompany {
    name: string;
    jobpoints: number;
}

export interface IJobPoints {
    jobs: IJobs;
    companies: IUserCompany[];
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
    company_funds: number;
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
    activestreak: number;
    bestactivestreak: number;
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
    stockprofits: number;
    stocklosses: number;
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
    networthitemmarket: number;
    networthauctionhouse: number;
    networthcompany: number;
    networthbookie: number;
    networthenlistedcars: number;
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
    jobpointsused: number;
    reviveskill: number;
    itemslooted: number;
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

export interface IUserStockTransaction {
    id: string;
    shares: number;
    bought_price: number;
    time_bought: number;
}

export interface IUserStock {
    stock_id: number;
    total_shares: number;
    dividend?: {
        ready: number;
        increment: number;
        progress: number;
        frequency: number;
    };
    transactions: IUserStockTransaction[];
}

export interface ITravel {
    destination: string;
    method: string;
    timestamp: number;
    departed: number;
    time_left: number;
}

export interface IWorkStats {
    manual_labor: number;
    intelligence: number;
    endurance: number;
}

export interface Rented {
    user_id: number;
    days_left: number;
    total_cost: number;
    cost_per_day: number;
}

export interface IPropertyBase {
    owner_id: number;
    property_type: number;
    happy: number;
    upkeep: number;
}

export interface IProperty extends IPropertyBase {
    upgrades: string[];
    staff: string[];
    rented: Rented;
    users_living: string;
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

export interface IUserProperty extends IPropertyBase {
    property: string;
    status: string;
    staff_cost: number;
    cost: number;
    marketprice: number;
    modifications: IPropertyModifications;
    staff: IPropertyStaff;
}

export interface ITerritory {
    id: string;
    sector: number;
    size: number;
    density: number;
    daily_respect: number;
    faction: number;
    coordinate_x: string;
    coordinate_y: string;
}

export interface IEffectiveness {
    working_stats: number;
    settled_in: number;
    merits: number;
    director_education: number;
    addiction: number;
    total: number;
}

export interface ICompanyEmployee extends IEmployee {
    manual_labor: number;
    intelligence: number;
    endurance: number;
    effectiveness: IEffectiveness;
}

export interface IEmployee {
    id: string;
    name: string;
    position: string;
    days_in_company: number;
    last_action: ILastAction;
    status: IStatus;
}

export interface ICompany {
    ID: number;
    company_type: number;
    rating: number;
    name: string;
    director: number;
    employees_hired: number;
    employees_capacity: number;
    daily_income: number;
    daily_customers: number;
    weekly_income: number;
    weekly_customers: number;
    days_old: number;
}

export interface ICompanyProfile extends ICompany {
    employees: IEmployee[];
}

export interface IItem {
    id: string;
    name: string;
    description: string;
    effect: string;
    requirement: string;
    type: string;
    weapon_type: string;
    buy_price: number;
    sell_price: number;
    market_value: number;
    circulation: number;
    image: string;
}

export interface ICompanyPosition {
    name: string;
    man_required: number;
    int_required: number;
    end_required: number;
    man_gain: number;
    int_gain: number;
    end_gain: number;
    special_ability: string;
    description: string;
}

export interface ICompanyStock {
    name: string;
    cost: string;
    rrp: number;
}

export interface ICompanySpecial {
    name: string;
    effect: string;
    cost: number;
    rating_required: number;
}

export interface ITornCompany {
    id: string;
    name: string;
    cost: number;
    default_employees: number;
    positions: ICompanyPosition[];
    stock: ICompanyStock[];
    specials: ICompanySpecial[];
}

export interface IEducationResults {
    perk?: string[];
    manual_labor?: string[];
    intelligence?: string[];
    endurance?: string[];
}

export interface ITornEducation {
    id: string;
    name: string;
    description: string;
    money_cost: number;
    tier: number;
    duration: number;
    results: IEducationResults;
    prerequisites: number[];
}

export interface IFactionTree {
    id: string;
    branch: IFactionBranch[];
}

export interface IFactionBranch {
    id: string;
    branch: string;
    name: string;
    ability: string;
    challenge: string;
    base_cost: number;
}

export interface ITornGym {
    id: string;
    name: string;
    stage: number;
    cost: number;
    energy: number;
    strength: number;
    speed: number;
    defense: number;
    dexterity: number;
    note: string;
}

export interface IHonor {
    id: string;
    name: string;
    description: string;
    type: number;
    circulation: number;
    rarity: string;
}

export interface IMedal {
    id: string;
    name: string;
    description: string;
    type: string;
    circulation: number;
    rarity: string;
}

export interface IOrganisedCrime {
    id: string;
    name: string;
    members: number;
    time: number;
    min_cash: number;
    max_cash: number;
    min_respect: number;
    max_respect: number;
}

export interface IPawnshop {
    points_value: number;
    donatorpack_value: number;
}

export interface ITornProperty {
    id: string;
    name: string;
    cost: number;
    happy: number;
    upkeep: number;
    upgrades_available: string[];
    staff_available: string[];
}

export interface IRacket {
    id: string;
    name: string;
    level: number;
    reward: string;
    created: number;
    changed: number;
    faction: number;
}

export interface IRaid {
    id: string;
    assaulting_faction: number;
    defending_faction: number;
    assaulting_score: number;
    defending_score: number;
    started: number;
}

export interface ITornStats {
    timestamp: number;
    users_total: number;
    users_male: number;
    users_female: number;
    users_marriedcouples: number;
    users_daily: number;
    total_users_logins: number;
    total_users_playtime: string;
    job_army: number;
    job_grocer: number;
    job_medical: number;
    job_casino: number;
    job_education: number;
    job_law: number;
    job_company: number;
    job_none: number;
    crimes: number;
    jailed: number;
    money_onhand: number;
    money_average: number;
    money_citybank: number;
    items: number;
    events: number;
    points_total: number;
    points_market: number;
    points_averagecost: number;
    points_bought: number;
    total_points_boughttotal: number;
    total_attacks_won: number;
    total_attacks_lost: number;
    total_attacks_stalemated: number;
    total_attacks_runaway: number;
    total_attacks_hits: number;
    total_attacks_misses: number;
    total_attacks_criticalhits: number;
    total_attacks_roundsfired: number;
    total_attacks_stealthed: number;
    total_attacks_moneymugged: number;
    total_attacks_respectgained: number;
    total_items_marketbought: number;
    total_items_bazaarbought: number;
    total_items_auctionswon: number;
    total_items_sent: number;
    total_trades: number;
    total_items_bazaarincome: number;
    total_items_cityfinds: number;
    total_items_dumpfinds: number;
    total_items_dumped: number;
    total_jail_jailed: number;
    total_jail_busted: number;
    total_jail_busts: number;
    total_jail_bailed: number;
    total_jail_bailcosts: number;
    total_hospital_trips: number;
    total_hospital_medicalitemsused: number;
    total_hospital_revived: number;
    total_mails_sent: number;
    total_mails_sent_friends: number;
    total_mails_sent_faction: number;
    total_mails_sent_company: number;
    total_mails_sent_spouse: number;
    total_classifiedads_placed: number;
    total_bounty_placed: number;
    total_bounty_rewards: number;
    total_travel_all: number;
    total_travel_argentina: number;
    total_travel_mexico: number;
    total_travel_dubai: number;
    total_travel_hawaii: number;
    total_travel_japan: number;
    total_travel_unitedkingdom: number;
    total_travel_southafrica: number;
    total_travel_switzerland: number;
    total_travel_china: number;
    total_travel_canada: number;
    total_travel_caymanislands: number;
    total_drugs_used: number;
    total_drugs_overdosed: number;
    total_drugs_cannabis: number;
    total_drugs_ecstacy: number;
    total_drugs_ketamine: number;
    total_drugs_lsd: number;
    total_drugs_opium: number;
    total_drugs_shrooms: number;
    total_drugs_speed: number;
    total_drugs_pcp: number;
    total_drugs_xanax: number;
    total_drugs_vicodin: number;
    total_merits_bought: number;
    total_refills_bought: number;
    total_company_trains: number;
    total_statenhancers_used: number;
}

export interface IStock {
    stock_id: number;
    name: string;
    acronym: string;
    current_price: number;
    market_cap: number;
    total_shares: number;
    benefit: {
        frequency: number;
        requirement: number;
        description: string;
    };
}

export interface IStockDetail extends IStock {
    last_hour: IStockPeriod;
    last_day: IStockPeriod;
    last_week: IStockPeriod;
    last_month: IStockPeriod;
    last_year: IStockPeriod;
    history: IStockHistory[];
}

interface IStockPeriod {
    change: number;
    change_percentage: number;
    start: number;
    end: number;
    high: number;
    low: number;
}

interface IStockHistory {
    timestamp: number;
    price: number;
    change: number;
}

export interface ITerritoryWar {
    id: string;
    assaulting_faction: number;
    defending_faction: number;
    started: number;
    ends: number;
}

export interface IUserSkill {
    hunting: string;
    racing: string;
    player_id: number;
}

export interface IMarketItem {
    ID: number;
    cost: number;
    quantity: number;
}

export interface IPointsMarket {
    id: string;
    cost: number;
    quantity: number;
    total_cost: number;
}

export interface IKeyValue {
    key: string;
    value: string;
}

export interface ILog {
    id: string;
    log: number;
    title: string;
    timestamp: number;
    data: Record<string, number | string>;
}

export interface ICard {
    id: string;
    name: string;
    value: number;
    short: number;
    color: string;
    suit: string;
}

export interface IFactionPosition {
    title: string;
    default: number;
    canUseMedicalItem: number;
    canUseBoosterItem: number;
    canUseDrugItem: number;
    canUseEnergyRefill: number;
    canLoanTemporaryItem: number;
    canLoanWeaponAndArmory: number;
    canRetrieveLoanedArmory: number;
    canPlanAndInitiateOrganisedCrime: number;
    canAccessFactionApi: number;
    canGiveItem: number;
    canGiveMoney: number;
    canGivePoints: number;
    canManageForum: number;
    canManageApplications: number;
    canKickMembers: number;
    canAdjustMemberBalance: number;
    canManageWars: number;
    canManageUpgrades: number;
    canSendNewsletter: number;
    canChangeAnnouncement: number;
    canChangeDescription: number;
}

export interface IPokerTable {
    id: string;
    name: string;
    big_blind: number;
    small_blind: number;
    speed: number;
    current_players: number;
    maximum_players: number;
}
