import * as React from 'react';
import { useUpdateHiveContext } from '../ChangelogContext';
import {
  ChangelogWithComponents,
  ChangeTypeMap,
  getTypeColor,
  ungroupedChangelogs,
} from '../changelog.util.ts';
import { ChangeType } from '../../changelog.types.ts';
import { useMemo } from 'react';
import ComponentList from './_internal/ComponentList.tsx';

interface Props {
  changeTypeMapper?: Record<ChangeType, string>;
}

/**
 * Component which renders a minimal changelog list.
 *
 * The list is only ordered by creation.
 *
 * @param changeTypeMapper Overridable mapping of change types to displayable representations.
 */
export const MinimalChangelogList: React.FC<Props> = ({
  changeTypeMapper = ChangeTypeMap,
}) => {
  const { data } = useUpdateHiveContext();

  const componentChangelogs: ChangelogWithComponents[] | undefined =
    useMemo(() => {
      if (!data) {
        return undefined;
      }

      return ungroupedChangelogs(data);
    }, [data]);

  return (
    <>
      {componentChangelogs && (
        <ComponentList
          changelogs={componentChangelogs}
          changeTypeMapper={changeTypeMapper}
          typeColorResolver={getTypeColor}
          hideEntryType
        />
      )}
    </>
  );
};
