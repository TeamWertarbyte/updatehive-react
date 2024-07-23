import * as React from 'react';
import { Changelog, ChangeType } from '../../changelog.types.ts';
import { Box, List, ListItem, Typography } from '@mui/joy';
import { reorderChangelogs } from '../changelog.util.ts';
import { useMemo } from 'react';

interface Props {
  changeTypeMapper: Record<ChangeType, string>;
  changelogs: Changelog[];
}

const SimpleList: React.FC<Props> = ({ changelogs, changeTypeMapper }) => {
  const reorderedChangelogs = useMemo(() => {
    return reorderChangelogs(changelogs);
  }, [changelogs]);

  return (
    <div>
      {reorderedChangelogs.map((changelog, index) => (
        <div key={`changelog-${index}`}>
          <Box sx={() => ({ marginBottom: '8px' })}>
            <Typography level="h3" sx={() => ({ marginRight: '8px' })}>
              Version {changelog.version}
            </Typography>
            {changelog.description && (
              <Typography>{changelog.description}</Typography>
            )}
          </Box>
          <List marker={'circle'} sx={() => ({ '--ListItem-minHeight': 20 })}>
            {changelog.entries.map((entry, entryIndex) => (
              <ListItem
                sx={() => ({
                  padding: '0px',
                })}
                key={`changelog-${index}-entry-${entryIndex}`}
              >
                <Box sx={() => ({ display: 'flex', flexDirection: 'row' })}>
                  <Typography
                    level="title-sm"
                    sx={() => ({ marginRight: '8px' })}
                  >
                    {changeTypeMapper[entry.changeType]}
                  </Typography>
                  <Typography level="body-sm">{entry.description}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};

export default SimpleList;
