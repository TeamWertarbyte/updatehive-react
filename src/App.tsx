import { ChangelogContainer, useChangelogs } from "../lib";
import * as React from "react";

export const App: React.FC = () => {
  const API_KEY = import.meta.env.VITE_UPDATEHIVE_API_KEY;
  const PRODUCT = import.meta.env.VITE_UPDATEHIVE_PRODUCT;

  const { loading, error, data } = useChangelogs({
    connection: {
      API_KEY,
      url: "http://localhost:3000/api",
    },
    changelogs: {
      product: PRODUCT,
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
            <div className="hook table">
              <div className="hook div">Version</div>
              <div className="hook div">Description</div>
            </div>
            {data.map((changelog) => (
              <div className="hook table">
                <div className="hook div">{changelog.version}</div>
                <div className="hook div">{changelog.description}</div>
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
