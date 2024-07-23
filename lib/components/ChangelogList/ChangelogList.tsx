import * as React from 'react';
import { useUpdateHiveContext } from '../ChangelogContext';
import { ChangeType } from '../../changelog.types.ts';
import { ChangeTypeMap, getTypeColor } from '../changelog.util.ts';
import ComponentList from './_internal/ComponentList.tsx';
import SimpleList from './_internal/SimpleList.tsx';
import { GroupBy } from './ChangelogList.types.ts';

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

  return (
    <div>
      {data &&
        (groupBy === GroupBy.COMPONENT ? (
          <ComponentList
            changelogs={data}
            changeTypeMapper={changeTypeMapper}
            typeColorResolver={typeColorResolver}
          />
        ) : (
          <SimpleList changelogs={data} changeTypeMapper={changeTypeMapper} />
        ))}
    </div>
  );
};
