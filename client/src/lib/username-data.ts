// Username Generator - Large Dataset (2000+ words)

export const adjectives = [
  // Gaming & Edgy
  "Shadow", "Dark", "Neon", "Cyber", "Electric", "Blazing", "Inferno", "Cosmic", "Mystic", "Phantom", "Spectral", "Ethereal", "Obscure", "Sinister", "Menacing", "Ominous", "Eerie", "Ghostly", "Supernatural", "Otherworldly",
  "Swift", "Rapid", "Lightning", "Thunder", "Blaze", "Wildfire", "Infernal", "Hellish", "Demonic", "Devilish", "Sinful", "Wicked", "Evil", "Corrupt", "Cursed", "Doomed", "Forsaken", "Accursed", "Damned", "Unholy",
  "Neo", "Ultra", "Hyper", "Super", "Mega", "Giga", "Tera", "Meta", "Quantum", "Digital", "Binary", "Pixel", "Byte", "Data", "Code", "Cipher", "Matrix", "Nexus", "Void", "Abyss",
  "Crimson", "Scarlet", "Vermillion", "Ruby", "Garnet", "Wine", "Burgundy", "Maroon", "Carmine", "Blood", "Fire", "Flame", "Blaze", "Ember", "Lava", "Magma", "Volcano", "Inferno", "Bonfire", "Wildfire",
  "Azure", "Sapphire", "Cerulean", "Navy", "Cobalt", "Indigo", "Midnight", "Ocean", "Deep", "Arctic", "Icy", "Frost", "Glacial", "Frozen", "Crystalline", "Glacier", "Tundra", "Winter", "Blizzard", "Snowstorm",
  "Emerald", "Forest", "Jade", "Mint", "Lime", "Olive", "Sage", "Verdant", "Flourishing", "Lush", "Vibrant", "Vivid", "Radiant", "Glowing", "Shimmering", "Luminous", "Brilliant", "Dazzling", "Sparkling", "Shining",
  "Golden", "Silver", "Bronze", "Copper", "Platinum", "Chrome", "Steel", "Iron", "Titanium", "Aluminum", "Metal", "Metallic", "Shiny", "Lustrous", "Glimmering", "Reflective", "Mirrored", "Polished", "Gleaming", "Radiant",
  "Mystical", "Magical", "Enchanted", "Spellbound", "Bewitched", "Cursed", "Hexed", "Warded", "Protected", "Blessed", "Holy", "Sacred", "Divine", "Celestial", "Heavenly", "Angelic", "Seraphic", "Godly", "Immortal", "Eternal",
  "Epic", "Legendary", "Heroic", "Valiant", "Brave", "Courageous", "Fearless", "Intrepid", "Daring", "Bold", "Audacious", "Reckless", "Foolhardy", "Venturesome", "Adventurous", "Exploring", "Wandering", "Roaming", "Nomadic", "Wanderer",
  "Ancient", "Primordial", "Prehistoric", "Archaic", "Antique", "Vintage", "Classic", "Timeless", "Eternal", "Immortal", "Ageless", "Undying", "Everlasting", "Perpetual", "Infinite", "Endless", "Boundless", "Limitless", "Immeasurable", "Incalculable",
  "Silent", "Quiet", "Still", "Serene", "Peaceful", "Calm", "Tranquil", "Placid", "Zen", "Meditative", "Contemplative", "Pensive", "Thoughtful", "Reflective", "Introspective", "Philosophical", "Wise", "Sagacious", "Prudent", "Discreet",
  "Savage", "Feral", "Wild", "Untamed", "Untamable", "Uncontrolled", "Unruly", "Rebellious", "Anarchic", "Chaotic", "Turbulent", "Tempestuous", "Volatile", "Unstable", "Precarious", "Dangerous", "Perilous", "Hazardous", "Risky", "Treacherous",
  "Primal", "Primitive", "Instinctual", "Raw", "Crude", "Rough", "Coarse", "Rugged", "Weathered", "Worn", "Tattered", "Ragged", "Shabby", "Dilapidated", "Crumbling", "Decaying", "Rotting", "Putrid", "Fetid", "Noxious",
  "Stellar", "Star", "Cosmic", "Universal", "Galactic", "Interstellar", "Celestial", "Heavenly", "Ethereal", "Transcendent", "Sublime", "Exquisite", "Magnificent", "Glorious", "Splendid", "Grand", "Majestic", "Regal", "Royal", "Imperial",
  "Quantum", "Subatomic", "Atomic", "Nuclear", "Radioactive", "Explosive", "Volatile", "Reactive", "Unstable", "Chaotic", "Energetic", "Dynamic", "Active", "Kinetic", "Mobile", "Flowing", "Streaming", "Rushing", "Surging", "Raging",
  // Professional & Cool
  "Prime", "Apex", "Peak", "Summit", "Zenith", "Pinnacle", "Acme", "Culmination", "Perfection", "Ideal", "Optimal", "Superior", "Excellent", "Outstanding", "Exceptional", "Remarkable", "Extraordinary", "Phenomenal", "Marvelous", "Wonderful",
  "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon",
  "Pixel", "Vector", "Matrix", "Algorithm", "Protocol", "Command", "System", "Server", "Network", "Router", "Firewall", "Antivirus", "Software", "Hardware", "Firmware", "Cache", "Buffer", "Memory", "Storage", "Database",
  "Pure", "Clean", "Clear", "Bright", "Luminous", "Illuminated", "Lit", "Glowing", "Radiant", "Dazzling", "Brilliant", "Sparkling", "Twinkling", "Gleaming", "Shimmering", "Reflective", "Reflector", "Mirror", "Crystal", "Diamond",
  "True", "Honest", "Genuine", "Authentic", "Real", "Actual", "Factual", "Truthful", "Veracious", "Sincere", "Earnest", "Wholehearted", "Passionate", "Fervent", "Zealous", "Avid", "Keen", "Enthusiastic", "Eager", "Excited",
  "Chaos", "Disorder", "Confusion", "Pandemonium", "Anarchy", "Mayhem", "Bedlam", "Turmoil", "Strife", "Conflict", "Combat", "Battle", "War", "Warfare", "Siege", "Attack", "Assault", "Onslaught", "Barrage", "Bombardment",
  "Zen", "Harmony", "Balance", "Equilibrium", "Symmetry", "Proportion", "Order", "Organization", "Structure", "Framework", "Foundation", "Base", "Basis", "Core", "Center", "Heart", "Soul", "Spirit", "Essence", "Nature",
  "Noble", "Aristocratic", "Dignified", "Respectable", "Honorable", "Virtuous", "Righteous", "Just", "Fair", "Impartial", "Objective", "Neutral", "Unbiased", "Objective", "Scientific", "Rational", "Logical", "Analytical", "Critical", "Skeptical",
  "Rogue", "Renegade", "Rebel", "Outlaw", "Bandit", "Pirate", "Criminal", "Fugitive", "Escapist", "Deserter", "Defector", "Traitor", "Betrayer", "Deceiver", "Manipulator", "Schemer", "Conspirator", "Plotter", "Mastermind", "Genius",
  "Vicious", "Malicious", "Malevolent", "Evil", "Wicked", "Sinister", "Diabolical", "Nefarious", "Dastardly", "Treacherous", "Backstabbing", "Deceptive", "Cunning", "Crafty", "Clever", "Shrewd", "Astute", "Perceptive", "Intuitive", "Insightful",
  // More variety
  "Void", "Null", "Zero", "Omega", "End", "Final", "Ultimate", "Absolute", "Total", "Complete", "Whole", "Entire", "Full", "Comprehensive", "Thorough", "Exhaustive", "Meticulous", "Precise", "Exact", "Accurate",
  "Phoenix", "Dragon", "Griffin", "Chimera", "Sphinx", "Minotaur", "Hydra", "Cerberus", "Pegasus", "Unicorn", "Wyvern", "Basilisk", "Gargoyle", "Golem", "Elemental", "Spirit", "Ghost", "Specter", "Wraith", "Shade",
  "Thunder", "Lightning", "Storm", "Tempest", "Cyclone", "Tornado", "Whirlwind", "Gale", "Squall", "Monsoon", "Deluge", "Flood", "Tsunami", "Tidal", "Wave", "Ripple", "Undulation", "Vibration", "Oscillation", "Frequency",
  "Crown", "Throne", "Scepter", "Tiara", "Diadem", "Coronet", "Crown", "Regalia", "Insignia", "Badge", "Crest", "Seal", "Emblem", "Symbol", "Icon", "Logo", "Trademark", "Brand", "Name", "Title",
  "Shadow", "Shade", "Eclipse", "Darkness", "Night", "Nightfall", "Dusk", "Twilight", "Gloaming", "Dawn", "Sunrise", "Sunset", "Morning", "Evening", "Noon", "Midday", "Midnight", "Witching", "Bewitched", "Ensorcelled"
];

