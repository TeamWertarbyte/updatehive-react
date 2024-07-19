import { ChangeType } from '../changelog.types.ts';

export const ChangeTypeMap: Record<ChangeType, string> = {
  [ChangeType.FEATURE]: '[Neu]',
  [ChangeType.IMPROVEMENT]: '[Angegepasst]',
  [ChangeType.FIX]: '[Behoben]',
  [ChangeType.NOTE]: '[Notiz]',
  [ChangeType.BREAKING]: '[Geändertes Verhalten]',
  [ChangeType.KNOWNISSUE]: '[Bekanntes Problem]',
  [ChangeType.REMOVED]: '[Entfernt]',
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
