import Routes from "./src/routes";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from "./custom-theme.json"; // <-- Import app theme

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Routes />
      </ApplicationProvider>
    </>
  );
}