export const nouns = [
  // Gaming
  "Tiger", "Wolf", "Lion", "Bear", "Eagle", "Falcon", "Hawk", "Raven", "Dragon", "Phoenix", "Basilisk", "Wyvern", "Chimera", "Griffin", "Pegasus", "Unicorn", "Minotaur", "Centaur", "Satyr", "Gargoyle",
  "Warrior", "Knight", "Paladin", "Ranger", "Rogue", "Assassin", "Ninja", "Samurai", "Gladiator", "Mercenary", "Soldier", "General", "Commander", "Captain", "Admiral", "Fleet", "Squadron", "Regiment", "Battalion", "Legion",
  "Wizard", "Mage", "Sorcerer", "Warlock", "Enchanter", "Alchemist", "Conjurer", "Illusionist", "Mystic", "Oracle", "Prophet", "Sage", "Scholar", "Monk", "Priest", "Cleric", "Bishop", "Cardinal", "Pope", "Saint",
  "Hunter", "Tracker", "Scout", "Spy", "Assassin", "Killer", "Slayer", "Reaper", "Executioner", "Beheader", "Ripper", "Butcher", "Surgeon", "Doctor", "Medic", "Healer", "Physician", "Therapist", "Counselor", "Mentor",
  "Hero", "Champion", "Victor", "Winner", "Conqueror", "Survivor", "Veteran", "Survivor", "Escapist", "Fugitive", "Outlaw", "Renegade", "Rebel", "Revolutionary", "Anarchist", "Extremist", "Terrorist", "Criminal", "Gangster", "Mobster",
  "Beast", "Monster", "Creature", "Fiend", "Demon", "Devil", "Hellspawn", "Daemon", "Entity", "Being", "Existence", "Presence", "Manifestation", "Apparition", "Phantom", "Specter", "Wraith", "Ghost", "Shade", "Shadow",
  "Vortex", "Nexus", "Matrix", "Network", "System", "Framework", "Structure", "Foundation", "Base", "Core", "Center", "Heart", "Soul", "Spirit", "Essence", "Nature", "Being", "Entity", "Existence", "Reality",
  "Titan", "Giant", "Colossus", "Behemoth", "Leviathan", "Goliath", "Atlas", "Heracles", "Hercules", "Samson", "Achilles", "Hector", "Ulysses", "Odysseus", "Jason", "Perseus", "Theseus", "Orion", "Prometheus", "Sisyphus",
  "Slayer", "Killer", "Reaper", "Destroyer", "Annihilator", "Obliterator", "Eliminator", "Exterminator", "Executioner", "Assassin", "Murderer", "Killer", "Butcher", "Surgeon", "Dissector", "Carver", "Sculptor", "Artist", "Craftsman", "Artisan",
  "Force", "Power", "Might", "Strength", "Vigor", "Energy", "Vitality", "Potency", "Efficacy", "Effectiveness", "Capability", "Ability", "Competence", "Proficiency", "Expertise", "Mastery", "Dominance", "Supremacy", "Authority", "Control",
  // Cool/Fun
  "Ninja", "Pirate", "Outlaw", "Bandit", "Thief", "Robber", "Burglar", "Pickpocket", "Cutpurse", "Highwayman", "Brigand", "Buccaneer", "Corsair", "Privateer", "Freebooter", "Raider", "Looter", "Plunderer", "Marauder", "Ravager",
  "King", "Queen", "Prince", "Princess", "Duke", "Duchess", "Earl", "Countess", "Baron", "Baroness", "Lord", "Lady", "Sir", "Dame", "Squire", "Page", "Vassal", "Serf", "Peasant", "Commoner",
  "Master", "Ace", "Pro", "Expert", "Specialist", "Virtuoso", "Prodigy", "Genius", "Savant", "Scholar", "Sage", "Oracle", "Prophet", "Seer", "Visionary", "Mystic", "Spiritual", "Enlightened", "Awakened", "Ascended",
  "Phantom", "Specter", "Ghost", "Spirit", "Wraith", "Shade", "Shadow", "Apparition", "Manifestation", "Presence", "Entity", "Being", "Essence", "Soul", "Consciousness", "Mind", "Intellect", "Psyche", "Aura", "Emanation",
  "Pulse", "Beat", "Rhythm", "Tempo", "Cadence", "Pace", "Flow", "Current", "Stream", "River", "Torrent", "Flood", "Deluge", "Downpour", "Cascade", "Waterfall", "Cataract", "Rapids", "Whitewater", "Surge",
  "Storm", "Tempest", "Cyclone", "Tornado", "Whirlwind", "Gale", "Squall", "Monsoon", "Hurricane", "Typhoon", "Blizzard", "Snowstorm", "Sandstorm", "Dustdevil", "Waterspout", "Firestorm", "Maelstrom", "Chaos", "Pandemonium", "Bedlam",
  "Cipher", "Code", "Secret", "Mystery", "Enigma", "Riddle", "Puzzle", "Labyrinth", "Maze", "Trap", "Snare", "Net", "Web", "Spider", "Scorpion", "Venom", "Poison", "Toxin", "Plague", "Blight",
  "Ace", "Aces", "Card", "Deck", "Hand", "Deal", "Gamble", "Bet", "Stake", "Wager", "Chance", "Fortune", "Luck", "Destiny", "Fate", "Providence", "Divine", "Intervention", "Miracle", "Marvel",
  "Legend", "Myth", "Folklore", "Tale", "Story", "Epic", "Saga", "Adventure", "Quest", "Journey", "Voyage", "Expedition", "Exploration", "Discovery", "Revelation", "Epiphany", "Enlightenment", "Awakening", "Transformation", "Metamorphosis",
  // More variety
  "Blade", "Sword", "Saber", "Rapier", "Cutlass", "Scimitar", "Claymore", "Broadsword", "Longsword", "Shortsword", "Dagger", "Knife", "Stiletto", "Dirk", "Poniard", "Axe", "Hatchet", "Tomahawk", "Battle-Axe", "Great-Axe",
  "Arrow", "Bow", "Crossbow", "Gun", "Pistol", "Rifle", "Musket", "Cannon", "Catapult", "Ballista", "Trebuchet", "Bombard", "Mortar", "Grenade", "Explosive", "Dynamite", "Nitro", "Glycerin", "Detonator", "Fuse",
  "Castle", "Fort", "Fortress", "Stronghold", "Keep", "Tower", "Wall", "Rampart", "Bastion", "Citadel", "Palace", "Mansion", "Estate", "Hall", "Temple", "Shrine", "Cathedral", "Basilica", "Abbey", "Monastery",
  "Oracle", "Seer", "Prophet", "Visionary", "Mystic", "Spiritual", "Enlightened", "Sage", "Scholar", "Philosopher", "Thinker", "Intellectual", "Genius", "Prodigy", "Savant", "Expert", "Master", "Grandmaster", "Archmaster", "Supreme",
  "Compass", "Navigator", "Guide", "Scout", "Pathfinder", "Wayfarer", "Wanderer", "Traveler", "Explorer", "Adventurer", "Pilgrim", "Nomad", "Vagrant", "Drifter", "Vagabond", "Hobo", "Tramp", "Beggar", "Pauper", "Mendicant",
  "Essence", "Spirit", "Soul", "Consciousness", "Mind", "Intellect", "Psyche", "Aura", "Emanation", "Radiation", "Vibration", "Frequency", "Wavelength", "Signal", "Message", "Communication", "Information", "Data", "Bits", "Bytes"
];

