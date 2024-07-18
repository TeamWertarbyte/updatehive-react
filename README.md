# UpdateHive - React Client component

Client side react components and hooks for interacting with the UpdateHive API. Working with and rendering changelogs
provided by UpdateHive in a standardized way across react applications.

## Installation

```
# npm
npm -i @wertarbyte/updatehive-react

# yarn
yarn add @wertarbyte/updatehive-react
```

## Usage

Either use the react hook and render the changelog yourself or let this library fetch and render the changelog for you.

For a more complete example, see the [App.tsx](./src/App.tsx) in the src directory.

### Hook

```tsx
import { useChangelog } from '@wertarbyte/updatehive-react';

const Changelog = () => {
  const { loading, error, changelog } = useChangelog({
    connection: {
      API_KEY,
    },
    changelogs: {
      product: PRODUCT_ID,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{changelog.title}</h1>
      <ul>
        {changelog.entries.map(entry => (
          <li key={entry.id}>{entry.version}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Component

```tsx
import { ChangelogContainer, MinimalChangelogList, } from '@wertarbyte/updatehive-react';

return (
  <ChangelogContainer
    API_KEY={API_KEY}
    product={PRODUCT}
    config={{ url: serviceURL }}
  >
    <MinimalChangelogList />
  </ChangelogContainer>
);
```

## Configuration

```tsx
/**
 * Configuration to retrieve changelogs from UpdateHive.
 *
 * @param connection
 *    API_KEY:        API_KEY to access UpdateHive public REST API.
 *    url:            Override the default URL to UpdateHive API.
 *
 * @param changelogs
 *    product:        Product ID to retrieve changelogs for.
 *    onlyLast:       Retrieve only the last changelog.
 */
export type UpdateHiveConfig = {
  connection: {
    API_KEY: string;
    url?: string;
  };
  changelogs: {
    product: string;
    onlyLast?: boolean;
  };
};
```