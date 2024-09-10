import {
  Changelog,
  ChangelogEntryInterface,
  ChangeType,
} from '../changelog.types.ts';

export const ChangeTypeMap: Record<ChangeType, string> = {
  [ChangeType.FEATURE]: 'Neu',
  [ChangeType.IMPROVEMENT]: 'Angegepasst',
  [ChangeType.FIX]: 'Behoben',
  [ChangeType.NOTE]: 'Notiz',
  [ChangeType.BREAKING]: 'Geändertes Verhalten',
  [ChangeType.KNOWNISSUE]: 'Bekanntes Problem',
  [ChangeType.REMOVED]: 'Entfernt',
};

export const getTypeColor = (type: ChangeType): string => {
  switch (type) {
    case ChangeType.FEATURE:
    case ChangeType.IMPROVEMENT:
    case ChangeType.FIX:
      return 'success.500';
    case ChangeType.NOTE:
      return 'neutral';
    case ChangeType.BREAKING:
    case ChangeType.KNOWNISSUE:
    case ChangeType.REMOVED:
      return 'danger.500';
    default:
      return 'neutral';
  }
};

export interface ChangelogWithComponents
  extends Pick<Changelog, 'version' | 'description' | 'releaseDate'> {
  entries: ComponentEntries[];
}

export const ungroupedChangelogs = (
  changelogs: Changelog[],
): ChangelogWithComponents[] => {
  return changelogs.map((changelog) => ({
    version: changelog.version,
    description: changelog.description,
    releaseDate: changelog.releaseDate,
    entries: [{ component: '', changelogs: changelog.entries }],
  }));
};

export const groupChangelogsByComponents = (
  changelogs: Changelog[],
): ChangelogWithComponents[] => {
  const mapped: ChangelogWithComponents[] = [];

  changelogs.forEach((changelog: Changelog) => {
    mapped.push({
      version: changelog.version,
      description: changelog.description,
      releaseDate: changelog.releaseDate,
      entries: groupChangelogByComponents(changelog),
    });
  });

  return mapped;
};

export interface ComponentEntries {
  component?: string;
  changelogs: ChangelogEntryInterface[];
}

export const groupChangelogByComponents = (
  changelog: Changelog,
): ComponentEntries[] => {
  const components = new Map<string, ChangelogEntryInterface[]>();

  changelog.entries.forEach((changelog) => {
    const component = changelog.component || 'Weitere Neuerungen';

    if (!components.has(component)) {
      components.set(component, []);
    }
    components.get(component)?.push(changelog);
  });

  const componentsArray: ComponentEntries[] = [];

  components.forEach((changelogs, component) => {
    componentsArray.push({ component, changelogs });
  });

  return componentsArray;
};
