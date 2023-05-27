export type SearchResultType = {
  exchange: string;
  name: string;
  sector: string;
  symbol: string;
};

export type TableItemType = string[2] | [string, number];

export type NewsType = {
  headline: string;
  summary: string;
  image: string;
  url: string;
};
