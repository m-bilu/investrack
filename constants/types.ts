export type WatchlistType = {
  _id: string;
  name: string;
  stocks: string[];
  user: string;
};

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

export type UserType = {
  uid: string | null;
  email: string | null;
  name: string | null;
  provider: string | null;
};
