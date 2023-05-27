import axios from 'axios';
import { debounce, set } from 'lodash';
import { useEffect, useState, useCallback, useRef } from 'react';
import { SearchResultType } from '@/constants/types';
import { DEFAULT_SEARCH_RESULTS } from '@/constants/data';

export default function useSearchResults(query: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultType[]>(
    DEFAULT_SEARCH_RESULTS
  );

  const getSearchResults = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/stocks/search', {
        params: { query },
      });
      setSearchResults(data);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  }, [query]);

  const debouncer: any = useRef();

  useEffect(() => {
    debouncer.current = debounce(() => getSearchResults(), 300);
  }, [getSearchResults]);

  const debouncedGetSearchResults = useCallback(() => {
    debouncer.current();
  }, []);

  useEffect(() => {
    if (query) {
      debouncedGetSearchResults();
    } else {
      setSearchResults(DEFAULT_SEARCH_RESULTS);
    }

    return () => {
      if (debouncer.current) {
        debouncer.current.cancel();
      }
    };
  }, [query, debouncedGetSearchResults]);

  return {
    loading,
    error,
    searchResults,
  };
}
