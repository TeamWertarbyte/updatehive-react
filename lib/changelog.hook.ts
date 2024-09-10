import { useEffect, useState } from 'react';
import {
  Changelog,
  UpdateHiveConfig,
  UpdateHiveHookResult,
} from './changelog.types.ts';

const DEFAULT_API_URL = 'https://updatehive.wertarbyte.com/api';

const buildRequestURL = (config: UpdateHiveConfig): string => {
  const API_URL = `${config.connection.url ?? DEFAULT_API_URL}`;
  const API_ENDPOINT = config.changelogs.onlyLast
    ? '/changelogs/latest?'
    : '/changelogs?';
  const searchParams = new URLSearchParams({
    product: config.changelogs.product,
  });

  return `${API_URL}${API_ENDPOINT}` + searchParams.toString();
};

/**
 * Base hook to get all changelogs for a product.
 */
export function useChangelogs(config: UpdateHiveConfig): UpdateHiveHookResult {
  const [data, setData] = useState<Changelog[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const fetchData = async () => {
    setIsLoading(true);

    const requestURL = buildRequestURL(config);

    try {
      const result = await fetch(requestURL, {
        headers: {
          Authorization: `Bearer ${config.connection.API_KEY}`,
          Accept: 'application/vnd.wertarbyte.changelog.v1+json',
        },
      });

      if (!result.ok) {
        const error = await result.json();
        throw new Error(error.message);
      }

      const resultData: Changelog[] | undefined = await result.json();

      if (resultData) {
        setData(
          resultData.sort((a, b) => {
            return (
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime()
            );
          }),
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void fetchData();
    // Explicitly set to empty array to avoid multiple requests.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading: isLoading,
    error,
    data,
  };
}
