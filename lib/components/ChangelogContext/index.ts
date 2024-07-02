import { createContext } from 'react';
import { Changelog } from '../../changelog.types.ts';

export const ChangelogContext = createContext<{
  loading: boolean;
  error?: string;
  data?: Changelog[];
}>({ loading: true });
