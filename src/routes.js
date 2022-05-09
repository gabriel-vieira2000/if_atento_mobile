import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Maps from "./pages/Maps";
import About from "./pages/Sobre";

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
        <AppStack.Screen name="About" component={About} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
