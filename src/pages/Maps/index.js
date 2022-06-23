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

  function navegaParaRegistroPatologia(){
    navegacao.navigate("PathologyRegistry", {nomeSetor: nomeSetor});    
  }

  function navegaParaSobre(){
    navegacao.navigate("About");
  }

  function SetorSelecionado(props){
    return (
      <View style={styles.containerSetorSelecionado}>
        <Text style={styles.setor_selecionado}>Setor Selecionado: {props.nomeSetor}</Text>
        <Button onPress={() => {navegaParaRegistroPatologia()}}>REGISTRAR PATOLOGIA</Button>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <MapView style={styles.map} mapType="hybrid" minZoomLevel={19} maxZoomLevel={20} zoomTapEnabled={false} zoomControlEnabled={false} 
        initialRegion={{
          latitude: -21.350384,
          longitude: -46.527697,
          latitudeDelta: 0.002,
          longitudeDelta: 0.009,
        }}> 
          {coordenadasMarcador.latitude != null ? <Marker coordinate={coordenadasMarcador}/> : null}
          <Polygon coordinates={[
            {name: "predioInfo1", latitude: -21.350482, longitude: -46.527217},
            {name: "predioInfo2", latitude: -21.350605, longitude: -46.526832},
            {name: "predioInfo3", latitude: -21.350980, longitude: -46.526956},
            {name: "predioInfo4", latitude: -21.350854, longitude: -46.527341},
          ]} strokeWidth={2} strokeColor="#000" fillColor="rgba(0,0,0,0.3)" onPress={() => {setNomeSetor("Prédio de Informática"); setCoordenadasMarcador({latitude:-21.350741,longitude:-46.527102})}} tappable={true}
          />
          <Polygon coordinates={[
            {name: "refeitorio1", latitude: -21.350741, longitude: -46.527749},
            {name: "refeitorio2", latitude: -21.350576, longitude: -46.527698},
            {name: "refeitorio3", latitude: -21.350706, longitude: -46.527337},
            {name: "refeitorio4", latitude: -21.350843, longitude: -46.527359},
          ]} strokeWidth={2} strokeColor="#fff" fillColor="rgba(255,255,255,0.3)" onPress={() => {setNomeSetor("Refeitório");setCoordenadasMarcador({latitude:-21.350726, longitude:-46.527507})}} tappable={true}
          />
          <Polygon coordinates={[
            {name: "cooperativa1", latitude: -21.350247, longitude: -46.527686},
            {name: "cooperativa2", latitude: -21.350259, longitude: -46.527797},
            {name: "cooperativa3", latitude: -21.350030, longitude: -46.527855},
            {name: "cooperativa4", latitude: -21.350006, longitude: -46.527753},
          ]} strokeWidth={2} strokeColor="rgba(255,0,0,1)" fillColor="rgba(255,0,0,0.3)" onPress={() => {setNomeSetor("Cooperativa");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "predioH1", latitude: -21.350583, longitude: -46.528912},
            {name: "predioH2", latitude: -21.350795, longitude: -46.527941},
            {name: "predioH3", latitude: -21.350204, longitude: -46.527904},
            {name: "predioH4", latitude: -21.350040, longitude: -46.528735},
          ]} strokeWidth={2} strokeColor="rgba(0,0,255,1)" fillColor="rgba(0,0,255,0.3)" onPress={() => {setNomeSetor("Prédio H");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "direcao1", latitude: -21.351260, longitude: -46.528884},
            {name: "direcao2", latitude: -21.351194, longitude: -46.529198},
            {name: "direcao3", latitude: -21.350606, longitude: -46.528939},
            {name: "direcao4", latitude: -21.350658, longitude: -46.528706},
          ]} strokeWidth={2} strokeColor="rgba(0,255,0,1)" fillColor="rgba(0,255,0,0.3)" onPress={() => {setNomeSetor("Direção do Campus");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "cantina1", latitude: -21.349987, longitude: -46.527893},
            {name: "cantina2", latitude: -21.349921, longitude: -46.527729},
            {name: "cantina3", latitude: -21.349772, longitude: -46.527814},
            {name: "cantina4", latitude: -21.349813, longitude: -46.527968},
          ]} strokeWidth={2} strokeColor="rgba(202,146,30,1)" fillColor="rgba(202,146,30,0.3)" onPress={() => {setNomeSetor("Cantina");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "estacionamento1", latitude: -21.349971, longitude: -46.527160},
            {name: "estacionamento2", latitude: -21.350259, longitude: -46.527117},
            {name: "estacionamento3", latitude: -21.350346, longitude: -46.527532},
            {name: "estacionamento4", latitude: -21.350037, longitude: -46.527669},
          ]} strokeWidth={2} strokeColor="rgba(102,49,87,1)" fillColor="rgba(102,49,87,0.3)" onPress={() => {setNomeSetor("Estacionamento");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "infraTI1", latitude: -21.350554, longitude: -46.527725},
            {name: "infraTI2", latitude: -21.350428, longitude: -46.527697},
            {name: "infraTI3", latitude: -21.350475, longitude: -46.527533},
            {name: "infraTI4", latitude: -21.350577, longitude: -46.527574},
          ]} strokeWidth={2} strokeColor="rgba(109,149,37,1)" fillColor="rgba(109,149,37,0.3)" onPress={() => {setNomeSetor("Infra TI");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "setorAlimentos1", latitude: -21.350526, longitude: -46.527242},
            {name: "setorAlimentos2", latitude: -21.350466, longitude: -46.527525},
            {name: "setorAlimentos3", latitude: -21.350587, longitude: -46.527563},
            {name: "setorAlimentos4", latitude: -21.350685, longitude: -46.527299},
          ]} strokeWidth={2} strokeColor="rgba(208,39,237,1)" fillColor="rgba(208,39,237,0.3)" onPress={() => {setNomeSetor("Setor de Alimentos");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "laboratorioSolos1", latitude: -21.349699, longitude: -46.528295},
            {name: "laboratorioSolos2", latitude: -21.349723, longitude: -46.528096},
            {name: "laboratorioSolos3", latitude: -21.349524, longitude: -46.528064},
            {name: "laboratorioSolos4", latitude: -21.349476, longitude: -46.528245},
          ]} strokeWidth={2} strokeColor="rgba(29,219,137,1)" fillColor="rgba(29,219,137,0.3)" onPress={() => {setNomeSetor("Laboratório de Solos e Pedologia");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "nSei1", latitude: -21.349490, longitude: -46.528011},
            {name: "nSei2", latitude: -21.349474, longitude: -46.527859},
            {name: "nSei3", latitude: -21.349702, longitude: -46.527836},
            {name: "nSei4", latitude: -21.349719, longitude: -46.527970},
          ]} strokeWidth={2} strokeColor="rgba(199,119,144,1)" fillColor="rgba(199,119,144,0.3)" onPress={() => {setNomeSetor("Não Sei");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "deposito1", latitude: -21.350957, longitude: -46.526912},
            {name: "deposito2", latitude: -21.351001, longitude: -46.526692},
            {name: "deposito3", latitude: -21.350701, longitude: -46.526595},
            {name: "deposito4", latitude: -21.350627, longitude: -46.526826},
          ]} strokeWidth={2} strokeColor="rgba(98,204,225,1)" fillColor="rgba(98,204,225,0.3)" onPress={() => {setNomeSetor("Depósito");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776});navegaParaSobre()}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "cead1", latitude: -21.351043, longitude: -46.526680},
            {name: "cead2", latitude: -21.351094, longitude: -46.526459},
            {name: "cead3", latitude: -21.350849, longitude: -46.526392},
            {name: "cead4", latitude: -21.350824, longitude: -46.526593},
          ]} strokeWidth={2} strokeColor="rgba(202,164,125,1)" fillColor="rgba(202,164,125,0.3)" onPress={() => {setNomeSetor("CEAD");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />

        </MapView>
      <SetorSelecionado nomeSetor={nomeSetor}></SetorSelecionado>

      <Layout style={styles.footer} level="1">
        <BottomNavigation style={styles.menuInferior} selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
          <BottomNavigationTab style={styles.menuInferior} title='MAPA' icon={mapIcon}/>
          <BottomNavigationTab style={styles.menuInferior} title='SOBRE' icon={infoIcon} />
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
    fontWeight:"bold",
    backgroundColor: "#F0FED2",
    color: "#247106",
    zIndex: 2,
    borderRadius:3,
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