import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapView, {Marker, Polygon} from "react-native-maps";

import { Layout, BottomNavigation , BottomNavigationTab, Icon} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from '../../services/api';

const mapIcon = (props) => (
  <Icon {...props} name='map-outline'/>
);

const infoIcon = (props) => (
  <Icon {...props} name='info-outline'/>
);

var setorSelecionado = "";

const Maps = ({route}) => {
  const [isLoading, setLoading] = useState(false);
  const [nomeSetorSelecionado, setNomeSetorSelecionado] = useState("");
  const [idSetorSelecionado, setIdSetorSelecionado] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navegacao = useNavigation();
  const [coordenadasMarcador, setCoordenadasMarcador] = useState("");
  const [setores, setSetores] = useState([]);
  const [irSobre, setIrSobre] = useState(false);

  {/*seEffect(() => {
    const {setores} = route.params;
    api.get('/setores').then(respostaAPI => {
      //console.log(respostaAPI.data)
      setSetores(respostaAPI.data);
  });
    setSetores(setores);
    console.log(setores.idSetor);
    console.log(setores.nomeSetor);
    setores.latitudeCentro = Number(setores.latitudeCentro);
    setores.longitudeCentro = Number(setores.longitudeCentro);
    console.log(setores.latitudeCentro);
    console.log(setores.longitudeCentro);
    console.log(setores.extremidadesSetoresTransformada);
    setLoading(false);
  }, []);*/}

  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  function navegaParaRegistroPatologia(){
    navegacao.navigate("PathologyRegistry", {nomeSetor: nomeSetorSelecionado, idSetor: idSetorSelecionado});    
  }

  function navegaParaSobre(){
    navegacao.navigate("About");
  }

  function geraCor(){
    return Math.floor(Math.random() * 256);
  }

  if(irSobre){
    navegaParaSobre();
  }

  function SetorSelecionado(props){
    return (
      <View style={styles.containerSetorSelecionado}>
        <Text style={styles.setor_selecionado}>Setor Selecionado: {props.nomeSetor}</Text>
        <Button title="REGISTRAR PATOLOGIA" style={styles.botaoRegistrarPatologia} onPress={() => {navegaParaRegistroPatologia()}} color="#247102" />
      </View>
    )
  }

  if(isLoading){
    return (
      <SafeAreaView style={{flex:1}}>
        <Text>Carregando....</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <MapView style={styles.map} mapType="hybrid" minZoomLevel={19} maxZoomLevel={20} zoomTapEnabled={false} zoomControlEnabled={false} toolbarEnabled={false}
        initialRegion={{
          latitude: -21.350384,
          longitude: -46.527697,
          latitudeDelta: 0.002,
          longitudeDelta: 0.009,
        }}> 
          {coordenadasMarcador.latitude != null ? <Marker coordinate={coordenadasMarcador}/> : null}
          {/*setores.map(setor => (
            <Polygon coordinates={setor.extremidadesSetoresTransformada} strokeWidth={2} strokeColor="#000" fillColor="rgba(0,0,0,0.3)" onPress={() => {setNomeSetorSelecionado(setor.nomeSetor); setCoordenadasMarcador({latitude:setor.latitudeCentro,longitude:setor.longitudeCentro})}} tappable={true}/> 
          ))}
          <Polygon coordinates={setores.extremidadesSetoresTransformada} strokeWidth={2} strokeColor="#000" fillColor="rgba(0,0,0,0.3)" 
          onPress={() => {
            setNomeSetorSelecionadoSelecionado(setores.nomeSetor); 
            setIdSetorSelecionado(setores.idSetor);
            setCoordenadasMarcador({latitude:setores.latitudeCentro, longitude:setores.longitudeCentro});}} 
          tappable={true}/>
          <Marker coordinate={{latitude:setores.latitudeCentro, longitude:setores.longitudeCentro}}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"#000"}}>{setores.nomeSetor}</Text>
          </Marker>
          */}
          <Polygon coordinates={[
            {name: "predioInfo1", latitude: -21.350814, longitude: -46.527310},
            {name: "predioInfo2", latitude: -21.350901, longitude: -46.526947},
            {name: "predioInfo3", latitude: -21.350689, longitude: -46.526891},
            {name: "predioInfo4", latitude: -21.350595, longitude: -46.527244},
          ]} strokeWidth={2} strokeColor="#000" fillColor="rgba(0,0,0,0.3)" onPress={() => {setNomeSetorSelecionado("Prédio de Informática"); setCoordenadasMarcador({latitude:-21.350741,longitude:-46.527102})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.350741, longitude:-46.527102}} onPress={() => {setNomeSetorSelecionado("Prédio de Informática"); setCoordenadasMarcador({latitude:-21.350741,longitude:-46.527102})}} tappable={true}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"#000"}}>Prédio da Informática</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "refeitorio1", latitude: -21.350741, longitude: -46.527749},
            {name: "refeitorio2", latitude: -21.350576, longitude: -46.527698},
            {name: "refeitorio3", latitude: -21.350706, longitude: -46.527337},
            {name: "refeitorio4", latitude: -21.350843, longitude: -46.527359},
          ]} strokeWidth={2} strokeColor="#fff" fillColor="rgba(255,255,255,0.3)" onPress={() => {setNomeSetorSelecionado("Refeitório");setCoordenadasMarcador({latitude:-21.350726, longitude:-46.527507})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.350726, longitude:-46.527507}} onPress={() => {setNomeSetorSelecionado("Refeitório");setCoordenadasMarcador({latitude:-21.350726, longitude:-46.527507})}} tappable={true}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"#fff"}}>Refeitório</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "cooperativa1", latitude: -21.350247, longitude: -46.527686},
            {name: "cooperativa2", latitude: -21.350259, longitude: -46.527797},
            {name: "cooperativa3", latitude: -21.350030, longitude: -46.527855},
            {name: "cooperativa4", latitude: -21.350006, longitude: -46.527753},
          ]} strokeWidth={2} strokeColor="rgba(255,0,0,1)" fillColor="rgba(255,0,0,0.2)" onPress={() => {setNomeSetorSelecionado("Cooperativa");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350117, longitude:-46.527776}} onPress={() => {setNomeSetorSelecionado("Cooperativa");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} >
            <Text style={{fontSize:11,fontWeight:"bold",color:"rgba(255,0,0,1)"}}>Cooperativa</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "predioH1", latitude: -21.350548, longitude: -46.528879},
            {name: "predioH2", latitude: -21.350719, longitude: -46.528075},
            {name: "predioH3", latitude: -21.350275, longitude: -46.527918},
            {name: "predioH4", latitude: -21.350070, longitude: -46.528726},
          ]} strokeWidth={2} strokeColor="rgba(0,0,255,1)" fillColor="rgba(0,0,255,0.2)" onPress={() => {setNomeSetorSelecionado("Prédio H");setCoordenadasMarcador({latitude:-21.350390, longitude: -46.528384})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350390, longitude: -46.528384}} onPress={() => {setNomeSetorSelecionado("Prédio H");setCoordenadasMarcador({latitude:-21.350390, longitude: -46.528384})}} tappable={true}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(0,0,255,1)"}}>Prédio H</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "direcao1", latitude: -21.351260, longitude: -46.528884},
            {name: "direcao2", latitude: -21.351194, longitude: -46.529198},
            {name: "direcao3", latitude: -21.350606, longitude: -46.528939},
            {name: "direcao4", latitude: -21.350658, longitude: -46.528706},
          ]} strokeWidth={2} strokeColor="rgba(0,255,0,1)" fillColor="rgba(0,255,0,0.3)" onPress={() => {setNomeSetorSelecionado("Direção do Campus");setCoordenadasMarcador({latitude:-21.351001,longitude:-46.528938})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.351001,longitude:-46.528938}} onPress={() => {setNomeSetorSelecionado("Direção do Campus");setCoordenadasMarcador({latitude:-21.351001,longitude:-46.528938})}} tappable={true} >
            <Text style={{fontSize:11,fontWeight:"bold",color:"rgba(0,255,0,1)"}}>Direção</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "cantina1", latitude: -21.349987, longitude: -46.527893},
            {name: "cantina2", latitude: -21.349921, longitude: -46.527729},
            {name: "cantina3", latitude: -21.349772, longitude: -46.527814},
            {name: "cantina4", latitude: -21.349813, longitude: -46.527968},
          ]} strokeWidth={2} strokeColor="rgba(202,146,30,1)" fillColor="rgba(202,146,30,0.1)" onPress={() => {setNomeSetorSelecionado("Cantina");setCoordenadasMarcador({latitude:-21.349861, longitude: -46.527852})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349861, longitude: -46.527852}} onPress={() => {setNomeSetorSelecionado("Cantina");setCoordenadasMarcador({latitude:-21.349861, longitude: -46.527852})}} tappable={true} >
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(202,146,30,1)"}}>Cantina</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "estacionamento1", latitude: -21.349971, longitude: -46.527160},
            {name: "estacionamento2", latitude: -21.350259, longitude: -46.527117},
            {name: "estacionamento3", latitude: -21.350346, longitude: -46.527532},
            {name: "estacionamento4", latitude: -21.350037, longitude: -46.527669},
          ]} strokeWidth={2} strokeColor="rgba(102,49,87,1)" fillColor="rgba(102,49,87,0.3)" onPress={() => {setNomeSetorSelecionado("Estacionamento");setCoordenadasMarcador({latitude:-21.350168, longitude: -46.527375})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350168, longitude: -46.527375}} onPress={() => {setNomeSetorSelecionado("Estacionamento");setCoordenadasMarcador({latitude:-21.350168, longitude: -46.527375})}} tappable={true} >
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(102,49,87,1)"}}>Estacionamento</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "infraTI1", latitude: -21.350554, longitude: -46.527725},
            {name: "infraTI2", latitude: -21.350428, longitude: -46.527697},
            {name: "infraTI3", latitude: -21.350475, longitude: -46.527533},
            {name: "infraTI4", latitude: -21.350577, longitude: -46.527574},
          ]} strokeWidth={2} strokeColor="rgba(109,149,37,1)" fillColor="rgba(109,149,37,0.2)" onPress={() => {setNomeSetorSelecionado("Infra TI");setCoordenadasMarcador({latitude:-21.350507, longitude: -46.527632})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350507, longitude: -46.527632}}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(109,149,37,1)"}}>Infra TI</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "cozinha1", latitude: -21.350526, longitude: -46.527242},
            {name: "cozinha2", latitude: -21.350466, longitude: -46.527525},
            {name: "cozinha3", latitude: -21.350587, longitude: -46.527563},
            {name: "cozinha4", latitude: -21.350685, longitude: -46.527299},
          ]} strokeWidth={2} strokeColor="rgba(208,39,237,1)" fillColor="rgba(208,39,237,0.3)" onPress={() => {setNomeSetorSelecionado("Setor de Alimentos");setCoordenadasMarcador({latitude:-21.350563, longitude: -46.527424})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350563, longitude: -46.527424}}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(208,39,237,1)"}}>Cozinha</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "laboratorioSolos1", latitude: -21.349699, longitude: -46.528295},
            {name: "laboratorioSolos2", latitude: -21.349723, longitude: -46.528096},
            {name: "laboratorioSolos3", latitude: -21.349524, longitude: -46.528064},
            {name: "laboratorioSolos4", latitude: -21.349476, longitude: -46.528245},
          ]} strokeWidth={2} strokeColor="rgba(29,219,137,1)" fillColor="rgba(29,219,137,0.3)" onPress={() => {setNomeSetorSelecionado("Laboratório de Solos e Pedologia");setCoordenadasMarcador({latitude:-21.349602, longitude: -46.528163})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349602, longitude: -46.528163}}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(29,219,137,1)"}}>Laboratório de Solos</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "jardinagemPaisagismo1", latitude: -21.349490, longitude: -46.528011},
            {name: "jardinagemPaisagismo2", latitude: -21.349474, longitude: -46.527859},
            {name: "jardinagemPaisagismo3", latitude: -21.349702, longitude: -46.527836},
            {name: "jardinagemPaisagismo4", latitude: -21.349719, longitude: -46.527970},
          ]} strokeWidth={2} strokeColor="rgba(199,119,144,1)" fillColor="rgba(199,119,144,0.3)" onPress={() => {setNomeSetorSelecionado("Não Sei");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349599, longitude: -46.527905}}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(199,119,144,1)"}}>Jardinagem e Paisagismo</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "deposito1", latitude: -21.350957, longitude: -46.526912},
            {name: "deposito2", latitude: -21.351001, longitude: -46.526692},
            {name: "deposito3", latitude: -21.350701, longitude: -46.526595},
            {name: "deposito4", latitude: -21.350627, longitude: -46.526826},
          ]} strokeWidth={2} strokeColor="rgba(98,204,225,1)" fillColor="rgba(98,204,225,0.3)" onPress={() => {setNomeSetorSelecionado("Depósito");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776});navegaParaSobre()}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "cead1", latitude: -21.351043, longitude: -46.526680},
            {name: "cead2", latitude: -21.351094, longitude: -46.526459},
            {name: "cead3", latitude: -21.350849, longitude: -46.526392},
            {name: "cead4", latitude: -21.350824, longitude: -46.526593},
          ]} strokeWidth={2} strokeColor="rgba(202,164,125,1)" fillColor="rgba(202,164,125,0.3)" onPress={() => {setNomeSetorSelecionado("CEAD");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
        </MapView>
      <SetorSelecionado nomeSetor={nomeSetorSelecionado}></SetorSelecionado>

      <Layout style={styles.footer} level="1">
        <BottomNavigation style={styles.menuInferior} selectedIndex={selectedIndex} onSelect={index => {setSelectedIndex(index);if(index == 1){navegaParaSobre();}}}>
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
    position:"absolute",
    bottom:40,
    flex: 1,
    zIndex: 2,
    width:"auto",
    height:"auto",
    backgroundColor: "green",
    bottom: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  setor_selecionado : {
    position: "absolute",
    bottom: 50,
    fontWeight:"bold",
    backgroundColor: "#F0FED2",
    color: "#247106",
    zIndex: 2,
    borderRadius:3,
    padding:5,
  },
  botaoRegistrarPatologia : {
    position:"absolute",
    bottom:60,
    zIndex:100,
    padding: 5,
    includeFontPadding:"true",
    fontSize:10,
    borderRadius:1000,
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