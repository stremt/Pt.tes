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
  "Shadow", "Shade", "Eclipse", "Darkness", "Night", "Nightfall", "Dusk", "Twilight", "Gloaming", "Dawn", "Sunrise", "Sunset", "Morning", "Evening", "Noon", "Midday", "Midnight", "Witching", "Bewitched", "Ensorcelled",
  // Tech & Science
  "Quantum", "Superfluid", "Plasma", "Photon", "Electron", "Proton", "Neuron", "Synapse", "Algorithm", "Encryption", "Decryption", "Virus", "Malware", "Firewall", "Router", "Server", "Protocol", "API", "Cache", "Query",
  "Machine", "Robot", "Android", "Automaton", "Cyborg", "Synthetic", "Artificial", "Virtual", "Augmented", "Mixed", "Reality", "Dimension", "Universe", "Metaverse", "Simulation", "Construct", "Platform", "Interface", "Monitor", "Display",
  "Laser", "Plasma", "Particle", "Wave", "Radiation", "Frequency", "Signal", "Transmission", "Broadcast", "Stream", "Download", "Upload", "Render", "Compile", "Execute", "Debug", "Optimize", "Refactor", "Deploy", "Launch",
  // Music & Sound
  "Harmonic", "Melodic", "Rhythmic", "Synth", "Sonic", "Acoustic", "Electric", "Amplified", "Reverb", "Echo", "Chorus", "Harmony", "Chord", "Note", "Beat", "Tempo", "Bass", "Treble", "Frequency", "Oscillator",
  // Nature & Elements
  "Alpine", "Glacial", "Volcanic", "Seismic", "Tectonic", "Lunar", "Solar", "Stellar", "Meteorite", "Asteroid", "Comet", "Nova", "Nebula", "Constellation", "Aurora", "Borealis", "Eclipse", "Atmosphere", "Tsunami", "Avalanche",
  "Floral", "Botanical", "Organic", "Natural", "Terrestrial", "Aquatic", "Marine", "Oceanic", "Atmospheric", "Atmospheric", "Biome", "Ecosystem", "Habitat", "Sanctuary", "Oasis", "Sanctuary", "Wilderness", "Frontier", "Outback", "Tundra",
  // Colors & Visual
  "Monochrome", "Pastel", "Neon", "Fluorescent", "Iridescent", "Opalescent", "Pearlescent", "Metallic", "Matte", "Glossy", "Opaque", "Transparent", "Translucent", "Vivid", "Muted", "Saturated", "Desaturated", "Warm", "Cool", "Neutral",
  // Emotions & States
  "Blissful", "Ecstatic", "Euphoric", "Joyful", "Happy", "Content", "Satisfied", "Gratified", "Delighted", "Thrilled", "Excited", "Energized", "Invigorated", "Revitalized", "Refreshed", "Serene", "Peaceful", "Tranquil", "Calm", "Collected",
  "Angry", "Furious", "Enraged", "Livid", "Irate", "Wrathful", "Seething", "Fuming", "Bitter", "Resentful", "Hateful", "Vengeful", "Hostile", "Aggressive", "Combative", "Belligerent", "Pugnacious", "Quarrelsome", "Contentious", "Fractious",
  // Speed & Movement
  "Accelerated", "Decelerated", "Instantaneous", "Momentary", "Fleeting", "Ephemeral", "Transient", "Temporary", "Permanent", "Fixed", "Stationary", "Mobile", "Nomadic", "Migratory", "Peripatetic", "Roaming", "Wandering", "Traversing", "Navigating", "Exploring",
  // Size & Scale
  "Miniature", "Tiny", "Small", "Compact", "Petite", "Diminutive", "Infinitesimal", "Microscopic", "Enormous", "Gigantic", "Colossal", "Massive", "Immense", "Vast", "Infinite", "Boundless", "Expansive", "Sprawling", "Monumental", "Titanic",
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
  "Essence", "Spirit", "Soul", "Consciousness", "Mind", "Intellect", "Psyche", "Aura", "Emanation", "Radiation", "Vibration", "Frequency", "Wavelength", "Signal", "Message", "Communication", "Information", "Data", "Bits", "Bytes",
  // Additional Animals
  "Leopard", "Panther", "Cougar", "Jaguar", "Puma", "Cheetah", "Lynx", "Bobcat", "Fox", "Jackal", "Hyena", "Wild Dog", "Antelope", "Elk", "Moose", "Reindeer", "Zebra", "Giraffe", "Rhinoceros", "Hippopotamus",
  "Butterfly", "Dragonfly", "Beetle", "Hornet", "Wasp", "Bee", "Ant", "Spider", "Scorpion", "Centipede", "Millipede", "Worm", "Snake", "Lizard", "Turtle", "Crocodile", "Alligator", "Frog", "Toad", "Salamander",
  "Dolphin", "Whale", "Shark", "Stingray", "Octopus", "Squid", "Jellyfish", "Starfish", "Seahorse", "Crab", "Lobster", "Shrimp", "Clam", "Oyster", "Snail", "Angelfish", "Piranha", "Swordfish", "Tuna", "Salmon",
  "Parrot", "Peacock", "Owl", "Penguin", "Ostrich", "Emu", "Vulture", "Condor", "Hummingbird", "Sparrow", "Canary", "Crow", "Magpie", "Jay", "Woodpecker", "Flamingo", "Stork", "Crane", "Swan", "Goose",
  // Additional Roles & Professions
  "Architect", "Engineer", "Designer", "Developer", "Programmer", "Hacker", "Coder", "Cryptographer", "Mathematician", "Physicist", "Chemist", "Biologist", "Geologist", "Astronomer", "Botanist", "Zoologist", "Meteorologist", "Archaeologist", "Paleontologist", "Anthropologist",
  "Pilot", "Captain", "Sailor", "Navigator", "Fisherman", "Hunter", "Trapper", "Guide", "Scout", "Tracker", "Ranger", "Warden", "Marshal", "Sheriff", "Lawman", "Detective", "Inspector", "Investigator", "Interrogator", "Inquisitor",
  "Poet", "Author", "Writer", "Novelist", "Journalist", "Philosopher", "Theologian", "Historian", "Chronicler", "Scribe", "Copyist", "Proofreader", "Editor", "Publisher", "Printer", "Typist", "Secretary", "Stenographer", "Accountant", "Auditor",
  // Tech Terms
  "Algorithm", "Blockchain", "Database", "Server", "Router", "Gateway", "Firewall", "Proxy", "Node", "Link", "Cluster", "Cache", "Queue", "Stack", "Queue", "Array", "Hash", "Index", "Log", "Trace",
  "Interface", "Widget", "Component", "Module", "Plugin", "Extension", "Utility", "Function", "Method", "Procedure", "Process", "Thread", "Task", "Job", "Worker", "Service", "Daemon", "Agent", "Bot", "Crawler",
  // Elements & Nature
  "Mountain", "Valley", "Canyon", "Cavern", "Cave", "Cliff", "Ridge", "Peak", "Summit", "Plateau", "Plain", "Desert", "Forest", "Jungle", "Marsh", "Swamp", "Bog", "Fen", "Meadow", "Prairie",
  "Ocean", "Sea", "Lake", "River", "Stream", "Creek", "Brook", "Waterfall", "Geyser", "Spring", "Well", "Fountain", "Pond", "Pool", "Bay", "Gulf", "Strait", "Channel", "Inlet", "Fjord",
  "Volcano", "Crater", "Lava", "Magma", "Eruption", "Tremor", "Earthquake", "Tsunami", "Avalanche", "Mudslide", "Landslide", "Rockslide", "Sinkhole", "Crevasse", "Chasm", "Abyss", "Gorge", "Pass", "Gap", "Rift",
  "Cloud", "Mist", "Fog", "Haze", "Smog", "Dust", "Smoke", "Steam", "Vapor", "Gas", "Wind", "Breeze", "Gust", "Squall", "Downburst", "Tornado", "Twister", "Whirlwind", "Dust Devil", "Sandstorm",
  "Star", "Planet", "Moon", "Sun", "Comet", "Meteor", "Asteroid", "Meteorite", "Constellation", "Galaxy", "Nebula", "Pulsar", "Quasar", "Black Hole", "Wormhole", "Aurora", "Halo", "Ring", "Orbit", "Satellite",
  // Abstract Concepts
  "Destiny", "Fate", "Luck", "Chance", "Chaos", "Order", "Harmony", "Entropy", "Infinity", "Eternity", "Immortality", "Mortality", "Infinity", "Zero", "Void", "Nothing", "Something", "Everything", "Anything", "All",
  "Truth", "Lie", "Fiction", "Reality", "Dream", "Nightmare", "Vision", "Hallucination", "Mirage", "Illusion", "Delusion", "Fantasy", "Imagination", "Creativity", "Innovation", "Inspiration", "Intuition", "Instinct", "Impulse", "Reaction",
  "Light", "Darkness", "Shadow", "Reflection", "Refraction", "Prism", "Spectrum", "Rainbow", "Glare", "Glint", "Sparkle", "Shimmer", "Glow", "Radiance", "Luminescence", "Bioluminescence", "Phosphorescence", "Fluorescence", "Incandescence", "Iridescence",
  // Musical & Sound
  "Symphony", "Sonata", "Concerto", "Requiem", "Elegy", "Fugue", "Canon", "Prelude", "Nocturne", "Waltz", "Tango", "Salsa", "Jazz", "Blues", "Rock", "Metal", "Punk", "Folk", "Country", "Pop",
  "Melody", "Harmony", "Discord", "Chord", "Interval", "Scale", "Mode", "Key", "Tempo", "Rhythm", "Meter", "Beat", "Pulse", "Measure", "Note", "Tone", "Pitch", "Frequency", "Amplitude", "Timbre",
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
  "Conquer", "Vanquish", "Defeat", "Win", "Triumph", "Prevail", "Succeed", "Prosper", "Thrive", "Flourish", "Bloom", "Blossom", "Flower", "Grow", "Develop", "Evolve", "Progress", "Advance", "Move", "Proceed",
  // Additional Verbs
  "Accelerate", "Decelerate", "Brake", "Reverse", "Circulate", "Rotate", "Spin", "Twist", "Twirl", "Swirl", "Whirl", "Orbit", "Revolve", "Gyrate", "Oscillate", "Vibrate", "Undulate", "Pulsate", "Throb", "Beat",
  "Awaken", "Wake", "Rouse", "Stir", "Activate", "Energize", "Invigorate", "Stimulate", "Excite", "Thrill", "Delight", "Fascinate", "Captivate", "Enchant", "Mesmerize", "Hypnotize", "Bewitch", "Charm", "Seduce", "Tempt",
  "Illuminate", "Brighten", "Lighten", "Enlighten", "Illuminate", "Shine", "Glow", "Radiate", "Emit", "Reflect", "Refract", "Absorb", "Transmit", "Project", "Cast", "Beam", "Flash", "Flare", "Glint", "Sparkle",
  "Breathe", "Exhale", "Inhale", "Respire", "Wheeze", "Gasp", "Pant", "Hyperventilate", "Suffocate", "Asphyxiate", "Choke", "Cough", "Sneeze", "Sniffle", "Snore", "Snort", "Sniff", "Smell", "Scent", "Whiff",
  "Embrace", "Hug", "Hold", "Clasp", "Grasp", "Grip", "Clutch", "Seize", "Snatch", "Grab", "Catch", "Trap", "Capture", "Ensnare", "Entangle", "Tangle", "Knot", "Bind", "Tie", "Fasten",
  "Rise", "Lift", "Raise", "Hoist", "Elevate", "Ascend", "Mount", "Climb", "Scale", "Clamber", "Scramble", "Crawl", "Creep", "Steal", "Slink", "Sneak", "Prowl", "Stalk", "Track", "Hunt",
  "Sink", "Descend", "Lower", "Drop", "Fall", "Tumble", "Collapse", "Crumble", "Crumble", "Disintegrate", "Deteriorate", "Decay", "Decompose", "Rot", "Wither", "Shrivel", "Wilt", "Droop", "Sag", "Slump",
  "Create", "Build", "Construct", "Erect", "Establish", "Form", "Shape", "Mold", "Carve", "Sculpt", "Forge", "Craft", "Devise", "Invent", "Conceive", "Generate", "Produce", "Manufacture", "Assemble", "Compose",
  "Destroy", "Demolish", "Dismantle", "Disassemble", "Deconstruct", "Undo", "Unravel", "Untangle", "Disentangle", "Separate", "Divide", "Partition", "Fragment", "Sever", "Sever", "Dismember", "Mutilate", "Mangle", "Disfigure", "Deform",
  "Transform", "Transmute", "Transfigure", "Alter", "Change", "Modify", "Adapt", "Adjust", "Regulate", "Control", "Manage", "Govern", "Rule", "Reign", "Dominate", "Command", "Direct", "Lead", "Guide", "Steer",
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
  "Wild", "Free", "Unbound", "Unleashed", "Unchained", "Unshackled", "Unfettered", "Unconstrained", "Unrestricted", "Unlimited", "Boundless", "Infinite", "Eternal", "Immortal", "Undying", "Everlasting", "Perpetual", "Forever", "Always", "Never",
  // Additional Prefixes
  "Geo", "Hydro", "Pyro", "Aero", "Astro", "Cosmo", "Intro", "Extro", "Retro", "Hyper", "Hypo", "Super", "Infra", "Supra", "Trans", "Extra", "Intra", "Inter", "Auto", "Homo",
  "Hetero", "Poly", "Mono", "Oligo", "Proto", "Paleo", "Archaeo", "Bronto", "Mega", "Giga", "Tera", "Peta", "Ata", "Zepto", "Yocto", "Exa", "Zetta", "Yotta", "Deci", "Hecto",
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
  "Vision", "Sight", "Eye", "Observer", "Watcher", "Looker", "Seer", "Viewer", "Spectator", "Audience", "Listener", "Hearer", "Reader", "Speaker", "Talker", "Voice", "Sound", "Echo", "Whisper", "Murmur",
  // Additional Suffixes
  "Maker", "Taker", "Breaker", "Shaker", "Player", "Layer", "Slayer", "Sayer", "Payer", "Flayer", "Grader", "Trader", "Raider", "Leader", "Reader", "Healer", "Dealer", "Welder", "Wielder", "Wilder",
  "Hunter", "Gatherer", "Keeper", "Sleeper", "Seeker", "Speaker", "Streaker", "Breaker", "Maker", "Taker", "Banker", "Tanker", "Ranker", "Thanker", "Spanker", "Flanker", "Planker", "Clanker", "Blanker", "Cranker",
  "Sphere", "State", "Trait", "Fate", "Gate", "Crate", "Plate", "Slate", "Grate", "Mate", "Rate", "Date", "Late", "Bait", "Wait", "Strait", "Weight", "Height", "Sight", "Flight",
  "Ship", "Skip", "Trip", "Strip", "Drip", "Grip", "Flip", "Slip", "Clip", "Whip", "Chip", "Blip", "Snip", "Zip", "Rip", "Sip", "Dip", "Hip", "Lip", "Tip",
  "Craft", "Draft", "Raft", "Shaft", "Waft", "Theft", "Deft", "Left", "Cleft", "Heft", "Daft", "Oft", "Loft", "Soft", "Aloft", "Shaft", "Tuft", "Rift", "Drift", "Swift",
];

