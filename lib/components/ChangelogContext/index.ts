import { createContext, useContext } from "react";
import { Changelog, UpdateHiveHookResult } from "../../changelog.types.ts";

export const ChangelogContext = createContext<{
  loading: boolean;
  error?: string;
  data?: Changelog[];
}>({ loading: true });

export const useUpdateHiveContext: () => UpdateHiveHookResult = () => {
  const context = useContext(ChangelogContext);

  if (!context) {
    throw new Error(
      "useChangelogContext must be used within a ChangelogContainer",
    );
  }

  return context;
};
