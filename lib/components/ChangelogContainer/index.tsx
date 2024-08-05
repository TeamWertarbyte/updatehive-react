import * as React from 'react';
import { useChangelogs } from '../../changelog.hook.ts';
import { ChangelogContext } from '../ChangelogContext';
import { CircularProgress, CssVarsProvider, Typography } from '@mui/joy';

interface Props {
  API_KEY: string;
  product: string;
  config?: {
    url?: string;
    onlyLast?: boolean;
  };
  Error?: React.ComponentType<{ error?: string }>;
  Loading?: React.ComponentType;
  children: React.ReactNode;
}

/**
 * Container for all UpdateHive react components.
 * This container is responsible for fetching the changelogs from the UpdateHive API and handling errors / loading states.
 *
 * For API_KEY, product, config see UpdateHiveConfig.
 *
 * @param children Child components to render loaded changelogs.
 * @param Error Overridable error component to render if an error occurs.
 * @param Loading Overridable loading component to render while loading.
 */
export const ChangelogContainer: React.FC<Props> = ({
  API_KEY,
  product,
  config,
  children,
  Error = () => (
    <Typography>
      Ein Fehler ist beim Laden der Versionshistorie aufgetreten!
    </Typography>
  ),
  Loading = () => <CircularProgress />,
}) => {
  const {
    loading,
    error: errorMessage,
    data,
  } = useChangelogs({
    connection: {
      API_KEY,
      url: config?.url,
    },
    changelogs: {
      product,
      onlyLast: config?.onlyLast,
    },
  });

  if (errorMessage) {
    console.error(errorMessage);
  }

  return (
    <ChangelogContext.Provider value={{ data }}>
      {errorMessage && <Error error={errorMessage} />}
      {!errorMessage && loading && <Loading />}
      {!errorMessage && !loading && data && (
        <CssVarsProvider>{children}</CssVarsProvider>
      )}
    </ChangelogContext.Provider>
  );
};
