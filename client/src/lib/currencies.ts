export interface Currency {
  id: string;
  country: string;
  currency: string;
  symbol: string;
  code?: string;
}

export const CURRENCIES: Currency[] = [
  { id: "AFG", country: "Afghanistan", currency: "Afghani", symbol: "؋" },
  { id: "ALB", country: "Albania", currency: "Lek", symbol: "L" },
  { id: "ALG", country: "Algeria", currency: "Dinar", symbol: "دج" },
  { id: "ANG", country: "Angola", currency: "Kwanza", symbol: "Kz" },
  { id: "ARG", country: "Argentina", currency: "Peso", symbol: "$" },
  { id: "ARM", country: "Armenia", currency: "Dram", symbol: "֏" },
  { id: "AUS", country: "Australia", currency: "Dollar", symbol: "$" },
  { id: "AZE", country: "Azerbaijan", currency: "Manat", symbol: "₼" },
  { id: "BAH1", country: "Bahamas", currency: "Dollar", symbol: "$" },
  { id: "BAH2", country: "Bahrain", currency: "Dinar", symbol: ".د.ب" },
  { id: "BAN", country: "Bangladesh", currency: "Taka", symbol: "৳" },
  { id: "BAR", country: "Barbados", currency: "Dollar", symbol: "$" },
  { id: "BEL1", country: "Belarus", currency: "Ruble", symbol: "Br" },
  { id: "BEL2", country: "Belgium", currency: "Euro", symbol: "€" },
  { id: "BLZ", country: "Belize", currency: "Dollar", symbol: "$" },
  { id: "BOL", country: "Bolivia", currency: "Boliviano", symbol: "Bs." },
  { id: "BRA", country: "Brazil", currency: "Real", symbol: "R$" },
  { id: "BRU", country: "Brunei", currency: "Dollar", symbol: "$" },
  { id: "BUL", country: "Bulgaria", currency: "Lev", symbol: "лв" },
  { id: "CAM", country: "Cambodia", currency: "Riel", symbol: "៛" },
  { id: "CAN", country: "Canada", currency: "Dollar", symbol: "$" },
  { id: "CHI", country: "Chile", currency: "Peso", symbol: "$" },
  { id: "CHN", country: "China", currency: "Yuan (Renminbi)", symbol: "¥" },
  { id: "COL", country: "Colombia", currency: "Peso", symbol: "$" },
  { id: "COS", country: "Costa Rica", currency: "Colón", symbol: "₡" },
  { id: "CRO", country: "Croatia", currency: "Euro", symbol: "€" },
  { id: "CUB", country: "Cuba", currency: "Peso", symbol: "₱" },
  { id: "CZE", country: "Czech Republic", currency: "Koruna", symbol: "Kč" },
  { id: "DEN", country: "Denmark", currency: "Krone", symbol: "kr" },
  { id: "DOM", country: "Dominican Republic", currency: "Peso", symbol: "RD$" },
  { id: "EGY", country: "Egypt", currency: "Pound", symbol: "£" },
  { id: "EST", country: "Estonia", currency: "Euro", symbol: "€" },
  { id: "ETH", country: "Ethiopia", currency: "Birr", symbol: "Br" },
  { id: "EUR", country: "Eurozone", currency: "Euro", symbol: "€" },
  { id: "FIJ", country: "Fiji", currency: "Dollar", symbol: "$" },
  { id: "GEO", country: "Georgia", currency: "Lari", symbol: "₾" },
  { id: "GER", country: "Germany", currency: "Euro", symbol: "€" },
  { id: "GHA", country: "Ghana", currency: "Cedi", symbol: "₵" },
  { id: "GRE", country: "Greece", currency: "Euro", symbol: "€" },
  { id: "GUA", country: "Guatemala", currency: "Quetzal", symbol: "Q" },
  { id: "HKG", country: "Hong Kong", currency: "Dollar", symbol: "$" },
  { id: "HUN", country: "Hungary", currency: "Forint", symbol: "Ft" },
  { id: "ICE", country: "Iceland", currency: "Króna", symbol: "kr" },
  { id: "IND", country: "India", currency: "Rupee", symbol: "₹" },
  { id: "INO", country: "Indonesia", currency: "Rupiah", symbol: "Rp" },
  { id: "IRN", country: "Iran", currency: "Rial", symbol: "﷼" },
  { id: "IRQ", country: "Iraq", currency: "Dinar", symbol: "ع.د" },
  { id: "IRE", country: "Ireland", currency: "Euro", symbol: "€" },
  { id: "ISR", country: "Israel", currency: "Shekel", symbol: "₪" },
  { id: "ITA", country: "Italy", currency: "Euro", symbol: "€" },
  { id: "JAM", country: "Jamaica", currency: "Dollar", symbol: "J$" },
  { id: "JPN", country: "Japan", currency: "Yen", symbol: "¥" },
  { id: "JOR", country: "Jordan", currency: "Dinar", symbol: "د.ا" },
  { id: "KAZ", country: "Kazakhstan", currency: "Tenge", symbol: "₸" },
  { id: "KEN", country: "Kenya", currency: "Shilling", symbol: "KSh" },
  { id: "KUW", country: "Kuwait", currency: "Dinar", symbol: "د.ك" },
  { id: "LAO", country: "Laos", currency: "Kip", symbol: "₭" },
  { id: "LAT", country: "Latvia", currency: "Euro", symbol: "€" },
  { id: "LEB", country: "Lebanon", currency: "Pound", symbol: "£" },
  { id: "LIT", country: "Lithuania", currency: "Euro", symbol: "€" },
  { id: "MAL", country: "Malaysia", currency: "Ringgit", symbol: "RM" },
  { id: "MAD", country: "Maldives", currency: "Rufiyaa", symbol: "ރ" },
  { id: "MEX", country: "Mexico", currency: "Peso", symbol: "$" },
  { id: "MON1", country: "Mongolia", currency: "Tugrik", symbol: "₮" },
  { id: "MON2", country: "Morocco", currency: "Dirham", symbol: "د.م." },
  { id: "MYA", country: "Myanmar", currency: "Kyat", symbol: "Ks" },
  { id: "NEP", country: "Nepal", currency: "Rupee", symbol: "₨" },
  { id: "NET", country: "Netherlands", currency: "Euro", symbol: "€" },
  { id: "NZL", country: "New Zealand", currency: "Dollar", symbol: "$" },
  { id: "NIG", country: "Nigeria", currency: "Naira", symbol: "₦" },
  { id: "NKR", country: "North Korea", currency: "Won", symbol: "₩" },
  { id: "NOR", country: "Norway", currency: "Krone", symbol: "kr" },
  { id: "OMN", country: "Oman", currency: "Rial", symbol: "﷼" },
  { id: "PAK", country: "Pakistan", currency: "Rupee", symbol: "₨" },
  { id: "PAN", country: "Panama", currency: "Balboa", symbol: "B/." },
  { id: "PAR", country: "Paraguay", currency: "Guarani", symbol: "₲" },
  { id: "PER", country: "Peru", currency: "Sol", symbol: "S/" },
  { id: "PHI", country: "Philippines", currency: "Peso", symbol: "₱" },
  { id: "POL", country: "Poland", currency: "Złoty", symbol: "zł" },
  { id: "QAT", country: "Qatar", currency: "Riyal", symbol: "﷼" },
  { id: "ROM", country: "Romania", currency: "Leu", symbol: "lei" },
  { id: "RUS", country: "Russia", currency: "Ruble", symbol: "₽" },
  { id: "SAU", country: "Saudi Arabia", currency: "Riyal", symbol: "﷼" },
  { id: "SER", country: "Serbia", currency: "Dinar", symbol: "дин" },
  { id: "SIN", country: "Singapore", currency: "Dollar", symbol: "$" },
  { id: "SAF", country: "South Africa", currency: "Rand", symbol: "R" },
  { id: "SKR", country: "South Korea", currency: "Won", symbol: "₩" },
  { id: "SRI", country: "Sri Lanka", currency: "Rupee", symbol: "Rs" },
  { id: "SWE", country: "Sweden", currency: "Krona", symbol: "kr" },
  { id: "SWI", country: "Switzerland", currency: "Franc", symbol: "CHF" },
  { id: "SYR", country: "Syria", currency: "Pound", symbol: "£" },
  { id: "TAI", country: "Taiwan", currency: "Dollar", symbol: "NT$" },
  { id: "THA", country: "Thailand", currency: "Baht", symbol: "฿" },
  { id: "TUN", country: "Tunisia", currency: "Dinar", symbol: "د.ت" },
  { id: "TUR", country: "Turkey", currency: "Lira", symbol: "₺" },
  { id: "UAE", country: "UAE", currency: "Dirham", symbol: "د.إ" },
  { id: "UKG", country: "UK", currency: "Pound Sterling", symbol: "£" },
  { id: "UKR", country: "Ukraine", currency: "Hryvnia", symbol: "₴" },
  { id: "USA", country: "USA", currency: "Dollar", symbol: "$" },
  { id: "URU", country: "Uruguay", currency: "Peso", symbol: "$U" },
  { id: "UZB", country: "Uzbekistan", currency: "Som", symbol: "soʻm" },
  { id: "VEN", country: "Venezuela", currency: "Bolívar", symbol: "Bs." },
  { id: "VIE", country: "Vietnam", currency: "Dong", symbol: "₫" },
  { id: "YEM", country: "Yemen", currency: "Rial", symbol: "﷼" },
  { id: "ZAM", country: "Zambia", currency: "Kwacha", symbol: "ZK" },
  { id: "ZIM", country: "Zimbabwe", currency: "Dollar", symbol: "Z$" },
];

/**
 * Search currencies by country, currency name, or symbol
 */
export function searchCurrencies(query: string): Currency[] {
  if (!query.trim()) return CURRENCIES;
  
  const q = query.toLowerCase();
  return CURRENCIES.filter(c => 
    c.country.toLowerCase().includes(q) ||
    c.currency.toLowerCase().includes(q) ||
    c.symbol.includes(q)
  );
}

/**
 * Get currency by ID
 */
export function getCurrencyById(id: string): Currency | undefined {
  return CURRENCIES.find(c => c.id === id);
}

/**
 * Get currency symbol by ID
 */
export function getCurrencySymbol(id: string): string {
  return getCurrencyById(id)?.symbol || "$";
}
