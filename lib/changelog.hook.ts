import { useEffect, useMemo, useState } from 'react';
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

  const requestURL = useMemo(() => buildRequestURL(config), [config]);
  const apiKey = config.connection.API_KEY;

  useEffect(() => {
    void (async () => {
      setIsLoading(true);

      try {
        const result = await fetch(requestURL, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
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
            resultData.sort(
              (a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate),
            ),
          );
        } else {
          setError('Did not receive a changelog.');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }

      setIsLoading(false);
    })();
  }, [apiKey, requestURL]);

  return {
    loading: isLoading,
    error,
    data,
  };
}
