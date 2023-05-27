import { SearchResultType } from './types';

export const DEFAULT_SEARCH_RESULTS: SearchResultType[] = [
  {
    exchange: 'NASDAQ',
    name: 'Apple Inc. Common Stock',
    sector: 'Technology',
    symbol: 'AAPL',
  },
  {
    exchange: 'NASDAQ',
    name: 'Alphabet Inc. Class A Common Stock',
    sector: 'Technology',
    symbol: 'GOOGL',
  },
  {
    exchange: 'NASDAQ',
    name: 'Tesla Inc. Common Stock',
    sector: 'Consumer Discretionary',
    symbol: 'TSLA',
  },
  {
    exchange: 'NASDAQ',
    name: 'Microsoft Corporation Common Stock',
    sector: 'Technology',
    symbol: 'MSFT',
  },
  {
    exchange: 'NASDAQ',
    name: 'Meta Platforms Inc. Class A Common Stock',
    sector: 'Technology',
    symbol: 'META',
  },
];

export const EXPLORE_STOCKS = [
  'AAPL',
  'GOOGL',
  'TSLA',
  'MSFT',
  'META',
  'BRK-A',
  'GS',
  'JPM',
  'AMZN',
];

export const SUMMARY_FIELDS = {
  'previousClose': 'Previous Close',
  'marketCap': 'Market Cap',
  'dayLow': 'Day Low',
  'dayHigh': 'Day High',
  '52WeekChange': '52 Week Change',
  'dividendRate': 'Dividend Rate',
  'dividendYield': 'Dividend Yield',
  'trailingEps': 'EPS',
  'trailingPE': 'P/E',
  'beta': 'Beta',
  'volume': 'Volume',
  'averageVolume': 'Average Volume',
  'payoutRatio': 'Payout Ratio',
  'bookValue': 'Book Value',
  'debtToEquity': 'Debt to Equity',
  'totalRevenue': 'Revenue',
  'targetLowPrice': 'Target Low',
  'targetHighPrice': 'Target High',
};

export const SUMMARY_FIELDS_NUMBER_FORMAT = new Set([
  'marketCap',
  'volume',
  'averageVolume',
  'totalRevenue',
]);

export const PROFILE_FIELDS = {
  longName: 'Name',
  industry: 'Industry',
  sector: 'Sector',
  website: 'Website',
  address: 'Address',
  city: 'City',
  state: 'State',
  zip: 'Zip',
  country: 'Country',
  phone: 'Phone',
  fullTimeEmployees: 'Full Time Employees',
};

export const PROFILE_FIELDS_NUMBER_FORMAT = new Set(['fullTimeEmployees']);

export const PERIODS = [
  { label: '1D', value: '1d' },
  { label: '1W', value: '1wk' },
  { label: '1M', value: '1mo' },
  { label: '6M', value: '6mo' },
  { label: '1Y', value: '1y' },
  { label: '5Y', value: '5y' },
  { label: 'All', value: 'max' },
];

export const INTERVALS = ['2m', '15m', '1h', '1d', '1d', '5d', '1mo'];
