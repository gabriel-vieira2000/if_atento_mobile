import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon} from "@ui-kitten/components";

import { Maps } from '../src/pages/Maps';
import { Sobre } from '../src/pages/Sobre';
import Home from "./pages/Home";

const { Navigator, Screen } = createBottomTabNavigator();
const RootStack = createStackNavigator();

const mapIcon = (props) => (
    <Icon {...props} name='map-outline'/>
);
  
const infoIcon = (props) => (
    <Icon {...props} name='info-outline'/>
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
        <BottomNavigationTab style={styles.menuInferior} title='MAPA' icon={mapIcon}/>
        <BottomNavigationTab style={styles.menuInferior} title='SOBRE' icon={infoIcon}/>
    </BottomNavigation>
);

function TabNavigator() {
    return (
      <>
        <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
          <Screen name="Maps" component={Maps} />
          <Screen name="Sobre" component={Sobre} />
        </Navigator>
      </>
    );
}

function RootStackScreen() {
    return (
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
        }}
      >  
        <RootStack.Screen
          name="Maps"
          component={Maps}
          screenOptions={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Sobre"
          component={Sobre}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
}

export function AppNavigator() {
    return (
      <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
          </RootStack.Navigator>
      </NavigationContainer>
    );
}