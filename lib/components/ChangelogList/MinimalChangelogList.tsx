import * as React from 'react';
import { useUpdateHiveContext } from '../ChangelogContext';
import { ChangeTypeMap } from '../changelog.util.ts';
import { ChangeType } from '../../changelog.types.ts';
import SimpleList from './_internal/SimpleList.tsx';

interface Props {
  changeTypeMapper?: Record<ChangeType, string>;
}

export const MinimalChangelogList: React.FC<Props> = ({
  changeTypeMapper = ChangeTypeMap,
}) => {
  const { data } = useUpdateHiveContext();

  return (
    <div>
      {data && (
        <SimpleList changeTypeMapper={changeTypeMapper} changelogs={data} />
      )}
    </div>
  );
};