// Style-specific word lists - GREATLY EXPANDED
export const aestheticWords = ["aura", "vibes", "dream", "luxe", "glow", "mist", "velvet", "moon", "soft", "bloom", "essence", "ethereal", "serene", "shimmer", "radiant", "luminous", "tranquil", "heavenly", "whisper", "cascade", "silk", "pearl", "crystal", "rose", "lavender", "twilight", "dazzle", "enchant", "mystique", "allure"];

export const fancyWords = ["prime", "elite", "nova", "legend", "royal", "apex", "zenith", "peak", "supreme", "divine", "majestic", "regal", "opulent", "prestigious", "exquisite", "refined", "elegant", "luxurious", "ornate", "magnificent"];

export const gamingWords = ["slayer", "hunter", "rogue", "phantom", "vortex", "ninja", "warrior", "assassin", "champion", "reaper", "predator", "beast", "titan", "dragon", "phoenix", "venom", "striker", "blaze", "shadow", "void"];

export const minimalWords = ["dev", "exe", "xyz", "io", "codes", "builds", "cli", "api", "web", "net", "core", "hub", "node", "link", "host", "sync", "tech", "grid", "sys", "app"];

export const cuteWords = ["bunny", "baby", "cute", "sweet", "angel", "star", "pixel", "mint", "honey", "cookie", "peach", "lemon", "cherry", "berry", "daisy", "butterfly", "panda", "puppy", "kitty", "teddy"];

