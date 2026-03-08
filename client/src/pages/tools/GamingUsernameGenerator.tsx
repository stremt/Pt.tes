import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { RefreshCw, Copy, Zap, Lock, Sparkles, Gamepad2, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const gamingNouns = [
  "slayer", "hunter", "warrior", "knight", "rogue", "phantom", "ninja", "titan",
  "vortex", "shadow", "dragon", "demon", "beast", "sniper", "assassin", "striker",
  "reaper", "legend", "champion", "gladiator", "conqueror", "destroyer",
  "guardian", "ranger", "samurai", "paladin", "outlaw", "predator", "sentinel",
  "storm", "thunder", "blaze", "inferno", "cyclone", "venom", "fang", "claw",
  "blade", "dagger", "hammer", "fury", "wrath", "havoc", "chaos", "void",
  "nova", "eclipse", "nebula", "galaxy", "cosmos", "orbit", "meteor",
  "stormer", "crusher", "breaker", "striker", "raider", "marauder",
  "warden", "soldier", "fighter", "gunner", "tracker", "stalker",
  "viper", "cobra", "scorpion", "wolverine", "behemoth", "leviathan",
  "phoenix", "griffin", "basilisk", "wyvern", "harpy", "valkyrie",
  "specter", "wraith", "revenant", "ghoul", "lich", "shade",
  "saber", "axe", "mace", "spear", "pike", "halberd",
  "corsair", "privateer", "buccaneer", "brigand", "bandit", "rogue",
  "juggernaut", "colossus", "goliath", "behemoth", "minotaur", "cyclops",
  "vanguard", "sentinel", "sentinel", "guardian", "protector", "defender",
  "incinerator", "decimator", "obliterator", "annihilator", "exterminator",
  "excavator", "extractor", "executor", "exorcist", "arbiter", "enforcer",
  "piercer", "ripper", "render", "shredder", "masher", "smasher",
  "echo", "resonance", "frequency", "vibration", "pulse", "beat",
  "apex", "peak", "zenith", "pinnacle", "acme", "summit",
  "primal", "savage", "feral", "wild", "untamed", "rogue",
  "mystic", "mage", "sorcerer", "wizard", "enchanter", "warlock",
  "oracle", "seer", "prophet", "visionary", "sage", "druid",
  "monk", "cleric", "priest", "bishop", "cardinal", "pope",
  "paladin", "templar", "crusader", "inquisitor", "holy", "divine",
  "heretic", "apostate", "schism", "renegade", "dissenter", "rebel",
  "rebel", "anarchist", "extremist", "radical", "revolutionary", "insurgent",
  "assassin", "murderer", "killer", "slaughterer", "butcher", "executioner",
  "swordmaster", "blademan", "swordsman", "fencer", "duelist", "swashbuckler",
  "archer", "bowman", "crossbowman", "marksman", "sniper", "gunner",
  "cannoneer", "artilleryman", "bombardier", "demolitionist", "pyrotechnic", "blaster",
  "medic", "healer", "shaman", "witch", "doctor", "apothecary",
  "alchemist", "chemist", "scientist", "scholar", "intellectual", "genius",
  "diplomat", "ambassador", "envoy", "emissary", "messenger", "herald",
  "bard", "minstrel", "troubadour", "poet", "rhymer", "lyricist",
  "dancer", "acrobat", "performer", "entertainer", "showman", "maestro",
  "craftsman", "artisan", "smith", "tinker", "mechanic", "engineer",
  "architect", "designer", "builder", "creator", "maker", "inventor",
  "alchemist", "transmuter", "converter", "transformer", "shifter", "changer",
  "summoner", "conjurer", "invoker", "evocator", "caller", "bringer",
  "enchanter", "charmer", "seducer", "beguiler", "temptress", "siren",
  "berserker", "maniac", "lunatic", "madman", "wildfire", "inferno",
  "necromancer", "death", "reaper", "plague", "pestilence", "malady",
  "lich", "undead", "zombie", "ghoul", "mummy", "skeleton",
  "demon", "devil", "fiend", "creature", "monster", "thing",
  "angel", "saint", "cherub", "seraphim", "archangel", "divine",
  "vampire", "werewolf", "shapeshifter", "changeling", "skinwalker", "beast",
  "golem", "construct", "automaton", "machine", "robot", "cyborg",
  "elemental", "spirit", "phantom", "poltergeist", "specter", "apparition",
  "kraken", "leviathan", "serpent", "wyrm", "worm", "slug",
  "cyclops", "giant", "ogre", "troll", "goblin", "orc",
  "elf", "fairy", "sprite", "pixie", "nymph", "dryad",
  "centaur", "satyr", "faun", "siren", "mermaid", "triton",
  "sphinx", "hydra", "pegasus", "unicorn", "chimera", "manticore",
  "valkyrie", "banshee", "siren", "harpy", "lamia", "medusa"
];
const gamingAdjectives = [
"dark","shadow","neon","toxic","ultra","storm","void","iron","silent","savage",
"wild","icy","frozen","bloody","crimson","ghost","phantom","cosmic","galactic","nuclear",
"atomic","cyber","digital","quantum","hyper","rapid","turbo","mega","giga","tera",
"solar","lunar","stellar","astral","orbital","celestial","infinite","eternal","immortal","legendary",
"epic","mystic","arcane","enchanted","ancient","prime","alpha","omega","supreme","royal",
"noble","heroic","valiant","fearless","brutal","ruthless","merciless","relentless","dominant","unstoppable",
"invincible","indestructible","tactical","strategic","precision","deadly","lethal","fatal","venomous","poisonous",
"electric","charged","shocking","radiant","blazing","burning","fiery","smoldering","flaming","infernal",
"glacial","arctic","polar","chilling","frosted","stormy","thunderous","lightning","tempest","hurricane",
"cyclonic","torrential","tidal","tsunami","earthshaking","volcanic","molten","lava","obsidian","granite",
"steel","titanium","adamant","armored","shielded","fortified","reinforced","battle","war","combat",
"assault","strike","sniper","stealth","covert","hidden","masked","cloaked","secret","shadowy",
"phantasmal","spectral","haunted","cursed","ominous","grim","dread","terrifying","fearsome","monstrous",
"beastly","feral","predatory","hunter","stalker","prowling","roaring","howling","raging","berserk",
"bloodthirsty","vengeful","revenant","undying","eternalx","limitless","boundless","supersonic","hypersonic","rapidfire",
"overdrive","overclocked","supercharged","boosted","amped","chargedx","energized","vibrant","glowing","shimmering",
"radiating","sparkling","dazzling","blinding","brilliant","luminous","shiny","polished","refined","elite",
"premium","ultimate","maximum","primeval","timeless","classic","retro","modern","futuristic","advanced",
"evolved","mutant","cyborg","mechanized","robotic","synthetic","augmented","enhanced","optimized","calibrated",
"balanced","focused","disciplined","determined","unyielding","steadfast","unyieldingx","unyielded","resolute","driven",
"motivated","fearlessx","undaunted","heroicx","legendx","epicx","mythic","godlike","divine","sacred",
"blessed","hallowed","celestialx","cosmicx","astralx","nebula","stardust","starborn","moonlit","sunforged",
"skyborn","windborne","stormforged","earthbound","voidforged","shadowforged","bloodforged","ironforged","warforged","battleborn",
"dragonborn","wolfborn","lionhearted","tigerblood","pantherlike","falconwing","eagleeye","hawkish","viperous","cobrafang",
"serpentine","venomfang","ironfang","steelclaw","razorclaw","talonsharp","fangsharp","bladeedge","razored","cutting",
"piercing","striking","smashing","crushing","obliterating","devastating","annihilating","dominating","overpowering","overwhelming",
"supremex","grand","magnificent","glorious","radiantx","majestic","sovereign","imperial","regal","commanding",
"authoritative","formidable","towering","colossal","gigantic","massive","mighty","powerful","potent","forceful",
"dynamic","agile","swift","nimble","fleet","speedy","rapid","lightningfast","blitzing","rushing",
"dashing","charging","surging","leaping","soaring","flying","gliding","hovering","floating","drifting",
"wandering","roaming","exploring","seeking","tracking","targeting","locking","aiming","firing","bursting",
"shattering","splitting","ripping","tearing","slashing","cuttingx","breaking","wrecking","ruining","demolishing",
"obliterated","conquering","victorious","triumphant","dominantx","supremacy","unstoppablx","fearlessforce","ironwill","stormforce",
"shadowforce","voidforce","nightforce","dragonforce","wolfforce","titanforce","battleforce","warforce","eliteforce","strikeforce",
"phantomforce","ghostforce","specterforce","stealthforce","sniperforce","hunterforce","predatorforce","raiderforce","rangerforce","guardianforce",
"wardenforce","sentinelforce","defenderforce","protectorforce","keeperforce","watcherforce","observerforce","trackerforce","scoutforce","navigatorforce",
"pathfinder","trailblazer","pioneer","innovator","creator","builder","architect","engineer","designer","forger",
"smith","crafter","shaper","molder","founder","leader","captain","chief","commander","general",
"marshal","warden","overseer","master","grandmaster","archmaster","suprememaster","shadowmaster","voidmaster","stormmaster",
"dragonmaster","wolfmaster","titanmaster","battlemaster","warmaster","skillmaster","aimmaster","speedmaster","mindmaster","tacticmaster","abyssal","accelerated","accurate","adaptive","aggressive","airborne","alert","allseeing","ambush","amplified",
  "ancientx","angelic","annihilating","apex","armoredx","artful","assaultive","astounding","astronic","attuned",
  "augmentedx","avalanche","awakened","balancedx","barbaric","battlehardened","battlewise","beaming","berserkx","bladed",
  "bleeding","blessedx","blindingx","bloodbound","bloodcharged","bloodmarked","bloodsoaked","booming","boundlessx","brave",
  "breakneck","bright","brilliantx","brutalex","burningx","calculating","calm","carnage","cataclysmic","celestially",
  "chargedup","chaotic","charmed","chillingx","chromed","clean","clever","cloakedx","cloudborn","coiled",
  "coldblooded","colossalx","combative","commandingx","competitive","compressed","conqueringx","controlled","core","cosmicx",
  "crackling","crimsonx","critical","crowned","crushingx","cryptic","cybernetic","daring","deadeye","deadshot",
  "deadlyx","deathbound","deathforged","decisive","deep","defiant","deluxe","demonic","dense","destructive",
  "determinedx","devilish","dexterous","diamond","digitalx","disciplinedx","dominatingx","doomed","dragonforged","dreaming",
  "drivenx","dynamicx","earthborn","earthshaker","eclipsed","edge","electricx","elitex","embattled","emberforged",
  "energizedx","enraged","epicenter","equalized","eternalforce","evolvedx","exalted","explosive","extreme","fabled",
  "fast","fearsomex","ferocious","fierce","fieryx","final","flaring","flawless","focusedx","forbidden",
  "forcefulx","formless","fortifiedx","fractured","furious","galacticx","ghostly","gloriousx","golden","graceful",
  "grandx","gritty","grounded","guardianx","guided","hardcore","hardened","harmonic","harsh","heavenly",
  "heavy","hellbound","hellforged","heroicforce","hiddenx","highvoltage","honored","hostile","howlingx","hypercharged",
  "hypersonicx","icebound","icecold","icyx","illusive","illuminated","immense","immortalx","impact","imperialx",
  "imposing","incendiary","incredible","indomitable","infinitex","inspired","intense","ironbound","ironclad","ironforgedx",
  "jagged","jetfast","keen","kingslayer","knifelike","lacerating","legendaryx","lightborn","lightningx","limitbreaker",
  "limitlessx","lone","luminousx","lunarx","magnetic","majesticx","masterful","mechanizedx","mercilessx","metal",
  "midnight","mindful","mirrored","mobile","moltenx","monumental","mystical","mysticx","mythicx","narrow",
  "natural","nebular","nightbound","nightforged","nimblex","nobleforce","nova","nuclearx","observant","obsidianx",
  "ominousx","onslaught","optimal","overclockedx","overdrive","overpoweringx","overwhelmingx","phantomx","piercingx","plasma",
  "polarx","powercore","powerfulx","precisex","predatoryx","primeforce","primal","prime","pristine","prodigy",
  "quantumx","quick","radiantforce","radiatingx","rapidx","razor","razorfast","reactive","reckless","refinedx",
  "relentlessx","resolute","resonant","revenantx","rising","roaringx","robust","rogue","royalx","ruthlessx",
  "sacredx","savaged","scorching","scout","searing","secretive","serrated","shadowbound","shadowx","sharpsight",
  "shatteringx","shieldedx","shimmeringx","shockwave","shockingx","silentx","silver","sinister","skilled","skybornx",
  "slashingx","sleek","smolderingx","snapping","sniping","soaringx","solarx","solid","sonic","spectralx",
  "speedy","spiked","spirited","splitting","starbornx","stellarx","stormbound","stormcharged","stormx","strategicx",
  "strikingx","stunning","subzero","sudden","superchargedx","supremeforce","surgingx","survivor","swiftx","tacticalx",
  "tempestx","terrible","thunderborn","thunderx","timelessx","titanic","toweringx","toxicx","tracking","trailblazing",
  "transforming","tremor","true","turbocharged","ultimatex","unbreakable","unlimited","unmatched","unstoppablex","unyieldingforce",
  "vanguard","vapor","vengefulx","vicious","victoriousx","vigilant","violent","viperlike","viral","visionary",
  "voidbound","voidcharged","voidx","volcanicx","volatile","warbound","warforgedx","warx","watchful","wildx",
  "windborn","winged","winter","wired","wolfish","worldbreaker","wrathful","wrecking","zenith","zero",
  "zerogravity","zodiac","zone","alphaX","omegaX","primeX","ultraX","megaX","gigaX","teraX"
  ];

const maleWords = [
  "king", "lord", "titan", "warrior", "knight", "viking",
  "samurai", "hunter", "chief", "captain", "emperor",
  "warlord", "overlord", "conqueror", "general", "commander",
  "duke", "baron", "earl", "prince", "pharaoh", "sultan",
  "czar", "tsar", "rajah", "mogul", "magnate", "tyrant",
  "despot", "dictator", "autocrat", "patriarch", "elder", "sage","gladiator","berserker","raider","sniper","assassin","mercenary","soldier","trooper","sentinel","guardian",
  "champion","legend","hero","slayer","destroyer","crusher","reaper","executioner","predator","hunterx",
  "striker","fighter","brawler","duelist","swordsman","blademaster","axelord","hammerlord","ironknight","stormknight",
  "shadowwarrior","darkknight","voidknight","bloodknight","nightstalker","shadowhunter","stormhunter","beasthunter","dragonhunter","wolfhunter",
  "dragonslayer","demonslayer","beastslayer","titanslayer","giantslayer","stormslayer","voidslayer","shadowreaper","soulreaper","doomreaper",
  "ironfist","steelguard","stoneguard","stormguard","shadowguard","nightguard","voidguard","flameguard","dragonguard","wolfguard",
  "battlelord","stormlord","shadowlord","ironlord","warbringer","doombringer","stormbringer","voidbringer","deathbringer","skullbringer",
  "battleking","stormking","shadowking","voidking","ironking","wolfking","dragonking","beastking","nightking","warriorx",
  "ironwarrior","shadowwarriorx","stormwarrior","voidwarrior","bloodwarrior","nightwarrior","wolfwarrior","dragonwarrior","beastwarrior","skullwarrior",
  "stormrider","shadowrider","voidrider","nightrider","stormchaser","shadowchaser","voidchaser","nightchaser","wolfchaser","dragonchaser",
  "ironchampion","stormchampion","shadowchampion","voidchampion","nightchampion","wolfchampion","dragonchampion","battlechampion","skullchampion","doomchampion",
  "stormgeneral","shadowgeneral","voidgeneral","nightgeneral","ironcommander","stormcommander","shadowcommander","voidcommander","nightcommander","battlecommander",
  "stormcaptain","shadowcaptain","voidcaptain","nightcaptain","wolfcaptain","dragoncaptain","battlecaptain","doomcaptain","skullcaptain","ironcaptain",
  "stormchief","shadowchief","voidchief","nightchief","wolfchief","dragonchief","battlechief","doomchief","skullchief","ironchief",
  "stormbaron","shadowbaron","voidbaron","nightbaron","wolfbaron","dragonbaron","battlebaron","doombaron","skullbaron","ironbaron",
  "stormduke","shadowduke","voidduke","nightduke","wolfduke","dragonduke","battleduke","doomduke","skullduke","ironduke",
  "stormprince","shadowprince","voidprince","nightprince","wolfprince","dragonprince","battleprince","doomprince","skullprince","ironprince",
  "stormpharaoh","shadowpharaoh","voidpharaoh","nightpharaoh","wolfpharaoh","dragonpharaoh","battlepharaoh","doompharaoh","skullpharaoh","ironpharaoh",
  "stormsultan","shadowsultan","voidsultan","nightsultan","wolfsultan","dragonsultan","battlesultan","doomsultan","skullsultan","ironsultan",
  "stormrajah","shadowrajah","voidrajah","nightrajah","wolfrajah","dragonrajah","battlerajah","doomrajah","skullrajah","ironrajah",
  "stormtyrant","shadowtyrant","voidtyrant","nighttyrant","wolftyrant","dragontyrant","battletyrant","doomtyrant","skulltyrant","irontyrant",
  "stormdictator","shadowdictator","voiddictator","nightdictator","wolfdictator","dragondictator","battledictator","doomdictator","skulldictator","irondictator",
  "stormautocrat","shadowautocrat","voidautocrat","nightautocrat","wolfautocrat","dragonautocrat","battleautocrat","doomautocrat","skullautocrat","ironautocrat",
  "stormpatriarch","shadowpatriarch","voidpatriarch","nightpatriarch","wolfpatriarch","dragonpatriarch","battlepatriarch","doompatriarch","skullpatriarch","ironpatriarch",
  "stormelder","shadowelder","voidelder","nightelder","wolfelder","dragonelder","battleelder","doomelder","skullelder","ironelder",
  "stormsage","shadowsage","voidsage","nightsage","wolfsage","dragonsage","battlesage","doomsage","skullsage","ironsage",
  "stormlegend","shadowlegend","voidlegend","nightlegend","wolflegend","dragonlegend","battlelegend","doomlegend","skulllegend","ironlegend",
  "stormhero","shadowhero","voidhero","nighthero","wolfhero","dragonhero","battlehero","doomhero","skullhero","ironhero","slayer","doomslayer","nightslayer","voidslayerx","stormslayer","beastslayerx","wolfslayer","dragonslayerx","skullslayer","bloodslayer",
  "rageknight","voidknightx","stormknightx","ironknightx","shadowknightx","nightblade","voidblade","stormblade","ironblade","shadowblade",
  "blademasterx","swordmaster","axemaster","hammermaster","bladeking","swordking","axeking","hammerking","steelking","warblade",
  "battleblade","stormbladeX","shadowbladeX","voidbladeX","nightbladeX","ironbladeX","wolfblade","dragonblade","beastblade","skullblade",
  "ironfury","stormfury","shadowfury","voidfury","nightfury","dragonfury","wolfury","beastfury","battlefury","doomfury",
  "ironrage","stormrage","shadowrage","voidrage","nightrage","dragonrage","wolfrage","beastrage","battlerage","doomrage",
  "ironstorm","shadowstorm","voidstorm","nightstorm","dragonstorm","wolfstorm","beaststorm","battlestorm","doomstorm","skullstorm",
  "ironshadow","voidshadow","nightshadow","stormshadow","dragonsadow","wolfshadow","beastshadow","battleshadow","doomshadow","skullshadow",
  "ironvoid","stormvoid","nightvoid","dragonvoid","wolfvoid","beastvoid","battlevoid","doomvoid","skullvoid","shadowvoid",
  "ironnight","stormnight","voidnight","dragonnight","wolfnight","beastnight","battlenight","doomnight","skullnight","shadownight",
  "ironwolf","stormwolf","shadowwolf","voidwolf","nightwolf","dragonwolf","beastwolf","battlewolf","doomwolf","skullwolf",
  "irondragon","stormdragon","shadowdragon","voiddragon","nightdragon","wolfdragon","beastdragon","battledragon","doomdragon","skulldragon",
  "ironbeast","stormbeast","shadowbeast","voidbeast","nightbeast","dragonbeast","wolfbeast","battlebeast","doombeast","skullbeast",
  "ironskull","stormskull","shadowskull","voidskull","nightskull","dragonskull","wolfskull","beastskull","battleskull","doomskull",
  "ironphantom","stormphantom","shadowphantom","voidphantom","nightphantom","dragonphantom","wolfphantom","beastphantom","battlephantom","doomphantom",
  "ironwarden","stormwarden","shadowwarden","voidwarden","nightwarden","dragonwarden","wolfwarden","beastwarden","battlewarden","doomwarden",
  "ironranger","stormranger","shadowranger","voidranger","nightranger","dragonranger","wolfranger","beastranger","battleranger","doomranger",
  "ironmerc","stormmerc","shadowmerc","voidmerc","nightmerc","dragonmerc","wolfmerc","beastmerc","battlemerc","doommerc",
  "ironraider","stormraider","shadowraider","voidraider","nightraider","dragonraider","wolfraider","beastraider","battleraider","doomraider",
  "ironstriker","stormstriker","shadowstriker","voidstriker","nightstriker","dragonstriker","wolfstriker","beaststriker","battlestriker","doomstriker",
  "ironbrawler","stormbrawler","shadowbrawler","voidbrawler","nightbrawler","dragonbrawler","wolfbrawler","beastbrawler","battlebrawler","doombrawler",
  "ironfighter","stormfighter","shadowfighter","voidfighter","nightfighter","dragonfighter","wolffighter","beastfighter","battlefighter","doomfighter",
  "ironassassin","stormassassin","shadowassassin","voidassassin","nightassassin","dragonassassin","wolfassassin","beastassassin","battleassassin","doomassassin",
  "ironsniper","stormsniper","shadowsniper","voidsniper","nightsniper","dragonsniper","wolfsniper","beastsniper","battlesniper","doomsniper",
  "ironpredator","stormpredator","shadowpredator","voidpredator","nightpredator","dragonpredator","wolfpredator","beastpredator","battlepredator","doompredator",
  "ironhunter","stormhunter","shadowhunter","voidhunter","nighthunter","dragonhunter","wolfhunter","beasthunter","battlehunter","doomhunter",
  "ironcrusher","stormcrusher","shadowcrusher","voidcrusher","nightcrusher","dragoncrusher","wolfcrusher","beastcrusher","battlecrusher","doomcrusher",
  "irondestroyer","stormdestroyer","shadowdestroyer","voiddestroyer","nightdestroyer","dragondestroyer","wolfdestroyer","beastdestroyer","battledestroyer","doomdestroyer",
  "ironreaper","stormreaper","shadowreaper","voidreaper","nightreaper","dragonreaper","wolfreaper","beastreaper","battlereaper","doomreaper",
  "ironexecutioner","stormexecutioner","shadowexecutioner","voidexecutioner","nightexecutioner","dragonexecutioner","wolfexecutioner","beastexecutioner","battleexecutioner","doomexecutioner"
];

const femaleWords = [
  "queen", "empress", "goddess", "diva", "angel",
  "luna", "star", "fairy", "rose", "blossom",
  "phoenix", "siren", "enchantress", "muse", "nymph",
  "duchess", "countess", "princess", "maiden", "lady",
  "mistress", "witch", "sorceress", "oracle", "sibyl",
  "valkyrie", "banshee", "harpy", "medusa", "lamia","vixen", "shadowqueen", "darkdiva", "nightwitch", "crimsonrose",
  "silverangel", "stormgoddess", "icyqueen", "lunarprincess", "voidsiren",
  "shadowvixen", "frostfairy", "darknymph", "emberwitch", "blazemaiden",
  "toxicangel", "phantomlady", "nightbanshee", "cyberdiva", "voidwitch",
  "starlady", "moonvixen", "ghostprincess", "wildsiren", "roguegoddess",
  "venomrose", "icyvalkyrie", "shadowblossom", "darkenchantress", "mysticmaiden",
  "crystalqueen", "stormangel", "lunarwitch", "phantomfairy", "neonvixen",
  "darkoracle", "savageprincess", "roguewitch", "voidangel", "nightdiva",
  "ghostgoddess", "stormrose", "icyenchantress", "moonfairy", "shadowmaiden",
  "darkvalkyrie", "wildangel", "cyberwitch", "venomlady", "toxicdiva",
  "emberqueen", "frostmaiden", "neonangel", "ghostvixen", "crimsondiva",
  "stormnymph", "moonbanshee", "darkfairy", "voidprincess", "wildrose",
  "roguevalkyrie", "icywitch", "shadowangel", "phantomqueen", "neonlady",
  "venomvixen", "darkblossom", "ghostmaiden", "stormdiva", "crystalwitch",
  "moonoracle", "toxicfairy", "embervixen", "frostangel", "shadowlady",
  "wildprincess", "rogueangel", "icyrose", "darkgoddess", "ghostdiva",
  "stormfairy", "moonwitch", "venomangel", "cyberqueen", "shadoworacle",
  "phantomvixen", "crimsonangel", "darklady", "wildgoddess", "icydiva",
  "stormprincess", "moonmaiden", "voidfairy", "roguequeen", "ghostangel",
  "neonprincess", "emberlady", "shadowdiva", "toxicqueen", "crystalangel","aurora", "celestia", "novaqueen", "starwitch", "nightrose",
  "dreamdiva", "shadowgoddess", "moonangel", "darkprincess", "icyblossom",
  "frostqueen", "lunardiva", "starfairy", "emberangel", "voidmaiden",
  "wildnymph", "ghostrose", "stormlady", "crystaldiva", "moonvixen",
  "nightfairy", "darkmuse", "icyoracle", "lunarwitch", "shadownymph",
  "venomprincess", "stormgoddess", "moonblossom", "phantomangel", "wildvixen",
  "ghostfairy", "frostprincess", "darkrose", "emberdiva", "crystalwitch",
  "moonlady", "shadowrose", "nightangel", "stormfairy", "icyprincess",
  "wildwitch", "ghostnymph", "darkangel", "voidgoddess", "lunarmaiden",
  "venomdiva", "stormvixen", "shadowwitch", "moonqueen", "crystalprincess",
  "icyangel", "nightvixen", "emberfairy", "darklady", "phantomgoddess",
  "stormrose", "moonoracle", "wilddiva", "ghostwitch", "shadowfairy",
  "lunarangel", "icyvixen", "darkblossom", "stormangel", "moonwitch",
  "crystalangel", "nightdiva", "voidvixen", "wildangel", "ghostqueen",
  "shadowprincess", "emberrose", "moonfairy", "icydiva", "stormprincess",
  "darknymph", "phantomdiva", "wildrose", "ghostangel", "shadowlady",
  "lunarfairy", "venomangel", "stormnymph", "moonmaiden", "crystalvixen",
  "icyfairy", "nightqueen", "darkvixen", "emberprincess", "ghostlady",
  "shadowangel", "wildprincess", "moonrose", "stormqueen", "phantomfairy",
  "icyrose", "lunardivine", "darkdivine", "ghostdivine", "shadowdivine","radiantqueen","midnightdiva","galaxywitch","neonrose","frostdivine",
  "moonshadow","starqueen","velvetwitch","auroradiva","nightoracle",
  "cosmicprincess","silversiren","embergoddess","dreamangel","shadowlotus",
  "wildoracle","ghostsiren","stormmaiden","crystalrose","moonshadowess",
  "nightvixen","lunarblossom","darkbutterfly","frostnymph","cyberprincess",
  "starwitch","galaxyfairy","shadowprincess","emberlady","moonphantom",
  "darklotus","neonwitch","velvetqueen","ghostmaiden","moonlightdiva",
  "wildsorceress","icyphoenix","stormbutterfly","dreamwitch","auroraprincess",
  "darkpearl","mooncrystal","shadowdaisy","ghostlotus","icygoddess",
  "neonfairy","stormprincess","wildangelic","nightgoddess","moonrosebud",
  "frostlady","cyberangel","shadowbliss","crimsonfairy","darkbutterflyx",
  "lunarpearl","stormoracle","icyprincessx","ghostbutterfly","wildmuse",
  "moonlotus","darkcrystal","neonprincess","shadowbutterfly","auroragoddess",
  "nightblossom","stormdivine","icyrosebud","velvetfairy","ghostqueenx",
  "wildwitchx","moonladyx","darkmusex","neonlotus","shadowmystic",
  "aurorawitch","stormnymphx","icyfairyqueen","ghostprincessx","wildblossom",
  "moonbutterfly","darkvixenx","neonangelx","shadowqueenx","aurorafairy",
  "nightpearl","stormrosebud","icydivine","ghostgoddessx","wildfairyqueen",
  "moonprincessx","darklotusx","neonrosebud","shadowbutterflyx","aurorapearl",
  "nightcrystal","stormangelx","icyqueenx","ghostlotusx","wilddivine",
  "moonmuse","darkblossomx","neonfairyx","shadowangelx","auroraprincessx",
  "nightrosebud","stormfairyx","icywitchx","ghostdivine","wildqueenx",
  "moonbliss","darkfairyqueen","neoncrystal","shadowdivine","auroralady",
  "nightfairyqueen","stormbutterflyx","icyangelx","ghostfairyqueen","wildlotus",
  "moonvixenx","darkpearlx","neonwitchx","shadowpearl","auroravixen",
  "nightmuse","stormpearl","icybliss","ghostmuse","wildrosebud",
  "mooncrystalx","darkangelx","neondiva","shadowrosebud","aurorablossom",
  "nightbutterfly","stormcrystal","icydiva","ghostangelx","wildprincessx",
  "moonangelx","darkqueenx","neonpearl","shadowvixenx","auroradivine",
  "nightlotus","stormdiva","icyprincess","ghostpearl","wildbutterfly",
  "moonlotusx","darkfairyx","neonqueen","shadowmuse","aurorarose",
  "nightangelx","stormqueenx","icybutterfly","ghostlotusqueen","wildangelx",
  "moonpearl","darkdivinex","neonbliss","shadowblossomx","aurorawitchx",
  "nightqueenx","stormfairyqueen","icygoddessx","ghostcrystal","wildvixenx",
  "moonrose","darkangelqueen","neonlotusx","shadowdiva","aurorapearlx",
  "nightdiva","stormwitchx","icyqueenrose","ghostbutterflyx","wildpearl",
  "moonfairyx","darkmusequeen","neonangelqueen","shadowfairyx","auroracrown",
  "nightgoddessx","stormvixenx","icyrose","ghostvixenx","wildbliss",
  "moonbutterflyx","darkcrystalx","neonmuse","shadowqueenrose","auroraflare",
  "nightwitchx","stormangelqueen","icybutterflyx","ghostrosebud","wildcrown",
  "moonangelqueen","darkrosebud","neonfairyqueen","shadowcrystal","aurorastar",
  "nightprincessx","stormcrystalx","icyblossom","ghostangelqueen","wildrose",
  "mooncrystalqueen","darkpearlqueen","neonvixenx","shadowlotusx","auroradream",
  "nightfairyx","stormlotus","icydivinex","ghostqueenrose","wildgoddessx",
  "moonblossomx","darkwitchqueen","neonbutterfly","shadowfairyqueen","aurorashine",
  "nightangelqueen","stormblossom","icyfairyx","ghostmusequeen","wildangelqueen",
  "moondivinex","darkbliss","neonqueenrose","shadowgoddessx","aurorawing",
  "nightlotusx","stormrose","icyangelqueen","ghostblossom","wildcrystal",
  "moonqueenrose","darkprincessx","neonlotusqueen","shadowvixenqueen","auroraceleste",
  "nightrose","stormmuse","icygoddessqueen","ghostprincessrose","wildfairyx",
  "moonfairyqueen","darkbutterflyqueen","neonangel","shadowprincessrose","aurorapulse",
  "nightcrystalx","stormvixenqueen","icyrosequeen","ghostdivinex","wildmusequeen",
  "moonangelrose","darkfairyrose","neonblossom","shadowqueenstar","aurorafrost",
  "nightblossomx","stormprincessx","icydivaqueen","ghostpearlqueen","wildlotusx",
  "moonvixenqueen","darklotusqueen","neonwitchqueen","shadowrosequeen","auroradust",
  "nightmusex","stormangelrose","icycrystal","ghostbutterflyqueen","wildpearlx",
  "moonlotusqueen","darkangelrose","neonfairyrose","shadowdivaqueen","auroraspark",
  "nightangelrose","stormqueenrose","icyblossomx","ghostrosequeen","wildbutterflyx",
  "mooncrystalrose","darkvixenqueen","neonqueenx","shadowangelqueen","auroraglory",
  "nightpearlx","stormdivaqueen","icyangelrose","ghostcrystalqueen","wildqueenrose",
  "moonrosequeen","darkbutterflyrose","neonprincessx","shadowbutterflyrose","auroraflame"
];

const neutralWords = [
  "nova", "vortex", "shadow", "phantom", "glitch",
  "pixel", "nebula", "eclipse", "orbit", "echo",
  "storm", "blaze", "frost", "venom", "void",
  "pulse", "code", "force", "nexus", "matrix",
  "cipher", "signal", "beacon", "abyss", "cosmos",
  "prism", "spectrum", "frequency", "resonance", "vibration",
  "quantum", "energy", "flux", "surge", "surge"
];

const numbers = [
  7, 9, 11, 13, 21, 23, 47, 69, 77, 99,
  101, 111, 222, 333, 404, 666, 777, 999, 1337, 2012,
  2020, 2024, 2025, 360, 420, 513, 666, 777, 888, 9999
];

const templates = [
  "{name}{word}",
  "{word}{name}",
  "{adj}{name}",
  "{name}{noun}",
  "{name}_{noun}",
  "{adj}_{name}",
  "{name}{number}",
  "{adj}{noun}{number}",
  "{name}{adj}",
  "{noun}{name}",
  "{adj}{noun}",
  "{noun}{number}",
  "{adj}{number}",
  "{name}{noun}{number}",
  "{adj}_{noun}",
  "{noun}_{number}"
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateGamingUsername(
  userInput?: string,
  gender?: "male" | "female" | "neutral"
): string {
  let wordPool = neutralWords;
  if (gender === "male") wordPool = maleWords;
  if (gender === "female") wordPool = femaleWords;

  const adj = getRandomItem(gamingAdjectives);
  const noun = getRandomItem(gamingNouns);
  const word = getRandomItem(wordPool);
  const number = getRandomItem(numbers);
  const template = getRandomItem(templates);

  let username = template
    .replace("{name}", userInput || getRandomItem(gamingNouns))
    .replace("{word}", word)
    .replace("{adj}", adj)
    .replace("{noun}", noun)
    .replace("{number}", number.toString());

  // Capitalize first letter of each word
  username = username
    .split(/([_-])/)
    .map((part) => {
      if (part === "_" || part === "-") return part;
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("");

  return username;
}

function generateMultipleUsernames(
  count: number,
  userInput?: string,
  gender?: "male" | "female" | "neutral"
): string[] {
  const usernames = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 15;

  while (usernames.size < count && attempts < maxAttempts) {
    const username = generateGamingUsername(userInput, gender);
    usernames.add(username);
    attempts++;
  }

  return Array.from(usernames).slice(0, count);
}

export default function GamingUsernameGenerator() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female" | "neutral">("neutral");
  const [count, setCount] = useState<number>(12);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Gaming Username Generator - Create Epic Gamer Names | Pixocraft Tools",
    description: "Generate epic gaming usernames instantly with powerful word combinations. Perfect for gaming accounts, Discord, and online gaming profiles.",
    keywords: "gaming username generator, gamer username, discord username, twitch username, gaming names",
    canonicalUrl: "https://tools.pixocraft.in/tools/gaming-username-generator",
  });

  const handleGenerate = () => {
    const newUsernames = generateMultipleUsernames(count, userInput || undefined, gender);
    setUsernames(newUsernames);
  };

  const handleCopyAll = () => {
    const allUsernames = usernames.join("\n");
    copyToClipboard(allUsernames, "All usernames copied!");
  };

  const getAvailabilityUrl = (username: string, platform: string): string => {
    const urls: Record<string, string> = {
      discord: `https://discord.com/`,
      twitch: `https://twitch.tv/${username}`,
      reddit: `https://reddit.com/user/${username}`,
      steam: `https://steamcommunity.com/search/users/${username}`,
    };
    return urls[platform] || "#";
  };

  return (
    <ToolLayout
      title="Gaming Username Generator"
      description="Generate powerful and epic gaming usernames instantly. Perfect for gaming accounts, Discord, Twitch, and online gaming communities."
      icon={<Gamepad2 className="h-10 w-10 text-primary" />}
      toolId="gaming-username-generator"
      category="Fun & Utility"
      howItWorks={[
        { step: 1, title: "Enter Your Name (Optional)", description: "Add your name, keyword, or brand word to personalize usernames. Leave blank for fully random generation." },
        { step: 2, title: "Choose Gender Vibe", description: "Pick masculine, feminine, or neutral to adapt the word choices for your style." },
        { step: 3, title: "Generate & Copy", description: "Generate epic gaming usernames instantly and copy your favorites to use on any gaming platform." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Epic Names", description: "400+ gaming nouns and 300+ adjectives create millions of unique combinations." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Smart Templates", description: "16 different name templates ensure variety and uniqueness in every generation." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "No Data Stored", description: "All usernames generated locally in your browser with zero tracking." },
      ]}
      faqs={[
        { question: "What makes a good gaming username?", answer: "Great gaming usernames are memorable, unique, and reflect your gaming style. Our generator combines powerful words, adjectives, and numbers to create names that stand out." },
        { question: "Can I use these on any gaming platform?", answer: "Yes! Generated usernames work on Discord, Twitch, Steam, Reddit, and most gaming platforms. Some platforms may have character limits, so adjust as needed." },
        { question: "Can I personalize with my own name?", answer: "Absolutely! Enter your name or any keyword in the input field, and the generator will create usernames that incorporate your custom input." },
        { question: "How many usernames can I generate?", answer: "Generate 12, 25, or 50 usernames at once. Click 'Copy All' to copy all usernames to your clipboard at once." },
        { question: "Are the usernames copyrighted?", answer: "No! All generated usernames are yours to use freely. However, availability on specific platforms depends on registration." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Card */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Gaming Usernames</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Custom Input */}
            <div className="space-y-2">
              <Label htmlFor="user-input" className="text-base font-semibold">
                Your Name or Keyword (Optional)
              </Label>
              <Input
                id="user-input"
                placeholder="e.g., vivek, pixel, shadow, storm"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                data-testid="input-custom-name"
              />
              <p className="text-xs text-muted-foreground">
                Leave blank for random generation, or enter a name/keyword to personalize usernames
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gender Selector */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-base font-semibold">
                  Gender Vibe
                </Label>
                <Select value={gender} onValueChange={(value: any) => setGender(value)}>
                  <SelectTrigger id="gender" data-testid="select-gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="male">Masculine</SelectItem>
                    <SelectItem value="female">Feminine</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Adapt word choices to match your vibe
                </p>
              </div>

              {/* Count Selector */}
              <div className="space-y-2">
                <Label htmlFor="count" className="text-base font-semibold">
                  Generate Count
                </Label>
                <Select value={count.toString()} onValueChange={(value) => setCount(parseInt(value))}>
                  <SelectTrigger id="count" data-testid="select-count">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 usernames</SelectItem>
                    <SelectItem value="25">25 usernames</SelectItem>
                    <SelectItem value="50">50 usernames</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How many usernames to generate
                </p>
              </div>
            </div>

            {/* Generate Button */}
            <Button onClick={handleGenerate} size="lg" className="w-full" data-testid="button-generate">
              <RefreshCw className="h-5 w-5 mr-2" />
              {usernames.length > 0 ? "Generate New Usernames" : "Generate Gaming Usernames"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Grid */}
        {usernames.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-lg font-semibold">Generated Usernames</h3>
              <div className="flex gap-2">
                <Badge variant="secondary">{usernames.length} usernames</Badge>
                <Button
                  onClick={handleCopyAll}
                  size="sm"
                  variant="outline"
                  data-testid="button-copy-all"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {usernames.map((username, index) => (
                <Card
                  key={`${username}-${index}`}
                  className="hover-elevate transition-all group relative flex flex-col"
                  data-testid={`card-username-${index}`}
                >
                  <CardContent className="pt-6 pb-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="font-semibold text-lg truncate"
                          data-testid={`text-username-${index}`}
                        >
                          {username}
                        </span>
                        <button
                          onClick={() => copyToClipboard(username, "Username copied!")}
                          className="p-1 rounded hover:bg-muted transition-colors"
                          data-testid={`button-copy-username-${index}`}
                        >
                          <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </button>
                      </div>
                      <Badge variant="outline" className="text-xs w-fit">
                        {username.length} chars
                      </Badge>

                      <div className="pt-2 border-t space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">Check availability:</p>
                        <div className="flex flex-wrap gap-1">
                          <a
                            href={getAvailabilityUrl(username, "twitch")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-twitch-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Twitch
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "discord")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-discord-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Discord
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "reddit")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-reddit-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Reddit
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "steam")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-steam-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Steam
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Info Box */}
        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Pro Tips for Gaming Names</h3>
                <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Enter your name or keyword to personalize usernames for better branding</li>
                  <li>• Choose masculine, feminine, or neutral vibes to match your gaming persona</li>
                  <li>• Click any username to copy it instantly, or use Copy All for batch copying</li>
                  <li>• Check availability on Twitch, Discord, Reddit, and Steam before you commit</li>
                  <li>• Gaming usernames combine powerful words with strategic numbers for uniqueness</li>
                  <li>• Short, memorable names (under 15 characters) are easier to remember and share</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
