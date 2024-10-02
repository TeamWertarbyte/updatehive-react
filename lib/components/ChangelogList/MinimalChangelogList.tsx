import * as React from 'react';
import { useUpdateHiveContext } from '../ChangelogContext';
import {
  ChangelogWithComponents,
  ungroupedChangelogs,
} from '../changelog.util.ts';
import { ChangeType } from '../../changelog.types.ts';
import { useMemo } from 'react';
import { ComponentList } from './ComponentList.tsx';

interface Props {
  changeTypeMapper?: Record<ChangeType, string>;
}

/**
 * @deprecated Use `ChangelogList` with groupBy=GroupBy.NONE instead and hideEntryType=true.
 * Component which renders a minimal changelog list.
 *
 * The list is only ordered by creation.
 *
 * @param changeTypeMapper Overridable mapping of change types to displayable representations.
 */
export const MinimalChangelogList: React.FC<Props> = ({ changeTypeMapper }) => {
  const { data } = useUpdateHiveContext();

  const componentChangelogs: ChangelogWithComponents[] | undefined =
    useMemo(() => {
      if (!data) {
        return undefined;
      }

      return ungroupedChangelogs(data);
    }, [data]);

  return (
    <ComponentList
      changelogs={componentChangelogs}
      changeTypeMapper={changeTypeMapper}
      hideEntryType
    />
  );
};
