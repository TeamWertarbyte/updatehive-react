import * as React from 'react';
import { useUpdateHiveContext } from '../ChangelogContext';
import { ChangeType } from '../../changelog.types.ts';
import { ChangeTypeMap, getTypeColor } from '../changelog.util.ts';
import ComponentList from './ComponentList.tsx';
import SimpleList from './SimpleList.tsx';
import { GroupBy } from './ChangelogList.types.ts';

interface Props {
  groupBy?: GroupBy;
  changeTypeMapper?: Record<ChangeType, string>;
  typeColorResolver?: (type: ChangeType) => string;
}

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
