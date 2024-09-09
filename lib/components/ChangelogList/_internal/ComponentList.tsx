import { Box, Card, CardContent, Chip, Divider, Typography } from '@mui/joy';
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
                        flexDirection: 'column',
                        gap: 0.5,
                        alignItems: 'flex-start',
                      }}
                    >
                      <Typography level="body-sm">
                        {entry.description}
                      </Typography>
                      <Chip
                        sx={{
                          color: typeColorResolver(entry.changeType),
                        }}
                        variant={'outlined'}
                      >
                        {changeTypeMapper[entry.changeType]}
                      </Chip>
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