export const darkWords = ["void", "shadow", "night", "dark", "abyss", "eclipse", "phantom", "ghost", "wraith", "midnight", "raven", "skull", "ruin", "decay", "silence", "dread", "terror", "doom", "curse", "obliterate"];

// Enhanced Gender-specific word lists
export const feminineAdjectives = ["Luna", "Aurora", "Star", "Iris", "Rose", "Sage", "Ivy", "Phoenix", "Mystic", "Grace", "Serene", "Soft", "Gentle", "Bright", "Sweet", "Dreamy", "Cosmic", "Celestial", "Divine", "Ethereal", "Radiant", "Luminous", "Elegant", "Delicate", "Graceful", "Pure", "Pristine", "Noble", "Regal", "Majestic"];

export const feminineNouns = ["Belle", "Luna", "Aurora", "Iris", "Rose", "Sage", "Ivy", "Lily", "Fawn", "Dove", "Swan", "Fairy", "Nymph", "Muse", "Siren", "Duchess", "Princess", "Queen", "Goddess", "Angel", "Enchantress", "Sorceress", "Witch", "Valkyrie", "Warrior", "Maiden", "Lady", "Empress", "Saint", "Sage"];

export const masculineAdjectives = ["Storm", "Blaze", "Iron", "Steel", "Dark", "Thunder", "Savage", "Fierce", "Bold", "Strong", "Mighty", "Shadow", "Apex", "Titan", "Inferno", "Cosmic", "Quantum", "Primal", "Rebel", "Rogue", "Wild", "Ruthless", "Relentless", "Dominant", "Powerful", "Resilient", "Formidable", "Valiant", "Dauntless", "Intrepid"];

