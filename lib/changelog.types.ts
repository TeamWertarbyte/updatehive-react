/**
 * Configuration to retrieve changelogs from UpdateHive.
 *
 * @param connection
 *    API_KEY:        API_KEY to access UpdateHive public REST API.
 *    url:            Override the default URL to UpdateHive API.
 *
 * @param changelogs
 *    product:        Product ID to retrieve changelogs for.
 *    onlyLast:       Retrieve only the last changelog.
 */
export type UpdateHiveConfig = {
  connection: {
    API_KEY: string;
    url?: string;
  };
  changelogs: {
    product: string;
    onlyLast?: boolean;
  };
};

export type UpdateHiveHookResult = {
  loading: boolean;
  error?: string;
  data?: Changelog[];
};

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

export type ChangelogEntryInterface = {
  changeType: ChangeType;
  description: string;
  name?: string;
  tags?: string[];
  component?: string;
};

export type Changelog = {
  product: string;
  variant: VariantType;
  version: string;
  releaseDate: Date;
  title?: string;
  description?: string;
  entries: ChangelogEntryInterface[];
};
