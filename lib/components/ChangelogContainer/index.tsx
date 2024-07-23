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
    <div>
      <ChangelogContext.Provider value={{ data }}>
        {errorMessage && <Error error={errorMessage} />}
        {!errorMessage && loading && <Loading />}
        {!errorMessage && !loading && data && (
          <CssVarsProvider>{children}</CssVarsProvider>
        )}
      </ChangelogContext.Provider>
    </div>
  );
};
