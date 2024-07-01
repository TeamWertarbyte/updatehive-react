import * as React from "react";
import { useChangelogs } from "../../changelog.hook.ts";
import { ChangelogContext } from "../ChangelogContext";

interface Props {
  API_KEY: string;
  product: string;
  config?: {
    url?: string;
    onlyLast?: boolean;
  };
  children: React.ReactNode;
}

export const ChangelogContainer: React.FC<Props> = ({
  API_KEY,
  product,
  config,
  children,
}) => {
  const { loading, error, data } = useChangelogs({
    connection: {
      API_KEY,
      url: config?.url || "http://localhost:3000/api",
    },
    changelogs: {
      product,
      onlyLast: config?.onlyLast,
    },
  });

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <ChangelogContext.Provider value={{ loading, error, data }}>
        {children}
      </ChangelogContext.Provider>
    </div>
  );
};