export const masculineNouns = ["Storm", "Blaze", "Blade", "Wolf", "Tiger", "Warrior", "Knight", "King", "Duke", "Lord", "Rogue", "Pirate", "Ninja", "Samurai", "Titan", "Dragon", "Phoenix", "Hawk", "Eagle", "Beast", "Assassin", "Ranger", "Gunslinger", "Warlord", "Berserker", "Gladiator", "Conqueror", "Sentinel", "Paladin", "Templar"];

export const neutralAdjectives = ["Neon", "Pixel", "Cyber", "Digital", "Echo", "Void", "Quantum", "Matrix", "Vector", "Cosmic", "Stellar", "Ultra", "Meta", "Prime", "Apex", "Nova", "Zen", "Pure", "True", "Clear", "Flux", "Pulse", "Sync", "Drift", "Static", "Signal", "Sonic", "Flux", "Phase", "Shift"];

export const neutralNouns = ["Echo", "Pulse", "Vortex", "Nexus", "Code", "Signal", "Vision", "Mind", "Soul", "Spirit", "Force", "Power", "Entity", "Essence", "Nature", "Core", "Node", "Link", "System", "Network", "Flux", "Sync", "Node", "Hub", "Portal", "Gateway", "Cipher", "Algorithm", "Logic", "Frequency"];

