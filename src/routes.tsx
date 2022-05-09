import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Mapa from './pages/Mapa';
import Sobre from './pages/Sobre';

const AppStack = createStackNavigator();

const Rotas = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{
                headerTitle: '',
                headerTransparent: true
            }}>
                <AppStack.Screen name="Home" key={"Home"} component={Home}/>
                <AppStack.Screen name="Mapa" component={Mapa}/>
                <AppStack.Screen name="Sobre" component={Sobre}/>

            </AppStack.Navigator>
        </NavigationContainer>

    );
}

export default Rotas;