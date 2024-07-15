import {
  ChangelogContainer,
  MinimalChangelogList,
  useChangelogs,
} from '../lib';
import * as React from 'react';

export const App: React.FC = () => {
  const API_KEY = import.meta.env.VITE_UPDATEHIVE_API_KEY;
  const PRODUCT = import.meta.env.VITE_UPDATEHIVE_PRODUCT;
  const serviceURL = import.meta.env.VITE_UPDATEHIVE_URL;

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
    <div>
      <h1>UpdateHive - React Client Component</h1>
      <h3>Example using UpdateHive react hook</h3>
      <div>
        {loading || data === undefined ? (
          <div>Loading changelogs ...</div>
        ) : (
          <div>
            <div className="hook table" key={'header'}>
              <div className="hook div">Version</div>
              <div className="hook div">Description</div>
            </div>
            {data.map((changelog, index) => (
              <div className="hook table" key={`chanelog-${index}`}>
                <div className="hook div">{changelog.version}</div>
                <div className="hook div">{changelog.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h3>Example using UpdateHive react components</h3>
      <ChangelogContainer
        API_KEY={API_KEY}
        product={PRODUCT}
        config={{ url: serviceURL }}
      >
        <MinimalChangelogList />
      </ChangelogContainer>
    </div>
  );
};
