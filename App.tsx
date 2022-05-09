import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import {  } from 'expo';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu';

import Rotas from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  }); 
  
  if (!fontsLoaded){
    return <Text> Fonte não carregou</Text>
  }

  return (
    <>
      <StatusBar backgroundColor='#000' translucent />
      <Rotas />
    </>
  );
}

