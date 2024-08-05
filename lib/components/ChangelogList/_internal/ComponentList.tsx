import { Box, List, ListItem, Typography } from '@mui/joy';
import * as React from 'react';
import { ChangeType } from '../../../changelog.types.ts';
import { ChangelogWithComponents } from '../../changelog.util.ts';

interface Props {
  changelogs: ChangelogWithComponents[];
  changeTypeMapper: Record<ChangeType, string>;
  typeColorResolver: (type: ChangeType) => string;
}

const ComponentList: React.FC<Props> = ({
  changelogs,
  changeTypeMapper,
  typeColorResolver,
}) => {
  return (
    <>
      {changelogs.map((changelog, index) => (
        <div key={`changelogs-${index}`}>
          <Box sx={() => ({ mb: 1 })}>
            <Typography level="h3" sx={() => ({ mr: 1 })}>
              Version {changelog.version}
            </Typography>
            {changelog.description && (
              <Typography>{changelog.description}</Typography>
            )}
          </Box>
          {changelog.entries.map((entry) => (
            <div key={`changelogs-${index}-components-${entry.component}`}>
              {entry.component && (
                <Typography level="title-lg">{entry.component}</Typography>
              )}
              <List
                marker={'circle'}
                sx={() => ({ '--ListItem-minHeight': 20 })}
              >
                {entry.changelogs.map((entry, entryIndex) => (
                  <ListItem
                    sx={() => ({ p: 0 })}
                    key={`changelogs-${changelog.version}-entry-${entryIndex}`}
                  >
                    <Box sx={() => ({ display: 'flex', flexDirection: 'row' })}>
                      <Typography
                        level="title-sm"
                        sx={() => ({
                          mr: 1,
                          color: typeColorResolver(entry.changeType),
                        })}
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
      ))}
    </>
  );
};

export default ComponentList;
