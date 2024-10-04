import * as React from 'react';
import { Box, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import {
  ChangelogContainer,
  ChangelogList,
  useChangelogs,
  ChangelogListBase,
  groupChangelogsByComponents,
  GroupBy,
} from '../dist/updatehive-react';

export const App: React.FC = () => {
  const API_KEY = import.meta.env.VITE_UPDATEHIVE_API_KEY as string;
  const PRODUCT = import.meta.env.VITE_UPDATEHIVE_PRODUCT as string;
  const serviceURL = import.meta.env.VITE_UPDATEHIVE_URL as string;

  const { loading, error, data } = useChangelogs({
    connection: {
      API_KEY,
      url: serviceURL,
    },
    changelogs: {
      product: PRODUCT,
    },
  });

  if (error) {
    console.error(error);
  }

  return (
    <Box>
      <h1>UpdateHive - React Client Component</h1>
      <h3>Examples using UpdateHive react components</h3>
      <Tabs>
        <TabList>
          <Tab>Hook</Tab>
          <Tab>Minimal</Tab>
          <Tab>ChangelogList</Tab>
          <Tab>Base</Tab>
        </TabList>
        <TabPanel value={0}>
          <h3>Example using UpdateHive react hook</h3>
          <div>
            {loading || error || data === undefined ? (
              <div>Loading changelogs ...</div>
            ) : (
              <div>
                <div className="hook table" key={'header'}>
                  <div className="hook div">Version</div>
                  <div className="hook div">Description</div>
                </div>
                {data.map((changelog, index) => (
                  <div className="hook table" key={`changelog-${index}`}>
                    <div className="hook div">{changelog.version}</div>
                    <div className="hook div">{changelog.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel value={1}>
          <ChangelogContainer
            API_KEY={API_KEY}
            product={PRODUCT}
            config={{ url: serviceURL }}
          >
            <ChangelogList groupBy={GroupBy.NONE} hideEntryType />
          </ChangelogContainer>
        </TabPanel>
        <TabPanel value={2}>
          <ChangelogContainer
            API_KEY={API_KEY}
            product={PRODUCT}
            config={{ url: serviceURL }}
          >
            <ChangelogList />
          </ChangelogContainer>
        </TabPanel>
        <TabPanel value={3}>
          <ChangelogListBase
            changelogs={data && groupChangelogsByComponents(data)}
          />
        </TabPanel>
      </Tabs>
    </Box>
  );
};
