import * as React from 'react';
import { useUpdateHiveContext } from '../ChangelogContext';
import { ChangeType } from '../../changelog.types.ts';
import {
  ChangelogWithComponents,
  ChangeTypeMap,
  getTypeColor,
  groupChangelogsByComponents,
  ungroupedChangelogs,
} from '../changelog.util.ts';
import ComponentList from './_internal/ComponentList.tsx';
import { GroupBy } from './ChangelogList.types.ts';
import { useMemo } from 'react';

interface Props {
  groupBy?: GroupBy;
  changeTypeMapper?: Record<ChangeType, string>;
  typeColorResolver?: (type: ChangeType) => string;
}

/**
 * Base component to render a list of changelogs.
 *
 * @param changeTypeMapper Overridable mapping of change types to displayable representations.
 * @param typeColorResolver Overridable function to resolve the color of a change type.
 * @param groupBy Group changelogs by component or show a simple list.
 * @constructor
 */
export const ChangelogList: React.FC<Props> = ({
  changeTypeMapper = ChangeTypeMap,
  typeColorResolver = getTypeColor,
  groupBy = GroupBy.COMPONENT,
}) => {
  const { data } = useUpdateHiveContext();

  const componentChangelogs: ChangelogWithComponents[] | undefined =
    useMemo(() => {
      if (!data) {
        return undefined;
      }

      if (groupBy === GroupBy.NONE) {
        return ungroupedChangelogs(data);
      }

      return groupChangelogsByComponents(data);
    }, [data, groupBy]);

  return (
    <>
      {componentChangelogs && (
        <ComponentList
          changelogs={componentChangelogs}
          changeTypeMapper={changeTypeMapper}
          typeColorResolver={typeColorResolver}
        />
      )}
    </>
  );
};
