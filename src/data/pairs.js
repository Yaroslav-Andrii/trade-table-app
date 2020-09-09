export const pairsKyes = [
  'AUD',	
  'BGN',	
  'BRL',	
  'CAD',	
  'CHF',	
  'CNY',	
  'CZK',	
  'DKK',	
  'EUR',	
  'GBP',	
  'HKD',
  'HUF',	
  'ILS',	
  'INR',	
  'JPY',	
  'MXN',	
  'NOK',	
  'NZD',	
  'PLN',	
  'RON',	
  'RUB',	
  'SEK',	
  'SGD',	
  'TRY',	
  'UAH',	
  'USD',	
  'ZAR',
  'BTC',
  'LTH',
  'ETC',
];

export const defaultPairs = [
  "EURUSD",
  "GBPUSD",
  "USDCHF",
  "USDJPY",
  "USDCNH",
  "USDRUB",
  "AUDUSD",
  "USDCAD",
  "USDSEK",
  "USDTRY",
  "USDZAR",
  "USDCZK",
  "USDHUF",
  "USDPLN",
  "USDRUR",
  "AUDCAD",
];

export const maxCombination = countCombinations(pairsKyes.length, 2);

function countCombinations(n, k) {
  return ( factorial(n)/(factorial(k) * factorial(n - k)) ) * 2;
}

function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}