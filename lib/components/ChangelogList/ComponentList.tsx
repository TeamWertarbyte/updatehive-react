import { Box, List, ListItem, Typography } from '@mui/joy';
import * as React from 'react';
import { Changelog, ChangeType } from '../../changelog.types.ts';
import { useMemo } from 'react';
import {
  ComponentEntries,
  mapChangelogByComponents,
} from '../changelog.util.ts';

interface ChangelogWithComponents {
  version: string;
  description?: string;

  entries: ComponentEntries[];
}

interface Props {
  changelogs: Changelog[];
  changeTypeMapper: Record<ChangeType, string>;
  typeColorResolver: (type: ChangeType) => string;
}

const ComponentList: React.FC<Props> = ({
  changelogs,
  changeTypeMapper,
  typeColorResolver,
}) => {
  const componentChangelogs: ChangelogWithComponents[] = useMemo(() => {
    const mapped: ChangelogWithComponents[] = [];

    changelogs.forEach((changelog: Changelog) => {
      mapped.push({
        version: changelog.version,
        description: changelog.description,
        entries: mapChangelogByComponents(changelog),
      });
    });

    return mapped;
  }, [changelogs]);

  return (
    <div>
      {componentChangelogs.map((changelog, index) => (
        <div key={`changelog-${index}`}>
          <Box sx={() => ({ marginBottom: '8px' })}>
            <Typography level="h3" sx={() => ({ marginRight: '8px' })}>
              Version {changelog.version}
            </Typography>
            {changelog.description && (
              <Typography>{changelog.description}</Typography>
            )}
          </Box>
          {changelog.entries.map((entry) => (
            <>
              <Typography level="title-lg">{entry.component}</Typography>
              <List
                marker={'circle'}
                sx={() => ({ '--ListItem-minHeight': 20 })}
              >
                {entry.changelogs.map((entry, entryIndex) => (
                  <ListItem
                    sx={() => ({
                      padding: '0px',
                    })}
                    key={`changelog-${index}-entry-${entryIndex}`}
                  >
                    <Box sx={() => ({ display: 'flex', flexDirection: 'row' })}>
                      <Typography
                        level="title-sm"
                        sx={() => ({
                          marginRight: '8px',
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
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ComponentList;
