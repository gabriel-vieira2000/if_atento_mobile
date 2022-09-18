import React, {useState, useEffect} from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";

import api from '../../services/api';

const Home = () => {
  const navegacao = useNavigation();
  const [teste, setTeste] = useState("");

  function executaNavegacaoParaMapa() {
    navegacao.navigate("Map");
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Image
            style={styles.logoIf}
            resizeMode="center"
            source={require("../../assets/logo_if_atento.png")}
          />
        </View>
        <Text style={styles.textosMaiores}>Encontrou alguma patologia nas construções do Campus?</Text>
        <View style={styles.main}>
          <Text style={styles.textosMaiores}>Por gentileza, acesse o aplicativo por meio do botão abaixo e nos informe!</Text>
          <Button style={styles.botaoEntrar} appearance="filled" onPress={executaNavegacaoParaMapa}>
            ACESSAR
          </Button>
        </View>
        <Text style={styles.textoRodape}>Instituto Federal - Campus Muzambinho</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    padding: 30,
    backgroundColor: "#F0FED2",
    justifyContent: "center",
    alignItems:"center",
  },

  head: {
    flex: 1,
    padding: 20,
    alignItems:"center",
  },

  logoIf: {
    width: 350,
    height: 350,
    aspectRatio:1,
    resizeMode:"cover",
  },

  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
  },

  textosMaiores:{
    fontSize:20,
    fontWeight:"bold",
    color:"#247106",
    textAlign:"center",
    paddingVertical:10,
    paddingHorizontal:5,
  },
  textoRodape:{
    fontSize:11,
    fontWeight:"bold",
    color:"#247106",
  },

  botaoEntrar: {
    backgroundColor: "#247106",
    height:80,
    width:200,
    fontSize:18,
  },
});
export default Home;
