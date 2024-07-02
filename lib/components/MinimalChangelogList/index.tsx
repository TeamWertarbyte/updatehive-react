import * as React from 'react';
import { useContext } from 'react';
import { ChangelogContext } from '../ChangelogContext';
import { Box, CircularProgress, List, ListItem, Typography } from '@mui/joy';
import { ChangeType } from '../../changelog.types.ts';

const ChangeTypeMap: Record<ChangeType, string> = {
  [ChangeType.FEATURE]: '[Neu]',
  [ChangeType.IMPROVEMENT]: '[Angegepasst]',
  [ChangeType.FIX]: '[Behoben]',
  [ChangeType.NOTE]: '[Notiz]',
  [ChangeType.BREAKING]: '[Geändertes Verhalten]',
  [ChangeType.KNOWNISSUE]: '[Bekanntes Problem]',
  [ChangeType.REMOVED]: '[Entfernt]',
};

interface Props {
  changeTypeMapper?: Record<ChangeType, string>;
}

export const MinimalChangelogList: React.FC<Props> = ({
  changeTypeMapper = ChangeTypeMap,
}) => {
  const { loading, error, data } = useContext(ChangelogContext);

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
