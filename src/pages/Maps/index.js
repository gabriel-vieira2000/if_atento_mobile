import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, {Marker, Polygon} from "react-native-maps";

import { Layout, BottomNavigation , BottomNavigationTab, Icon, Button} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const mapIcon = (props) => (
  <Icon {...props} name='map-outline'/>
);

const infoIcon = (props) => (
  <Icon {...props} name='info-outline'/>
);

var setorSelecionado = "";

const Maps = () => {
  const [nomeSetor, setNomeSetor] = useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navegacao = useNavigation();
  const [coordenadasMarcador, setCoordenadasMarcador] = useState("");

  function navegaParaTela(tela){
    if(tela == "About"){
      navegacao.navigate("About");
    }else{
      navegacao.navigate("PathologyRegistry", {nomeSetor: nomeSetor});
    }    
  }

  function SetorSelecionado(props){
    return (
      <View style={styles.containerSetorSelecionado}>
        <Text style={styles.setor_selecionado}>{props.nomeSetor}</Text>
        <Button onPress={() => {navegaParaTela("PathologyRegistry")}}>REGISTRAR PATOLOGIA</Button>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <MapView style={styles.map} mapType="hybrid" minZoomLevel={17} maxZoomLevel={20} zoomTapEnabled={false} zoomControlEnabled={false} 
        initialRegion={{
          latitude: -21.350371,
          longitude: -46.528377,
          latitudeDelta: 0.002,
          longitudeDelta: 0.009,
        }}> 
          <Marker coordinate={coordenadasMarcador}/>
          <Polygon coordinates={[
            {name: "predioInfo1", latitude: -21.350482, longitude: -46.527217},
            {name: "predioInfo2", latitude: -21.350605, longitude: -46.526832},
            {name: "predioInfo3", latitude: -21.350980, longitude: -46.526956},
            {name: "predioInfo4", latitude: -21.350854, longitude: -46.527341},
          ]} strokeWidth={2} strokeColor="#000" fillColor="rgba(0,0,0,0.3)" onPress={() => {setNomeSetor("Prédio de Informática")}} tappable={true}
          />
          <Polygon coordinates={[
            {name: "refeitorio1", latitude: -21.350741, longitude: -46.527749},
            {name: "refeitorio2", latitude: -21.350576, longitude: -46.527698},
            {name: "refeitorio3", latitude: -21.350706, longitude: -46.527337},
            {name: "refeitorio4", latitude: -21.350843, longitude: -46.527359},
          ]} strokeWidth={2} strokeColor="#fff" fillColor="rgba(255,255,255,0.3)" onPress={() => {setNomeSetor("Refeitório");setCoordenadasMarcador({latitude:-21.350726, longitude:-46.527507})}} tappable={true}
          />
          <Polygon coordinates={[
            {name: "refeitorio1", latitude: -21.350247, longitude: -46.527686},
            {name: "refeitorio2", latitude: -21.350259, longitude: -46.527797},
            {name: "refeitorio3", latitude: -21.350030, longitude: -46.527855},
            {name: "refeitorio4", latitude: -21.350006, longitude: -46.527753},
          ]} strokeWidth={2} strokeColor="rgba(255,0,0,1)" fillColor="rgba(255,0,0,0.3)" onPress={() => {setNomeSetor("Cooperativa");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
        </MapView>
        
      <SetorSelecionado nomeSetor={nomeSetor}></SetorSelecionado>

      <Layout style={styles.footer} level="1">
        <BottomNavigation style={styles.menuInferior} selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
          <BottomNavigationTab style={styles.menuInferior} title='MAPA' icon={mapIcon}/>
          <BottomNavigationTab style={styles.menuInferior} title='SOBRE' icon={infoIcon} onPress={() => navegaParaTela("About")}/>
        </BottomNavigation>
      </Layout>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  containerSetorSelecionado: {
    flex: 1,
    zIndex: 2,
    width:300,
    height:150,
    backgroundColor: "green",
    bottom: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  setor_selecionado : {
    position: "absolute",
    bottom: 25,
    backgroundColor: "red",
    color: "white",
    zIndex: 2
  },
  footer: {
    bottom: 0,
    height: 130,
    width: Dimensions.get("window").width,
    backgroundColor: "#F0FED2",
    zIndex: 100,
  },
  menuInferior: {
    backgroundColor: "#F0FED2",
    color: "#247106"
  }
});

export default Maps;