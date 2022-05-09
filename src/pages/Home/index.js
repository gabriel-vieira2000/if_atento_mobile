import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@ui-kitten/components";

const Home = () => {
  const navegacao = useNavigation();

  function executaNavegacaoParaMapa() {
    navegacao.navigate("Map");
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image
          style={styles.logoIf}
          resizeMode="contain"
          source={require("../../assets/logo_if_muz.png")}
        />
        <Text> IF Atento </Text>
      </View>
      <View style={styles.main}>
        <Button appearance="filled" onPress={executaNavegacaoParaMapa}>
          Clique Aqui!
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f0f0f5",
  },

  head: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  logoIf: {
    width: 350,
    height: 450,
  },

  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  botaoEntrar: {
    backgroundColor: "#77dd77",
  },
});
export default Home;
