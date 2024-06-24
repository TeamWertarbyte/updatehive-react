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
    <>
      <div>UpdateHive - React Client Component</div>
      <ChangelogContainer />
    </>
  );
};
