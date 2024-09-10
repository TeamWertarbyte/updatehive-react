import { Box, Card, CardContent, Chip, Divider, Typography } from '@mui/joy';
import * as React from 'react';
import { ChangeType } from '../../../changelog.types.ts';
import { ChangelogWithComponents } from '../../changelog.util.ts';

interface Props {
  changelogs: ChangelogWithComponents[];
  changeTypeMapper: Record<ChangeType, string>;
  typeColorResolver: (type: ChangeType) => string;
  hideEntryType?: boolean;
}

const ComponentList: React.FC<Props> = ({
  changelogs,
  changeTypeMapper,
  typeColorResolver,
  hideEntryType = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {changelogs.map((changelog, index) => (
        <Card key={`changelogs-${index}`} variant={'soft'}>
          <Box sx={() => ({ mb: 1 })}>
            <Typography level="h1">Version {changelog.version}</Typography>
            <Typography level="h4" color={'neutral'}>
              {new Intl.DateTimeFormat('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(new Date(changelog.releaseDate))}
            </Typography>
            <Divider
              sx={{
                mt: 1,
                mb: 2,
                mx: -2,
              }}
            />
            {changelog.description && (
              <Typography color={'neutral'}>{changelog.description}</Typography>
            )}
          </Box>
          <CardContent
            sx={{
              gap: 2,
            }}
          >
            {changelog.entries.map((entry) => (
              <Card
                key={`changelogs-${index}-components-${entry.component}`}
                variant={'outlined'}
              >
                {entry.component && (
                  <>
                    <Typography level="title-lg">{entry.component}</Typography>
                    <Divider
                      sx={{
                        mx: -2,
                      }}
                    />
                  </>
                )}
                <CardContent
                  sx={{
                    gap: 2,
                  }}
                >
                  {entry.changelogs.map((entry, entryIndex) => (
                    <Box
                      key={`changelogs-${changelog.version}-entry-${entryIndex}`}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 0.5,
                        alignItems: 'baseline',
                      }}
                    >
                      <Typography level="body-sm" sx={{ flexGrow: 1 }}>
                        {entry.description}
                      </Typography>
                      {!hideEntryType && (
                        <Chip
                          sx={{
                            color: typeColorResolver(entry.changeType),
                            flexShrink: 0,
                            width: 'auto',
                          }}
                          variant={'outlined'}
                        >
                          {changeTypeMapper[entry.changeType]}
                        </Chip>
                      )}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ComponentList;