export const verbs = [
  "Strike", "Hit", "Punch", "Kick", "Slash", "Stab", "Pierce", "Cut", "Slice", "Chop", "Hack", "Cleave", "Sever", "Decapitate", "Behead", "Dismember", "Crush", "Pulverize", "Shatter", "Break",
  "Dash", "Dash", "Sprint", "Bolt", "Fly", "Soar", "Zoom", "Rocket", "Launch", "Catapult", "Propel", "Hurl", "Fling", "Throw", "Toss", "Cast", "Project", "Eject", "Expel", "Burst",
  "Blaze", "Burn", "Ignite", "Incinerate", "Combust", "Singe", "Scorch", "Char", "Blacken", "Darken", "Obscure", "Cloud", "Veil", "Mask", "Hide", "Conceal", "Bury", "Entomb", "Seal", "Lock",
  "Roar", "Growl", "Snarl", "Howl", "Yell", "Scream", "Shriek", "Wail", "Moan", "Groan", "Gasp", "Pant", "Breathe", "Respire", "Inhale", "Exhale", "Snort", "Sniff", "Smell", "Scent",
  "Crush", "Smash", "Demolish", "Destroy", "Ruin", "Wreck", "Annihilate", "Obliterate", "Decimate", "Devastate", "Ravage", "Plunder", "Pillage", "Ransack", "Loot", "Rob", "Steal", "Thieve", "Pilfer", "Purloin",
  "Dance", "Leap", "Jump", "Bound", "Bounce", "Hop", "Skip", "Prance", "Cavort", "Gambol", "Frolic", "Play", "Sport", "Amuse", "Entertain", "Perform", "Act", "Dramatize", "Pantomime", "Mime",
  "Sing", "Chant", "Hum", "Whistle", "Trill", "Warble", "Carol", "Croon", "Intone", "Vocalize", "Utter", "Speak", "Talk", "Converse", "Discuss", "Debate", "Argue", "Quarrel", "Dispute", "Contend",
  "Fly", "Glide", "Swoop", "Dive", "Plunge", "Descend", "Ascend", "Rise", "Climb", "Scale", "Mount", "Reach", "Attain", "Achieve", "Accomplish", "Complete", "Finish", "End", "Conclude", "Terminate",
  "Soar", "Hover", "Float", "Drift", "Drift", "Sail", "Navigate", "Steer", "Guide", "Direct", "Lead", "Follow", "Pursue", "Chase", "Hunt", "Track", "Trace", "Tail", "Shadow", "Stalk",
  "Conquer", "Vanquish", "Defeat", "Win", "Triumph", "Prevail", "Succeed", "Prosper", "Thrive", "Flourish", "Bloom", "Blossom", "Flower", "Grow", "Develop", "Evolve", "Progress", "Advance", "Move", "Proceed"
];

