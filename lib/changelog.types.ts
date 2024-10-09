/**
 * Configuration to retrieve changelogs from UpdateHive.
 */
export interface UpdateHiveConfig {
  connection: {
    /**
     * API_KEY to access UpdateHive public REST API.
     */
    API_KEY: string;
    /**
     * Override the default URL to UpdateHive API.
     */
    url?: string;
  };
  changelogs: {
    /**
     * Product ID to retrieve changelogs for.
     */
    product: string;
    /**
     * Retrieve only the last changelog.
     */
    onlyLast?: boolean;
  };
}

export interface UpdateHiveHookResult {
  loading: boolean;
  error?: string;
  data?: Changelog[];
}

export enum VariantType {
  TEXT_ONLY = 'TEXT_ONLY',
  IMAGE_AND_TEXT = 'IMAGE_AND_TEXT',
}

export enum ChangeType {
  FEATURE = 'FEATURE',
  FIX = 'FIX',
  IMPROVEMENT = 'IMPROVEMENT',
  KNOWNISSUE = 'KNOWNISSUE',
  BREAKING = 'BREAKING',
  REMOVED = 'REMOVED',
  NOTE = 'NOTE',
}

export interface ChangelogEntryInterface {
  changeType: ChangeType;
  description: string;
  name?: string;
  tags?: string[];
  component?: string;
}

export interface Changelog {
  product: string;
  variant: VariantType;
  version: string;
  releaseDate: string;
  title?: string;
  description?: string;
  entries: ChangelogEntryInterface[];
}
