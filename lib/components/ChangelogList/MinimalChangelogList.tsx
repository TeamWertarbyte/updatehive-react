import * as React from 'react';
import { useUpdateHiveContext } from '../ChangelogContext';
import { Box, List, ListItem, Typography } from '@mui/joy';
import { ChangeTypeMap } from '../changelog.util.ts';
import { ChangeType } from '../../changelog.types.ts';

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
        <div>
          {data.map((changelog, index) => (
            <div key={`changelog-${index}`}>
              <Box sx={() => ({ marginBottom: '8px' })}>
                <Typography level="h3" sx={() => ({ marginRight: '8px' })}>
                  Version {changelog.version}
                </Typography>
                {changelog.description && (
                  <Typography>{changelog.description}</Typography>
                )}
              </Box>
              <List
                marker={'circle'}
                sx={() => ({ '--ListItem-minHeight': 20 })}
              >
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
                      <Typography level="body-sm">
                        {entry.description}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