export const prefixes = [
  "Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Sir", "Lord", "Lady", "Master", "Captain", "Agent", "General", "Colonel", "Major", "Lieutenant", "Sergeant", "Officer", "Inspector", "Commander",
  "Ultra", "Super", "Mega", "Giga", "Tera", "Meta", "Quantum", "Hyper", "Over", "Sub", "Under", "Micro", "Nano", "Pico", "Atto", "Anti", "Counter", "Cross", "Multi", "Poly",
  "Cyber", "Digital", "Virtual", "Net", "Web", "Cloud", "Data", "Code", "Bit", "Byte", "Pixel", "Vector", "Matrix", "Grid", "Node", "Link", "Router", "Server", "Host", "Domain",
  "Neo", "Retro", "Pseudo", "Semi", "Demi", "Hemi", "Proto", "Quasi", "Mono", "Bi", "Tri", "Quad", "Penta", "Hexa", "Hepta", "Octa", "Nona", "Deca", "Centi", "Milli",
  "Fire", "Frost", "Storm", "Stone", "Shadow", "Light", "Dark", "Void", "Abyss", "Chaos", "Order", "Harmony", "Chaos", "Wild", "Feral", "Savage", "Primal", "Ancient", "Mystic", "Divine",
  "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Gray", "Silver", "Gold", "Copper", "Bronze", "Platinum", "Titanium", "Iron", "Steel", "Chrome",
  "Night", "Day", "Dawn", "Dusk", "Twilight", "Midnight", "Noon", "Morning", "Evening", "Sunset", "Sunrise", "Moonlight", "Starlight", "Sunlight", "Firelight", "Candlelight", "Torchlight", "Lamplight", "Spotlight", "Floodlight",
  "Grim", "Dark", "Bright", "Clear", "Murky", "Misty", "Foggy", "Cloudy", "Stormy", "Rainy", "Snowy", "Icy", "Frosty", "Cold", "Cool", "Warm", "Hot", "Blazing", "Scorching", "Burning",
  "Grand", "Majestic", "Regal", "Royal", "Imperial", "Magnificent", "Splendid", "Glorious", "Sublime", "Exquisite", "Elegant", "Refined", "Sophisticated", "Cultured", "Civilized", "Polite", "Courteous", "Gracious", "Dignified", "Respectable",
  "Wild", "Free", "Unbound", "Unleashed", "Unchained", "Unshackled", "Unfettered", "Unconstrained", "Unrestricted", "Unlimited", "Boundless", "Infinite", "Eternal", "Immortal", "Undying", "Everlasting", "Perpetual", "Forever", "Always", "Never"
];

