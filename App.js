import Routes from "./src/routes";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json"; // <-- Import app theme

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Routes />
    </ApplicationProvider>
  );
}
