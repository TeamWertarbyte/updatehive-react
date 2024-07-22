import * as React from 'react';
import { useUpdateHiveContext } from '../ChangelogContext';
import { Box, CircularProgress, List, ListItem, Typography } from '@mui/joy';
import { Changelog, ChangeType } from '../../changelog.types.ts';
import {
  ChangeTypeMap,
  ComponentEntries,
  getTypeColor,
  mapChangelogByComponents,
} from '../changelog.util.ts';
import { useMemo } from 'react';

interface Props {
  changeTypeMapper?: Record<ChangeType, string>;
  typeColorResolver?: (type: ChangeType) => string;
}

interface ChangelogWithComponents {
  version: string;
  description?: string;

  entries: ComponentEntries[];
}

export const ChangelogList: React.FC<Props> = ({
  changeTypeMapper = ChangeTypeMap,
  typeColorResolver = getTypeColor,
}) => {
  const { loading, error, data } = useUpdateHiveContext();

  const changelogs: ChangelogWithComponents[] = useMemo(() => {
    if (!data) {
      return [];
    }

    const mapped: ChangelogWithComponents[] = [];

    data.forEach((changelog: Changelog) => {
      mapped.push({
        version: changelog.version,
        description: changelog.description,
        entries: mapChangelogByComponents(changelog),
      });
    });

    return mapped;
  }, [data]);

  return (
    <div>
      {error && !loading && data === undefined && (
        <Typography>
          Ein Fehler ist beim Laden der Versionshistorie aufgetreten!
        </Typography>
      )}
      {!error && loading && data === undefined && <CircularProgress />}
      {!error && !loading && data && (
        <div>
          {changelogs.map((changelog, index) => (
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
                        <Box
                          sx={() => ({ display: 'flex', flexDirection: 'row' })}
                        >
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
      )}
    </div>
  );
};