export const suffixes = [
  "X", "Z", "Pro", "YT", "TV", "Live", "Gaming", "Plays", "Official", "Real", "True", "Genuine", "Authentic", "Prime", "Elite", "Ultimate", "Extreme", "Radical", "Awesome", "Amazing",
  "King", "Queen", "Lord", "Lady", "Master", "Champion", "Warrior", "Knight", "Hero", "Legend", "Ace", "Star", "Supreme", "Almighty", "Divine", "Sacred", "Holy", "Blessed", "Cursed", "Forsaken",
  "Force", "Power", "Might", "Strength", "Vigor", "Energy", "Fury", "Rage", "Wrath", "Vengeance", "Justice", "Truth", "Light", "Dark", "Shadow", "Ghost", "Spirit", "Soul", "Mind", "Heart",
  "Verse", "World", "Realm", "Kingdom", "Empire", "Domain", "Territory", "Land", "Country", "Nation", "State", "Province", "Region", "Zone", "Area", "Space", "Cosmos", "Universe", "Galaxy", "System",
  "Tech", "Core", "Gate", "Sync", "Bot", "Net", "Web", "Link", "Node", "Hub", "Portal", "Server", "System", "Virus", "Code", "Script", "Program", "Software", "Hardware", "Firmware",
  "Craft", "Smith", "Master", "Builder", "Creator", "Maker", "Worker", "Laborer", "Artisan", "Craftsman", "Tradesman", "Journeyman", "Apprentice", "Novice", "Initiate", "Initiate", "Acolyte", "Disciple", "Follower", "Servant",
  "Mind", "Brain", "Intellect", "Genius", "Oracle", "Prophet", "Seer", "Sage", "Scholar", "Philosopher", "Thinker", "Poet", "Bard", "Minstrel", "Troubadour", "Jester", "Clown", "Fool", "Simpleton", "Idiot",
  "Strike", "Blast", "Shot", "Hit", "Blow", "Punch", "Kick", "Slash", "Stab", "Pierce", "Thrust", "Volley", "Barrage", "Bombardment", "Assault", "Attack", "Offense", "Defense", "Guard", "Shield",
  "Glide", "Slide", "Skate", "Ski", "Sail", "Swim", "Dive", "Fly", "Soar", "Hover", "Float", "Drift", "Flow", "Stream", "Rush", "Surge", "Wave", "Tide", "Current", "Wind",
  "Vision", "Sight", "Eye", "Observer", "Watcher", "Looker", "Seer", "Viewer", "Spectator", "Audience", "Listener", "Hearer", "Reader", "Speaker", "Talker", "Voice", "Sound", "Echo", "Whisper", "Murmur"
];

