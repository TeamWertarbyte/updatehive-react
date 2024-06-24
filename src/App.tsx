import { ChangelogContainer, useChangelogs } from "../lib";
import * as React from "react";

export const App: React.FC = () => {
  const API_KEY = import.meta.env.VITE_UPDATEHIVE_API_KEY;

  const { loading, error, data } = useChangelogs({
    connection: {
      API_KEY,
      url: "http://localhost:3000/api",
    },
    changelogs: {
      product: "66587d16c9f5d3bca4bc2b9d",
    },
  });

  console.log(loading, error, data);

  return (
    <div>
      <h1>UpdateHive - React Client Component</h1>
      <h3>UpdateHive Hook data</h3>
      <div>
        {loading || data === undefined ? (
          <div>Loading changelogs ...</div>
        ) : (
          <div>
            {data.map((changelog) => (
              <div className="hookTable">
                <div>{changelog.version}</div>
                <div>{changelog.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h3>UpdateHive react components</h3>
      <ChangelogContainer />
    </div>
  );
};