export type UsernameCategory = "gaming" | "instagram" | "tiktok" | "discord" | "youtube" | "fantasy" | "professional";
export type UsernameStyle = "aesthetic" | "fancy" | "gaming" | "minimal" | "professional" | "cute" | "dark" | "random";
export type UsernameGender = "masculine" | "feminine" | "neutral";
export type UsernamePattern = "adjective-noun" | "adjective-noun-number" | "noun-verb" | "prefix-word" | "word-suffix" | "word-year" | "custom-word";

export interface CategoryConfig {
  name: string;
  patterns: UsernamePattern[];
  separators: string[];
  lowercase: boolean;
  addNumbers: boolean;
  addYear: boolean;
  customWords?: string[];
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

export const styleConfigs: Record<UsernameStyle, CategoryConfig> = {
  aesthetic: {
    name: "Aesthetic",
    patterns: ["custom-word", "adjective-noun"],
    separators: [".", "_"],
    lowercase: true,
    addNumbers: false,
    addYear: false,
    customWords: aestheticWords,
  },
  fancy: {
    name: "Fancy",
    patterns: ["custom-word"],
    separators: [""],
    lowercase: false,
    addNumbers: false,
    addYear: false,
    customWords: fancyWords,
  },
  gaming: {
    name: "Gaming",
    patterns: ["custom-word", "adjective-noun-number"],
    separators: [""],
    lowercase: false,
    addNumbers: true,
    addYear: false,
    customWords: gamingWords,
  },
  minimal: {
    name: "Minimal",
    patterns: ["custom-word"],
    separators: ["."],
    lowercase: true,
    addNumbers: false,
    addYear: false,
    customWords: minimalWords,
  },
  professional: {
    name: "Professional",
    patterns: ["custom-word", "adjective-noun"],
    separators: [".", "-"],
    lowercase: true,
    addNumbers: false,
    addYear: false,
    customWords: minimalWords,
  },
  cute: {
    name: "Cute",
    patterns: ["custom-word", "adjective-noun"],
    separators: [".", ""],
    lowercase: true,
    addNumbers: false,
    addYear: false,
    customWords: cuteWords,
  },
  dark: {
    name: "Dark",
    patterns: ["custom-word", "adjective-noun"],
    separators: ["_", ""],
    lowercase: true,
    addNumbers: false,
    addYear: false,
    customWords: darkWords,
  },
  random: {
    name: "Random",
    patterns: ["adjective-noun", "adjective-noun-number", "noun-verb", "prefix-word", "word-suffix"],
    separators: ["", "_", ".", "-"],
    lowercase: false,
    addNumbers: true,
    addYear: false,
  },
};