export type UsernameCategory = "gaming" | "instagram" | "tiktok" | "discord" | "youtube" | "fantasy" | "professional";
export type UsernamePattern = "adjective-noun" | "adjective-noun-number" | "noun-verb" | "prefix-word" | "word-suffix" | "word-year";

export interface CategoryConfig {
  name: string;
  patterns: UsernamePattern[];
  separators: string[];
  lowercase: boolean;
  addNumbers: boolean;
  addYear: boolean;
}

export const categoryConfigs: Record<UsernameCategory, CategoryConfig> = {
  gaming: {
    name: "Gaming",
    patterns: ["adjective-noun", "adjective-noun-number", "noun-verb"],
    separators: [""],
    lowercase: false,
    addNumbers: true,
    addYear: false,
  },
  instagram: {
    name: "Instagram",
    patterns: ["adjective-noun", "word-suffix"],
    separators: [".", "_"],
    lowercase: true,
    addNumbers: false,
    addYear: false,
  },
  tiktok: {
    name: "TikTok",
    patterns: ["adjective-noun", "word-suffix"],
    separators: ["_"],
    lowercase: true,
    addNumbers: true,
    addYear: false,
  },
  discord: {
    name: "Discord",
    patterns: ["adjective-noun", "adjective-noun-number"],
    separators: [""],
    lowercase: false,
    addNumbers: true,
    addYear: false,
  },
  youtube: {
    name: "YouTube",
    patterns: ["prefix-word", "adjective-noun", "word-suffix"],
    separators: [""],
    lowercase: false,
    addNumbers: false,
    addYear: false,
  },
  fantasy: {
    name: "Fantasy",
    patterns: ["adjective-noun", "noun-verb", "word-suffix"],
    separators: [""],
    lowercase: false,
    addNumbers: false,
    addYear: false,
  },
  professional: {
    name: "Professional",
    patterns: ["adjective-noun", "word-suffix"],
    separators: [".", "-", "_"],
    lowercase: true,
    addNumbers: false,
    addYear: false,
  },
};
