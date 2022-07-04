import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Maps from "./pages/Maps";
import Sobre from "./pages/Sobre";
import RegistroPatologia from "./pages/RegistroPatologia";
import RegistroSalvo from "./pages/RegistroSalvo";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerTitle: "",
          headerTransparent: true,
        }}
      >
        <AppStack.Screen name="Home" key={"Home"} component={Home} />
        <AppStack.Screen name="Map" component={Maps} />
        <AppStack.Screen name="About" component={Sobre} />
        <AppStack.Screen name="PathologyRegistry" component={RegistroPatologia} />
        <AppStack.Screen name="SavedRegistry" component={RegistroSalvo} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

/*const MapsNavigator = () => {
  return (
    <NavigationContainer>
        <BottomNavigation>
          <BottomNavigationTab />
          <BottomNavigationTab />
        </BottomNavigation>
    </NavigationContainer>
  );
}*/

export default Routes;
