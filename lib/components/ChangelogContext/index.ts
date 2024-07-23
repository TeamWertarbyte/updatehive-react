import { createContext, useContext } from 'react';
import { Changelog } from '../../changelog.types.ts';

export interface ChangelogContextProps {
  data?: Changelog[];
}

export const ChangelogContext = createContext<ChangelogContextProps>({});

export const useUpdateHiveContext: () => ChangelogContextProps = () => {
  const context = useContext(ChangelogContext);

  if (!context) {
    throw new Error(
      'useChangelogContext must be used within a ChangelogContainer',
    );
  }

  return context;
};
