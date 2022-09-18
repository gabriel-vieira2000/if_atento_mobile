import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapView, {Marker, Polygon} from "react-native-maps";

import { Layout, BottomNavigation , BottomNavigationTab, Icon} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <MapView style={styles.map} mapType="hybrid" minZoomLevel={18} maxZoomLevel={20} zoomTapEnabled={false} zoomControlEnabled={true} toolbarEnabled={false}
        initialRegion={{
          latitude: -21.350384,
          longitude: -46.527697,
          latitudeDelta: 0.002,
          longitudeDelta: 0.009,
        }}> 
          {coordenadasMarcador.latitude != null ? <Marker coordinate={coordenadasMarcador}/> : null}
          <Polygon coordinates={[
            {name: "guarita1", latitude: -21.353305, longitude:-46.520623},
            {name: "guarita2", latitude: -21.353435, longitude:-46.520459},
            {name: "guarita3", latitude: -21.353312, longitude:-46.520367},
            {name: "guarita4", latitude: -21.353213, longitude:-46.520542},
          ]} strokeWidth={2} strokeColor="#000" fillColor="rgba(0,0,0,0.3)" onPress={() => {setNomeSetorSelecionado("Guarita"); setCoordenadasMarcador({latitude:-21.353301, longitude:-46.520492})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.353301, longitude:-46.520492}} onPress={() => {setNomeSetorSelecionado("Guarita"); setCoordenadasMarcador({latitude:-21.350741,longitude:-46.527102})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"#000"}}>Guarita</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "labCafe1", latitude: -21.350890, longitude:-46.522368},
            {name: "labCafe2", latitude: -21.351125, longitude:-46.520981},
            {name: "labCafe3", latitude: -21.352206, longitude:-46.521321},
            {name: "labCafe4", latitude: -21.351540, longitude:-46.522492},
          ]} strokeWidth={2} strokeColor="#fff" fillColor="rgba(255,255,255,0.3)" onPress={() => {setNomeSetorSelecionado("Laboratório de Cafeicultura"); setCoordenadasMarcador({latitude:-21.351623, longitude:-46.521730})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.351623, longitude:-46.521730}} onPress={() => {setNomeSetorSelecionado("Laboratório de Cafeicultura"); setCoordenadasMarcador({latitude:-21.351623, longitude:-46.521730})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"#fff"}}>Laboratório de Cafeicultura</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "predioCafe1", latitude: -21.351353, longitude:-46.522883},
            {name: "predioCafe2", latitude: -21.351331, longitude:-46.523152},
            {name: "predioCafe3", latitude: -21.351063, longitude:-46.523149},
            {name: "predioCafe4", latitude: -21.351080, longitude:-46.522868},
          ]} strokeWidth={2} strokeColor="rgba(193,55,210,1)" fillColor="rgba(193,55,210,0.3)" onPress={() => {setNomeSetorSelecionado("Prédio de Cafeicultura"); setCoordenadasMarcador({latitude:-21.351182, longitude:-46.523031})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.351182, longitude:-46.523031}} onPress={() => {setNomeSetorSelecionado("Prédio de Cafeicultura"); setCoordenadasMarcador({latitude:-21.351182, longitude:-46.523031})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:7,fontWeight:"bold",color:"rgba(143,55,210,1)"}}>Prédio de Cafeicultura</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "predioBio1", latitude: -21.351341, longitude:-46.523159},
            {name: "predioBio2", latitude: -21.351315, longitude:-46.523380},
            {name: "predioBio3", latitude: -21.351066, longitude:-46.523358},
            {name: "predioBio4", latitude: -21.351071, longitude:-46.523154},
          ]} strokeWidth={2} strokeColor="rgba(101,155,80,1)" fillColor="rgba(101,155,80,0.3)" onPress={() => {setNomeSetorSelecionado("Prédio de Biologia"); setCoordenadasMarcador({latitude:-21.351196, longitude:-46.523269})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.351196, longitude: -46.523269}} onPress={() => {setNomeSetorSelecionado("Prédio de Biologia"); setCoordenadasMarcador({latitude:-21.351196, longitude:-46.523269})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:7,fontWeight:"bold",color:"rgba(101,155,80,1)"}}>Prédio de Biologia</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "predioVet1", latitude: -21.351284, longitude:-46.523583},
            {name: "predioVet2", latitude: -21.351278, longitude:-46.523885},
            {name: "predioVet3", latitude: -21.350872, longitude:-46.523872},
            {name: "predioVet4", latitude: -21.350881, longitude:-46.523567},
          ]} strokeWidth={2} strokeColor="rgba(161,74,180,1)" fillColor="rgba(161,74,180,0.3)" onPress={() => {setNomeSetorSelecionado("Prédio de Mediciona Veterinária"); setCoordenadasMarcador({latitude:-21.351026, longitude:-46.523730})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.351026, longitude:-46.523730}} onPress={() => {setNomeSetorSelecionado("Prédio de Mediciona Veterinária"); setCoordenadasMarcador({latitude:-21.351026, longitude: -46.523730})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:7,fontWeight:"bold",color:"rgba(161,74,180,1)"}}>Prédio de Mediciona Veterinária</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "predioEngenhariaAgronomica1", latitude: -21.351276, longitude:-46.523939},
            {name: "predioEngenhariaAgronomica2", latitude: -21.351264, longitude:-46.524251},
            {name: "predioEngenhariaAgronomica3", latitude: -21.350870, longitude:-46.524215},
            {name: "predioEngenhariaAgronomica4", latitude: -21.350882, longitude:-46.523919},
          ]} strokeWidth={2} strokeColor="rgba(61,174,130,1)" fillColor="rgba(61,174,130,0.3)" onPress={() => {setNomeSetorSelecionado("Prédio de Engenharia Agronômica"); setCoordenadasMarcador({latitude:-21.351026, longitude:-46.524094})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.351026, longitude:-46.524094}} onPress={() => {setNomeSetorSelecionado("Prédio de Engenharia Agronômica"); setCoordenadasMarcador({latitude:-21.351026, longitude:-46.524094})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(61,174,130,1)"}}>Prédio de Engenharia Agronômica</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "labBiotecnologia1", latitude: -21.351284, longitude:-46.524335},
            {name: "labBiotecnologia2", latitude: -21.351255, longitude:-46.524623},
            {name: "labBiotecnologia3", latitude: -21.350924, longitude:-46.524626},
            {name: "labBiotecnologia4", latitude: -21.350932, longitude:-46.524336},
          ]} strokeWidth={2} strokeColor="rgba(143,114,200,1)" fillColor="rgba(143,114,200,0.3)" onPress={() => {setNomeSetorSelecionado("Laboratório de Biotecnologia"); setCoordenadasMarcador({latitude:-21.351074, longitude:-46.524483})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.351074, longitude:-46.524483}} onPress={() => {setNomeSetorSelecionado("Laboratório de Biotecnologia"); setCoordenadasMarcador({latitude:-21.351074, longitude:-46.524483})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(143,114,200,1)"}}>Laboratório de Biotecnologia</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "labBromatologiaAgua1", latitude: -21.351251, longitude:-46.524747},
            {name: "labBromatologiaAgua2", latitude: -21.351255, longitude:-46.524997},
            {name: "labBromatologiaAgua3", latitude: -21.350979, longitude:-46.524994},
            {name: "labBromatologiaAgua4", latitude: -21.350998, longitude:-46.524776},
          ]} strokeWidth={2} strokeColor="rgba(243,84,100,1)" fillColor="rgba(243,84,100,0.2)" onPress={() => {setNomeSetorSelecionado("Laboratório de Bromatologia e Água"); setCoordenadasMarcador({latitude:-21.351097, longitude:-46.524884})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.351097, longitude:-46.524884}} onPress={() => {setNomeSetorSelecionado("Laboratório de Bromatologia e Água"); setCoordenadasMarcador({latitude:-21.351097, longitude:-46.524884})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(243,84,100,1)"}}>Lab de Bromatologia e Água</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "Agroindustria1", latitude: -21.351283, longitude:-46.525060},
            {name: "Agroindustria2", latitude: -21.351238, longitude:-46.525746},
            {name: "Agroindustria3", latitude: -21.350814, longitude:-46.525612},
            {name: "Agroindustria4", latitude: -21.350863, longitude:-46.525068},
          ]} strokeWidth={2} strokeColor="rgba(43,184,150,1)" fillColor="rgba(43,184,150,0.2)" onPress={() => {setNomeSetorSelecionado("Agroindústria"); setCoordenadasMarcador({latitude:-21.351033, longitude:-46.525416})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.351033, longitude:-46.525416}} onPress={() => {setNomeSetorSelecionado("Agroindústria"); setCoordenadasMarcador({latitude:-21.351033, longitude:-46.525416})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(43,184,150,1)"}}>Agroindústria</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "nipe1", latitude: -21.350864, longitude: -46.526135},
            {name: "nipe2", latitude: -21.350894, longitude: -46.525970},
            {name: "nipe3", latitude: -21.351116, longitude: -46.526018},
            {name: "nipe4", latitude: -21.351083, longitude: -46.526186},
          ]} strokeWidth={2} strokeColor="rgba(198,74,95,1)" fillColor="rgba(198,74,95,0.3)" onPress={() => {setNomeSetorSelecionado("NIPE");setCoordenadasMarcador({latitude:-21.351004, longitude: -46.526076})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.351004, longitude: -46.526076}} onPress={() => {setNomeSetorSelecionado("NIPE");setCoordenadasMarcador({latitude:-21.351004, longitude: -46.526076})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(198,74,95,1)"}} >NIPE</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "biblioteca1", latitude: -21.351477, longitude: -46.526535},
            {name: "biblioteca2", latitude: -21.351701, longitude: -46.526583},
            {name: "biblioteca3", latitude: -21.351717, longitude: -46.526290},
            {name: "biblioteca4", latitude: -21.351509, longitude: -46.526269},
          ]} strokeWidth={2} strokeColor="rgba(198,74,95,1)" fillColor="rgba(198,74,95,0.3)" onPress={() => {setNomeSetorSelecionado("Biblioteca");setCoordenadasMarcador({latitude:-21.351591, longitude: -46.526453})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "cead1", latitude: -21.351101, longitude: -46.526230},
            {name: "cead2", latitude: -21.351054, longitude: -46.526401},
            {name: "cead3", latitude: -21.350753, longitude: -46.526312},
            {name: "cead4", latitude: -21.350805, longitude: -46.526134},
          ]} strokeWidth={2} strokeColor="rgba(202,164,125,1)" fillColor="rgba(202,164,125,0.3)" onPress={() => {setNomeSetorSelecionado("CEAD");setCoordenadasMarcador({latitude:-21.350924, longitude: -46.526269})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350924, longitude: -46.526269}} onPress={() => {setNomeSetorSelecionado("CEAD");setCoordenadasMarcador({latitude:-21.350924, longitude: -46.526269})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(202,164,125,1)"}}>CEAD</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "celin1", latitude: -21.351093,longitude:-46.526470},
            {name: "celin2", latitude: -21.351045, longitude: -46.526673},
            {name: "celin3", latitude: -21.350821, longitude: -46.526583},
            {name: "celin4", latitude: -21.350867, longitude: -46.526423},
          ]} strokeWidth={2} strokeColor="rgba(89,224,25,1)" fillColor="rgba(89,224,25,0.3)" onPress={() => {setNomeSetorSelecionado("CELIN");setCoordenadasMarcador({latitude:-21.350957, longitude: -46.526553})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350957, longitude: -46.526553}} onPress={() => {setNomeSetorSelecionado("CELIN");setCoordenadasMarcador({latitude:-21.350957, longitude: -46.526553})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(89,224,25,1)"}}>CELIN</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "deposito1", latitude: -21.350957, longitude: -46.526912},
            {name: "deposito2", latitude: -21.351001, longitude: -46.526692},
            {name: "deposito3", latitude: -21.350701, longitude: -46.526595},
            {name: "deposito4", latitude: -21.350627, longitude: -46.526826},
          ]} strokeWidth={2} strokeColor="rgba(98,204,225,1)" fillColor="rgba(98,204,225,0.3)" onPress={() => {setNomeSetorSelecionado("Depósito");setCoordenadasMarcador({latitude:-21.350772, longitude: -46.526763})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350772, longitude: -46.526763}} onPress={() => {setNomeSetorSelecionado("Depósito");setCoordenadasMarcador({latitude:-21.350772, longitude: -46.526763})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(98,204,225,1)"}}>Depósito</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "predioInfo1", latitude: -21.350814, longitude: -46.527310},
            {name: "predioInfo2", latitude: -21.350901, longitude: -46.526947},
            {name: "predioInfo3", latitude: -21.350689, longitude: -46.526891},
            {name: "predioInfo4", latitude: -21.350595, longitude: -46.527244},
          ]} strokeWidth={2} strokeColor="#000" fillColor="rgba(0,0,0,0.3)" onPress={() => {setNomeSetorSelecionado("Prédio de Informática"); setCoordenadasMarcador({latitude:-21.350741,longitude:-46.527102})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.350741, longitude:-46.527102}} onPress={() => {setNomeSetorSelecionado("Prédio de Informática"); setCoordenadasMarcador({latitude:-21.350741,longitude:-46.527102})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"#000"}}>Prédio da Informática</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "refeitorio1", latitude: -21.350741, longitude: -46.527749},
            {name: "refeitorio2", latitude: -21.350576, longitude: -46.527698},
            {name: "refeitorio3", latitude: -21.350706, longitude: -46.527337},
            {name: "refeitorio4", latitude: -21.350843, longitude: -46.527359},
          ]} strokeWidth={2} strokeColor="#fff" fillColor="rgba(255,255,255,0.3)" onPress={() => {setNomeSetorSelecionado("Refeitório");setCoordenadasMarcador({latitude:-21.350726, longitude:-46.527507})}} tappable={true}
          />
          <Marker coordinate={{latitude:-21.350726, longitude:-46.527507}} onPress={() => {setNomeSetorSelecionado("Refeitório");setCoordenadasMarcador({latitude:-21.350726, longitude:-46.527507})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"#fff"}}>Refeitório</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "cozinha1", latitude: -21.350526, longitude: -46.527242},
            {name: "cozinha2", latitude: -21.350466, longitude: -46.527525},
            {name: "cozinha3", latitude: -21.350587, longitude: -46.527563},
            {name: "cozinha4", latitude: -21.350685, longitude: -46.527299},
          ]} strokeWidth={2} strokeColor="rgba(208,39,237,1)" fillColor="rgba(208,39,237,0.3)" onPress={() => {setNomeSetorSelecionado("Setor de Alimentos");setCoordenadasMarcador({latitude:-21.350563, longitude: -46.527424})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350563, longitude: -46.527424}} onPress={() => {setNomeSetorSelecionado("Setor de Alimentos");setCoordenadasMarcador({latitude:-21.350563, longitude: -46.527424})}} tappable={true}  tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(208,39,237,1)"}}>Cozinha</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "infraTI1", latitude: -21.350554, longitude: -46.527725},
            {name: "infraTI2", latitude: -21.350428, longitude: -46.527697},
            {name: "infraTI3", latitude: -21.350475, longitude: -46.527533},
            {name: "infraTI4", latitude: -21.350577, longitude: -46.527574},
          ]} strokeWidth={2} strokeColor="rgba(109,149,37,1)" fillColor="rgba(109,149,37,0.2)" onPress={() => {setNomeSetorSelecionado("Infra TI");setCoordenadasMarcador({latitude:-21.350507, longitude: -46.527632})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350507, longitude: -46.527632}} onPress={() => {setNomeSetorSelecionado("Infra TI");setCoordenadasMarcador({latitude:-21.350507, longitude: -46.527632})}} tappable={true}  tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(109,149,37,1)"}}>Infra TI</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "direcao1", latitude: -21.351260, longitude: -46.528884},
            {name: "direcao2", latitude: -21.351194, longitude: -46.529198},
            {name: "direcao3", latitude: -21.350606, longitude: -46.528939},
            {name: "direcao4", latitude: -21.350658, longitude: -46.528706},
          ]} strokeWidth={2} strokeColor="rgba(0,255,0,1)" fillColor="rgba(0,255,0,0.3)" onPress={() => {setNomeSetorSelecionado("Direção do Campus");setCoordenadasMarcador({latitude:-21.351001,longitude:-46.528938})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.351001,longitude:-46.528938}} onPress={() => {setNomeSetorSelecionado("Direção do Campus");setCoordenadasMarcador({latitude:-21.351001,longitude:-46.528938})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"rgba(0,255,0,1)"}}>Direção</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "predioH1", latitude: -21.350548, longitude: -46.528879},
            {name: "predioH2", latitude: -21.350719, longitude: -46.528075},
            {name: "predioH3", latitude: -21.350275, longitude: -46.527918},
            {name: "predioH4", latitude: -21.350070, longitude: -46.528726},
          ]} strokeWidth={2} strokeColor="rgba(0,0,255,1)" fillColor="rgba(0,0,255,0.2)" onPress={() => {setNomeSetorSelecionado("Prédio H");setCoordenadasMarcador({latitude:-21.350390, longitude: -46.528384})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350390, longitude: -46.528384}} onPress={() => {setNomeSetorSelecionado("Prédio H");setCoordenadasMarcador({latitude:-21.350390, longitude: -46.528384})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(0,0,255,1)"}}>Prédio H</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "cooperativa1", latitude: -21.350247, longitude: -46.527686},
            {name: "cooperativa2", latitude: -21.350259, longitude: -46.527797},
            {name: "cooperativa3", latitude: -21.350030, longitude: -46.527855},
            {name: "cooperativa4", latitude: -21.350006, longitude: -46.527753},
          ]} strokeWidth={2} strokeColor="rgba(255,0,0,1)" fillColor="rgba(255,0,0,0.2)" onPress={() => {setNomeSetorSelecionado("Cooperativa");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350117, longitude:-46.527776}} onPress={() => {setNomeSetorSelecionado("Cooperativa");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:11,fontWeight:"bold",color:"rgba(255,0,0,1)"}}>Cooperativa</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "cantina1", latitude: -21.349987, longitude: -46.527893},
            {name: "cantina2", latitude: -21.349921, longitude: -46.527729},
            {name: "cantina3", latitude: -21.349772, longitude: -46.527814},
            {name: "cantina4", latitude: -21.349813, longitude: -46.527968},
          ]} strokeWidth={2} strokeColor="rgba(202,146,30,1)" fillColor="rgba(202,146,30,0.1)" onPress={() => {setNomeSetorSelecionado("Cantina");setCoordenadasMarcador({latitude:-21.349861, longitude: -46.527852})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349861, longitude: -46.527852}} onPress={() => {setNomeSetorSelecionado("Cantina");setCoordenadasMarcador({latitude:-21.349861, longitude: -46.527852})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(202,146,30,1)"}}>Cantina</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "jardinagemPaisagismo1", latitude: -21.349490, longitude: -46.528011},
            {name: "jardinagemPaisagismo2", latitude: -21.349474, longitude: -46.527859},
            {name: "jardinagemPaisagismo3", latitude: -21.349702, longitude: -46.527836},
            {name: "jardinagemPaisagismo4", latitude: -21.349719, longitude: -46.527970},
          ]} strokeWidth={2} strokeColor="rgba(199,119,144,1)" fillColor="rgba(199,119,144,0.3)" onPress={() => {setNomeSetorSelecionado("Jardim e Paisagismo");setCoordenadasMarcador({latitude:-21.349599, longitude: -46.527905})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349599, longitude: -46.527905}} onPress={() => {setNomeSetorSelecionado("Jardim e Paisagismo");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(199,119,144,1)"}}>Jardinagem e Paisagismo</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "laboratorioSolos1", latitude: -21.349699, longitude: -46.528295},
            {name: "laboratorioSolos2", latitude: -21.349723, longitude: -46.528096},
            {name: "laboratorioSolos3", latitude: -21.349524, longitude: -46.528064},
            {name: "laboratorioSolos4", latitude: -21.349476, longitude: -46.528245},
          ]} strokeWidth={2} strokeColor="rgba(29,219,137,1)" fillColor="rgba(29,219,137,0.3)" onPress={() => {setNomeSetorSelecionado("Laboratório de Solos e Pedologia");setCoordenadasMarcador({latitude:-21.349602, longitude: -46.528163})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349602, longitude: -46.528163}} onPress={() => {setNomeSetorSelecionado("Laboratório de Solos e Pedologia");setCoordenadasMarcador({latitude:-21.349602, longitude: -46.528163})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(29,219,137,1)"}}>Laboratório de Solos</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "espacoMaker1", latitude: -21.349301, longitude:-46.528090},
            {name: "espacoMaker2", latitude: -21.349124, longitude:-46.528319},
            {name: "espacoMaker3", latitude: -21.349258, longitude:-46.528417},
            {name: "espacoMaker4", latitude: -21.349417, longitude:-46.528196},
          ]} strokeWidth={2} strokeColor="rgba(129,119,37,1)" fillColor="rgba(129,119,37,0.3)" onPress={() => {setNomeSetorSelecionado("Construção Espaço Maker");setCoordenadasMarcador({latitude:-21.349267, longitude:-46.528258})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349267, longitude: -46.528258}} onPress={() => {setNomeSetorSelecionado("Construção Espaço Maker");setCoordenadasMarcador({latitude:-21.349267, longitude:-46.528258})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(129,119,37,1)"}}>Construção Espaço Maker</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "ginasioPoliesportivo1", latitude: -21.349314, longitude: -46.528620},
            {name: "ginasioPoliesportivo2", latitude: -21.349030, longitude: -46.529003},
            {name: "ginasioPoliesportivo3", latitude: -21.348818, longitude: -46.528825},
            {name: "ginasioPoliesportivo4", latitude: -21.349105, longitude: -46.528448},
          ]} strokeWidth={2} strokeColor="rgba(29,219,137,1)" fillColor="rgba(29,219,137,0.3)" onPress={() => {setNomeSetorSelecionado("Ginásio Poliesportivo");setCoordenadasMarcador({latitude:-21.349056, longitude: -46.528728})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349056, longitude: -46.528728}} onPress={() => {setNomeSetorSelecionado("Ginásio Poliesportivo");setCoordenadasMarcador({latitude:-21.349056, longitude: -46.528728})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(29,219,137,1)"}}>Ginásio Poliesportivo</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "enfermaria1", latitude: -21.349494, longitude: -46.528671},
            {name: "enfermaria2", latitude: -21.349450, longitude: -46.528729},
            {name: "enfermaria3", latitude: -21.349351, longitude: -46.528635},
            {name: "enfermaria4", latitude: -21.349391, longitude: -46.528584},
          ]} strokeWidth={2} strokeColor="rgba(229,99,178,1)" fillColor="rgba(229,99,178,0.3)" onPress={() => {setNomeSetorSelecionado("Enfermaria");setCoordenadasMarcador({latitude: -21.349431, longitude: -46.528666})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349431, longitude: -46.528666}} onPress={() => {setNomeSetorSelecionado("Enfermaria");setCoordenadasMarcador({latitude: -21.349431, longitude: -46.528666})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(229,99,178,1)"}}>Enfermaria</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "secretaria1", latitude: -21.349509, longitude:-46.528782},
            {name: "secretaria2", latitude: -21.349376, longitude:-46.528961},
            {name: "secretaria3", latitude: -21.349220, longitude:-46.528845},
            {name: "secretaria4", latitude: -21.349342, longitude:-46.528652},
          ]} strokeWidth={2} strokeColor="rgba(141,199,78,1)" fillColor="rgba(141,199,78,0.3)" onPress={() => {setNomeSetorSelecionado("Secretaria e Registros Acadêmicos");setCoordenadasMarcador({latitude: -21.349367, longitude: -46.528809})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349367, longitude: -46.528809}} onPress={() => {setNomeSetorSelecionado("Secretaria e Registros Acadêmicos");setCoordenadasMarcador({latitude: -21.349367, longitude: -46.528809})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(141,199,78,1)"}}>Secretaria e Registros Acadêmicos</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "quadraEsportes1", latitude: -21.349390, longitude:-46.528992},
            {name: "quadraEsportes2", latitude: -21.349178, longitude:-46.528818},
            {name: "quadraEsportes3", latitude: -21.349054, longitude:-46.528989},
            {name: "quadraEsportes4", latitude: -21.349280, longitude:-46.529166},
          ]} strokeWidth={2} strokeColor="rgba(141,199,78,1)" fillColor="rgba(32,99,178,0.3)" onPress={() => {setNomeSetorSelecionado("Quadra de Esportes");setCoordenadasMarcador({latitude: -21.349222, longitude: -46.528979})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349222, longitude: -46.528979}} onPress={() => {setNomeSetorSelecionado("Quadra de Esportes");setCoordenadasMarcador({latitude: -21.349222, longitude: -46.528979})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(32,99,178,1)"}}>Quadra de Esportes</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "espacoConvivencia1", latitude: -21.349206, longitude:-46.529206},
            {name: "espacoConvivencia2", latitude: -21.349069, longitude:-46.529409},
            {name: "espacoConvivencia3", latitude: -21.348903, longitude:-46.529263},
            {name: "espacoConvivencia4", latitude: -21.349076, longitude:-46.529013},
          ]} strokeWidth={2} strokeColor="rgba(232,199,148,1)" fillColor="rgba(232,199,148,0.3)" onPress={() => {setNomeSetorSelecionado("Espaço de Convivência");setCoordenadasMarcador({latitude: -21.349057, longitude: -46.529237})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349057, longitude: -46.529237}} onPress={() => {setNomeSetorSelecionado("Espaço de Convivência");setCoordenadasMarcador({latitude: -21.349057, longitude: -46.529237})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(232,199,148,1)"}}>Espaço de Convivência</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "alojamentoA1", latitude: -21.349330, longitude:-46.529303},
            {name: "alojamentoA2", latitude: -21.349015, longitude:-46.529740},
            {name: "alojamentoA3", latitude: -21.349238, longitude:-46.529901},
            {name: "alojamentoA4", latitude: -21.349513, longitude:-46.529442},
          ]} strokeWidth={2} strokeColor="rgba(132,99,218,1)" fillColor="rgba(132,99,218,0.3)" onPress={() => {setNomeSetorSelecionado("Alojamento Masculino Bloco A");setCoordenadasMarcador({latitude: -21.349367, longitude: -46.528809})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "alojamentoB1", latitude: -21.349670, longitude:-46.529482},
            {name: "alojamentoB2", latitude: -21.349360, longitude:-46.529911},
            {name: "alojamentoB3", latitude: -21.349520, longitude:-46.530046},
            {name: "alojamentoB4", latitude: -21.349832, longitude:-46.529624},
          ]} strokeWidth={2} strokeColor="rgba(98,199,118,1)" fillColor="rgba(98,199,118,0.3)" onPress={() => {setNomeSetorSelecionado("Alojamento Masculino Bloco B");setCoordenadasMarcador({latitude: -21.349593, longitude: -46.529758})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349593, longitude: -46.529758}} onPress={() => {setNomeSetorSelecionado("Alojamento Masculino Bloco B");setCoordenadasMarcador({latitude: -21.349593, longitude: -46.529758})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(98,199,118,1)"}}>Alojamento Masculino Bloco B</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "alojamentoC1", latitude: -21.350102, longitude:-46.529708},
            {name: "alojamentoC2", latitude: -21.349787, longitude:-46.530182},
            {name: "alojamentoC3", latitude: -21.349970, longitude:-46.530311},
            {name: "alojamentoC4", latitude: -21.350280, longitude:-46.529871},
          ]} strokeWidth={2} strokeColor="rgba(241,46,89,1)" fillColor="rgba(241,46,89,0.3)" onPress={() => {setNomeSetorSelecionado("Alojamento Feminino Bloco C");setCoordenadasMarcador({latitude: -21.350047, longitude: -46.530021})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.350047, longitude: -46.530021}} onPress={() => {setNomeSetorSelecionado("Alojamento Feminino Bloco C");setCoordenadasMarcador({latitude: -21.350047, longitude: -46.530021})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(241,46,89,1)"}}>Alojamento Feminino Bloco C</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "pn061", latitude: -21.348890, longitude:-46.529714},
            {name: "pn062", latitude: -21.348741, longitude:-46.529561},
            {name: "pn063", latitude: -21.348664, longitude:-46.529680},
            {name: "pn064", latitude: -21.348778, longitude:-46.529804},
          ]} strokeWidth={2} strokeColor="rgba(241,46,89,1)" fillColor="rgba(241,46,89,0.3)" onPress={() => {setNomeSetorSelecionado("PN 06");setCoordenadasMarcador({latitude: -21.348773, longitude: -46.529700})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348773, longitude: -46.529700}} onPress={() => {setNomeSetorSelecionado("PN 06");setCoordenadasMarcador({latitude: -21.348773, longitude: -46.529700})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(241,46,89,1)"}}>PN 06</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "sae1", latitude: -21.348561, longitude: -46.530109},
            {name: "sae2", latitude: -21.348431, longitude: -46.530264},
            {name: "sae3", latitude: -21.348308, longitude: -46.530146},
            {name: "sae4", latitude: -21.348422, longitude: -46.529964},
          ]} strokeWidth={2} strokeColor="rgba(103,46,89,1)" fillColor="rgba(103,46,89,0.3)" onPress={() => {setNomeSetorSelecionado("Setor de Assistência ao Educando");setCoordenadasMarcador({latitude: -21.348465, longitude: -46.530134})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348465, longitude: -46.530134}} onPress={() => {setNomeSetorSelecionado("Setor de Assistência ao Educando");setCoordenadasMarcador({latitude: -21.348465, longitude: -46.530134})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(103,46,89,1)"}}>SAE</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "museu1", latitude: -21.348701, longitude:-46.529942},
            {name: "museu2", latitude: -21.348617, longitude:-46.530039},
            {name: "museu3", latitude: -21.348520, longitude:-46.529950},
            {name: "museu4", latitude: -21.348585, longitude:-46.529835},
          ]} strokeWidth={2} strokeColor="rgba(41,46,189,1)" fillColor="rgba(41,46,189,0.3)" onPress={() => {setNomeSetorSelecionado("Museu Histórico");setCoordenadasMarcador({latitude: -21.348615, longitude: -46.529924})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348615, longitude: -46.529924}} onPress={() => {setNomeSetorSelecionado("Museu Histórico");setCoordenadasMarcador({latitude: -21.348615, longitude: -46.529924})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(41,46,189,1)"}}>Museu Histórico</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "centroEstudosAmbientais1", latitude: -21.348380, longitude:-46.530373},
            {name: "centroEstudosAmbientais2", latitude: -21.348261, longitude:-46.530499},
            {name: "centroEstudosAmbientais3", latitude: -21.348161, longitude:-46.530375},
            {name: "centroEstudosAmbientais4", latitude: -21.348257, longitude:-46.530235},
          ]} strokeWidth={2} strokeColor="rgba(31,246,109,1)" fillColor="rgba(31,246,109,0.3)" onPress={() => {setNomeSetorSelecionado("CEAM");setCoordenadasMarcador({latitude: -21.348260, longitude: -46.530382})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348260, longitude: -46.530382}} onPress={() => {setNomeSetorSelecionado("CEAM");setCoordenadasMarcador({latitude: -21.348260, longitude: -46.530382})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(31,246,109,1)"}}>CEAM</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "espacoEcumenico1", latitude: -21.348632, longitude:-46.529820},
            {name: "espacoEcumenico2", latitude: -21.348572, longitude:-46.529769},
            {name: "espacoEcumenico3", latitude: -21.348542, longitude:-46.529805},
            {name: "espacoEcumenico4", latitude: -21.348602, longitude:-46.529851},
          ]} strokeWidth={2} strokeColor="rgba(31,246,109,1)" fillColor="rgba(31,246,109,0.3)" onPress={() => {setNomeSetorSelecionado("Espaço Ecumênico");setCoordenadasMarcador({latitude: -21.348593, longitude: -46.529811})}} tappable={true} 
          />
          <Polygon coordinates={[
            {name: "horta1", latitude: -21.348164, longitude:-46.530583},
            {name: "horta2", latitude: -21.348062, longitude:-46.530475},
            {name: "horta3", latitude: -21.347962, longitude:-46.530613},
            {name: "horta4", latitude: -21.348051, longitude:-46.530701},
          ]} strokeWidth={2} strokeColor="rgba(202,164,125,1)" fillColor="rgba(202,164,125,0.2)" onPress={() => {setNomeSetorSelecionado("Horta");setCoordenadasMarcador({latitude: -21.348066, longitude: -46.530602})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348066, longitude: -46.530602}} onPress={() => {setNomeSetorSelecionado("Horta");setCoordenadasMarcador({latitude: -21.348066, longitude: -46.530602})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:14,fontWeight:"bold",color:"rgba(202,164,125,1)"}}>Horta</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "prefeituraEstacionamento1", latitude: -21.349180, longitude:-46.531074},
            {name: "prefeituraEstacionamento2", latitude: -21.348620, longitude:-46.530232},
            {name: "prefeituraEstacionamento3", latitude: -21.348895, longitude:-46.529899},
            {name: "prefeituraEstacionamento4", latitude: -21.349814, longitude:-46.530473},
          ]} strokeWidth={2} strokeColor="rgba(101,201,89,1)" fillColor="rgba(101,201,89,0.3)" onPress={() => {setNomeSetorSelecionado("Prefeitura e Estacionamento");setCoordenadasMarcador({latitude: -21.349036, longitude: -46.530171})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349036, longitude: -46.530171}} onPress={() => {setNomeSetorSelecionado("Prefeitura e Estacionamento");setCoordenadasMarcador({latitude: -21.349036, longitude: -46.530171})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(101,201,89,1)"}}>Prefeitura e Estacionamento</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "canil1", latitude: -21.348833, longitude:-46.530478},
            {name: "canil2", latitude: -21.348783, longitude:-46.530864},
            {name: "canil3", latitude: -21.348633, longitude:-46.530834},
            {name: "canil4", latitude: -21.348710, longitude:-46.530456},
          ]} strokeWidth={2} strokeColor="rgba(230,164,35,1)" fillColor="rgba(230,164,35,0.3)" onPress={() => {setNomeSetorSelecionado("Canil");setCoordenadasMarcador({latitude: -21.348760, longitude: -46.530627})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348760, longitude: -46.530627}} onPress={() => {setNomeSetorSelecionado("Canil");setCoordenadasMarcador({latitude: -21.348760, longitude: -46.530627})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(230,164,35,1)"}}>Canil</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "almoxarifado1", latitude: -21.348616, longitude:-46.530271},
            {name: "almoxarifado2", latitude: -21.348531, longitude:-46.530376},
            {name: "almoxarifado3", latitude: -21.348481, longitude:-46.530317},
            {name: "almoxarifado4", latitude: -21.348566, longitude:-46.530218},
          ]} strokeWidth={2} strokeColor="rgba(110,164,65,1)" fillColor="rgba(110,164,65,0.3)" onPress={() => {setNomeSetorSelecionado("Almoxarifado");setCoordenadasMarcador({latitude: -21.348544, longitude: -46.530291})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348544, longitude: -46.530291}} onPress={() => {setNomeSetorSelecionado("Almoxarifado");setCoordenadasMarcador({latitude: -21.348544, longitude: -46.530291})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(110,164,65,1)"}}>Almoxarifado</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "lavanderia1", latitude: -21.348546, longitude:-46.530471},
            {name: "lavanderia2", latitude: -21.348392, longitude:-46.530652},
            {name: "lavanderia3", latitude: -21.348275, longitude:-46.530546},
            {name: "lavanderia4", latitude: -21.348434, longitude:-46.530370},
          ]} strokeWidth={2} strokeColor="rgba(220,50,178,1)" fillColor="rgba(220,50,178,0.3)" onPress={() => {setNomeSetorSelecionado("Lavanderia");setCoordenadasMarcador({latitude:-21.348415, longitude: -46.530525})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.348415, longitude: -46.530525}} onPress={() => {setNomeSetorSelecionado("Lavanderia");setCoordenadasMarcador({latitude:-21.348415, longitude: -46.530525})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(220,50,178,1)"}}>Lavanderia</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "abatedouroFabricaRacao1", latitude: -21.348256, longitude:-46.530981},
            {name: "abatedouroFabricaRacao2", latitude: -21.348451, longitude:-46.530652},
            {name: "abatedouroFabricaRacao3", latitude: -21.348266, longitude:-46.530585},
            {name: "abatedouroFabricaRacao4", latitude: -21.348073, longitude:-46.530814},
          ]} strokeWidth={2} strokeColor="rgba(110,64,135,1)" fillColor="rgba(110,64,135,0.3)" onPress={() => {setNomeSetorSelecionado("Abatedouro e Fábrica de Ração");setCoordenadasMarcador({latitude: -21.348230, longitude: -46.530779})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348230, longitude: -46.530779}} onPress={() => {setNomeSetorSelecionado("Abatedouro e Fábrica de Ração");setCoordenadasMarcador({latitude: -21.348230, longitude: -46.530779})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(110,64,135,1)"}}>Abatedouro e Fábrica de Ração</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "proeja1", latitude: -21.347928, longitude:-46.530872},
            {name: "proeja2", latitude: -21.347751, longitude:-46.531266},
            {name: "proeja3", latitude: -21.347636, longitude:-46.531199},
            {name: "proeja4", latitude: -21.347815, longitude:-46.530802},
          ]} strokeWidth={2} strokeColor="rgba(118,214,85,1)" fillColor="rgba(118,214,85,0.3)" onPress={() => {setNomeSetorSelecionado("PROEJA");setCoordenadasMarcador({latitude: -21.347781, longitude: -46.531045})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.347781, longitude: -46.531045}} onPress={() => {setNomeSetorSelecionado("PROEJA");setCoordenadasMarcador({latitude: -21.347781, longitude: -46.531045})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(118,214,85,1)"}}>PROEJA</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "predioEdificacoes1", latitude: -21.348373, longitude:-46.531155},
            {name: "predioEdificacoes2", latitude: -21.348288, longitude:-46.531297},
            {name: "predioEdificacoes3", latitude: -21.347948, longitude:-46.531125},
            {name: "predioEdificacoes4", latitude: -21.348020, longitude:-46.530965},
          ]} strokeWidth={2} strokeColor="rgba(58,164,195,1)" fillColor="rgba(58,164,195,0.3)" onPress={() => {setNomeSetorSelecionado("Prédio de Edificações");setCoordenadasMarcador({latitude: -21.348166, longitude: -46.531130})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348166, longitude: -46.531130}} onPress={() => {setNomeSetorSelecionado("Prédio de Edificações");setCoordenadasMarcador({latitude: -21.348166, longitude: -46.531130})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(58,164,195,1)"}}>Prédio de Edificações</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "hospVet1", latitude: -21.347677, longitude:-46.531622},
            {name: "hospVet2", latitude: -21.347914, longitude:-46.531145},
            {name: "hospVet3", latitude: -21.348306, longitude:-46.531319},
            {name: "hospVet4", latitude: -21.348396, longitude:-46.531154},
            {name: "hospVet5", latitude: -21.348713, longitude:-46.531323},
            {name: "hospVet6", latitude: -21.348199, longitude:-46.532559},
            {name: "hospVet7", latitude: -21.347894, longitude:-46.532382},
            {name: "hospVet8", latitude: -21.347677, longitude:-46.531622},
          ]} strokeWidth={2} strokeColor="rgba(140,164,175,1)" fillColor="rgba(140,164,175,0.3)" onPress={() => {setNomeSetorSelecionado("Hospital Veterinário");setCoordenadasMarcador({latitude: -21.348241, longitude: -46.531639})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348241, longitude: -46.531639}} onPress={() => {setNomeSetorSelecionado("Hospital Veterinário");setCoordenadasMarcador({latitude: -21.348241, longitude: -46.531639})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:16,fontWeight:"bold",color:"rgba(140,164,175,1)"}}>Hospital Veterinário</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "casaMoradoresZ31", latitude: -21.347420, longitude:-46.532516},
            {name: "casaMoradoresZ32", latitude: -21.347385, longitude:-46.532682},
            {name: "casaMoradoresZ33", latitude: -21.347237, longitude:-46.532607},
            {name: "casaMoradoresZ34", latitude: -21.347305, longitude:-46.532441},
          ]} strokeWidth={2} strokeColor="rgba(210,203,115,1)" fillColor="rgba(210,203,115,0.3)" onPress={() => {setNomeSetorSelecionado("Casa dos Moradores Z3");setCoordenadasMarcador({latitude: -21.347332, longitude: -46.532552})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.347332, longitude: -46.532552}} onPress={() => {setNomeSetorSelecionado("Casa dos Moradores Z3");setCoordenadasMarcador({latitude: -21.347332, longitude: -46.532552})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(210,203,115,1)"}}>Casa dos Moradores Z3</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "Z31", latitude: -21.347237, longitude:-46.533479},
            {name: "Z32", latitude: -21.346958, longitude:-46.533425},
            {name: "Z33", latitude: -21.347084, longitude:-46.532909},
            {name: "Z34", latitude: -21.347364, longitude:-46.533004},
          ]} strokeWidth={2} strokeColor="rgba(59,203,175,1)" fillColor="rgba(59,203,175,0.3)" onPress={() => {setNomeSetorSelecionado("Setor de Zootecnia 3");setCoordenadasMarcador({latitude: -21.347332, longitude: -46.532552})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.347100, longitude: -46.533207}} onPress={() => {setNomeSetorSelecionado("Setor de Zootecnia 3");setCoordenadasMarcador({latitude: -21.347332, longitude: -46.532552})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(59,203,175,1)"}}>Setor de Zootecnia 3</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "salaPolpaFruta1", latitude: -21.347155, longitude:-46.533636},
            {name: "salaPolpaFruta2", latitude: -21.347108, longitude:-46.533756},
            {name: "salaPolpaFruta3", latitude: -21.346988, longitude:-46.533692},
            {name: "salaPolpaFruta4", latitude: -21.347001, longitude:-46.533606},
          ]} strokeWidth={2} strokeColor="rgba(198,74,95,1)" fillColor="rgba(198,74,95,0.3)" onPress={() => {setNomeSetorSelecionado("Sala de Polpa de Fruta");setCoordenadasMarcador({latitude: -21.347058, longitude: -46.533669})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.347058, longitude: -46.533669}} onPress={() => {setNomeSetorSelecionado("Sala de Polpa de Fruta");setCoordenadasMarcador({latitude: -21.347058, longitude: -46.533669})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(198,74,95,1)"}}>Sala de Polpa de Fruta</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "fristal1", latitude: -21.347058, longitude:-46.534143},
            {name: "fristal2", latitude: -21.346969, longitude:-46.535007},
            {name: "fristal3", latitude: -21.346777, longitude:-46.534974},
            {name: "fristal4", latitude: -21.346891, longitude:-46.534092},
          ]} strokeWidth={2} strokeColor="rgba(232,199,148,1)" fillColor="rgba(232,199,148,0.3)" onPress={() => {setNomeSetorSelecionado("FRISTAL");setCoordenadasMarcador({latitude:-21.346920, longitude:-46.534559})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.346920, longitude:-46.534559}} onPress={() => {setNomeSetorSelecionado("FRISTAL");setCoordenadasMarcador({latitude:-21.346920, longitude:-46.534559})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(232,199,148,1)"}}>FRISTAL</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "granjaFrangoCorte1", latitude: -21.347357, longitude:-46.531851},
            {name: "granjaFrangoCorte2", latitude: -21.346772, longitude:-46.532863},
            {name: "granjaFrangoCorte3", latitude: -21.346670, longitude:-46.532766},
            {name: "granjaFrangoCorte4", latitude: -21.347247, longitude:-46.531771},
          ]} strokeWidth={2} strokeColor="rgba(232,199,148,1)" fillColor="rgba(232,199,148,0.3)" onPress={() => {setNomeSetorSelecionado("Granja de Frango de Corte");setCoordenadasMarcador({latitude:-21.346998, longitude: -46.532345})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.346998, longitude: -46.532345}} onPress={() => {setNomeSetorSelecionado("Granja de Frango de Corte");setCoordenadasMarcador({latitude:-21.346998, longitude: -46.532345})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(232,199,148,1)"}}>Granja de Frango de Corte</Text>
          </Marker>   
          <Polygon coordinates={[
            {name: "silo1", latitude: -21.347005, longitude:-46.532916},
            {name: "silo2", latitude: -21.346945, longitude:-46.533081},
            {name: "silo3", latitude: -21.346842, longitude:-46.533021},
            {name: "silo4", latitude: -21.346908, longitude:-46.532863},
          ]} strokeWidth={2} strokeColor="rgba(31,246,109,1)" fillColor="rgba(31,246,109,0.3)" onPress={() => {setNomeSetorSelecionado("Silo");setCoordenadasMarcador({latitude:-21.346928, longitude: -46.532962})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.346928, longitude: -46.532962}} onPress={() => {setNomeSetorSelecionado("Silo");setCoordenadasMarcador({latitude:-21.346928, longitude: -46.532962})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(31,246,109,1)"}}>Silo</Text>
          </Marker> 
          <Polygon coordinates={[
            {name: "casaMoradoresZ11", latitude: -21.347083, longitude:-46.531996},
            {name: "casaMoradoresZ12", latitude: -21.347003, longitude:-46.532135},
            {name: "casaMoradoresZ13", latitude: -21.346908, longitude:-46.532052},
            {name: "casaMoradoresZ14", latitude: -21.346981, longitude:-46.531934},
          ]} strokeWidth={2} strokeColor="rgba(41,46,189,1)" fillColor="rgba(41,46,189,0.3)" onPress={() => {setNomeSetorSelecionado("Casa dos Moradores Z1");setCoordenadasMarcador({latitude:-21.347001, longitude: -46.532031})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.347001, longitude: -46.532031}} onPress={() => {setNomeSetorSelecionado("Casa dos Moradores Z1");setCoordenadasMarcador({latitude:-21.347001, longitude: -46.532031})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(41,46,189,1)"}}>Casa dos Moradores Z1</Text>
          </Marker> 
          <Polygon coordinates={[
            {name: "granjaGalinhaPostura1", latitude: -21.346858, longitude:-46.532039},
            {name: "granjaGalinhaPostura2", latitude: -21.346771, longitude:-46.532001},
            {name: "granjaGalinhaPostura3", latitude: -21.346306, longitude:-46.532927},
            {name: "granjaGalinhaPostura4", latitude: -21.346396, longitude:-46.532975},
          ]} strokeWidth={2} strokeColor="rgba(0,255,0,1)" fillColor="rgba(0,255,0,0.3)" onPress={() => {setNomeSetorSelecionado("Granja de Galinha de Postura");setCoordenadasMarcador({latitude:-21.346556, longitude: -46.532522})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.346556, longitude: -46.532522}} onPress={() => {setNomeSetorSelecionado("Granja de Galinha de Postura");setCoordenadasMarcador({latitude:-21.346556, longitude: -46.532522})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(0,255,0,1)"}}>Granja de Galinha de Postura</Text>
          </Marker>  
          <Polygon coordinates={[
            {name: "salaAulaZ11", latitude: -21.346551, longitude:-46.531832},
            {name: "salaAulaZ12", latitude: -21.346503, longitude:-46.532009},
            {name: "salaAulaZ13", latitude: -21.346411, longitude:-46.531972},
            {name: "salaAulaZ14", latitude: -21.346456, longitude:-46.531803},
          ]} strokeWidth={2} strokeColor="rgba(255,255,0,1)" fillColor="rgba(255,255,0,0.3)" onPress={() => {setNomeSetorSelecionado("Sala de Aula Z1");setCoordenadasMarcador({latitude:-21.346482, longitude:-46.531907})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.346482, longitude:-46.531907}} onPress={() => {setNomeSetorSelecionado("Sala de Aula Z1");setCoordenadasMarcador({latitude:-21.346482, longitude:-46.531907})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(255,255,0,1)"}}>Sala de Aula Z1</Text>
          </Marker>  
          <Polygon coordinates={[
            {name: "cunicultura1", latitude: -21.346319, longitude:-46.531865},
            {name: "cunicultura2", latitude: -21.346406, longitude:-46.531578},
            {name: "cunicultura3", latitude: -21.346311, longitude:-46.531519},
            {name: "cunicultura4", latitude: -21.346219, longitude:-46.531827},
          ]} strokeWidth={2} strokeColor="rgba(0,255,255,1)" fillColor="rgba(0,255,255,0.3)" onPress={() => {setNomeSetorSelecionado("Cunicultura");setCoordenadasMarcador({latitude:-21.346312, longitude: -46.531695})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.346312, longitude: -46.531695}} onPress={() => {setNomeSetorSelecionado("Cunicultura");setCoordenadasMarcador({latitude:-21.346312, longitude: -46.531695})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(0,255,255,1)"}}>Cunicultura</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "caprinoOvino1", latitude: -21.346389, longitude:-46.532390},
            {name: "caprinoOvino2", latitude: -21.346094, longitude:-46.533007},
            {name: "caprinoOvino3", latitude: -21.345996, longitude:-46.532948},
            {name: "caprinoOvino4", latitude: -21.346286, longitude:-46.532355},
          ]} strokeWidth={2} strokeColor="rgba(255,0,255,1)" fillColor="rgba(255,0,255,0.3)" onPress={() => {setNomeSetorSelecionado("Caprino e Ovino");setCoordenadasMarcador({latitude:-21.346183, longitude:-46.532696})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.346183, longitude:-46.532696}} onPress={() => {setNomeSetorSelecionado("Caprino e Ovino");setCoordenadasMarcador({latitude:-21.346183, longitude:-46.532696})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(255,0,255,1)"}}>Caprino e Ovino</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "curralManejo1", latitude: -21.346275, longitude:-46.532264},
            {name: "curralManejo2", latitude: -21.346230, longitude:-46.532371},
            {name: "curralManejo3", latitude: -21.346183, longitude:-46.532339},
            {name: "curralManejo4", latitude: -21.346225, longitude:-46.532237},
          ]} strokeWidth={2} strokeColor="rgba(255,255,255,1)" fillColor="rgba(255,255,255,0.3)" onPress={() => {setNomeSetorSelecionado("Curral de Manejo");setCoordenadasMarcador({latitude: -21.346226, longitude: -46.532305})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.346226, longitude: -46.532305}} onPress={() => {setNomeSetorSelecionado("Curral de Manejo");setCoordenadasMarcador({latitude: -21.346226, longitude: -46.532305})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(255,255,255,1)"}}>Curral de Manejo</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "viveiroMuda1", latitude: -21.349585, longitude: -46.524114},
            {name: "viveiroMuda2", latitude: -21.349588, longitude: -46.523934},
            {name: "viveiroMuda3", latitude: -21.349487, longitude: -46.523935},
            {name: "viveiroMuda4", latitude: -21.349481, longitude: -46.524095},
          ]} strokeWidth={2} strokeColor="rgba(198,74,95,1)" fillColor="rgba(198,74,95,0.3)" onPress={() => {setNomeSetorSelecionado("Viveiro de Muda");setCoordenadasMarcador({latitude:-21.349533, longitude:-46.524023})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349533, longitude:-46.524023}} onPress={() => {setNomeSetorSelecionado("Viveiro de Muda");setCoordenadasMarcador({latitude:-21.349533, longitude:-46.524023})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(198,74,95,1)"}} >Viveiro de Muda</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "Z21", latitude: -21.349245, longitude: -46.523798},
            {name: "Z22", latitude: -21.349426, longitude: -46.523073},
            {name: "Z23", latitude: -21.348656, longitude: -46.522575},
            {name: "Z24", latitude: -21.348399, longitude: -46.523554},
          ]} strokeWidth={2} strokeColor="rgba(204,24,195,1)" fillColor="rgba(204,24,195,0.3)" onPress={() => {setNomeSetorSelecionado("Setor de Zootecnia 2");setCoordenadasMarcador({latitude:-21.348956, longitude:-46.523222})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.348956, longitude:-46.523222}} onPress={() => {setNomeSetorSelecionado("Setor de Zootecnia 2");setCoordenadasMarcador({latitude:-21.348956, longitude:-46.523222})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"rgba(204,24,195,1)"}}>Setor de Zootecnia 2</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "CECAES1", latitude: -21.356860, longitude: -46.519006},
            {name: "CECAES2", latitude: -21.355723, longitude: -46.518102},
            {name: "CECAES3", latitude: -21.355347, longitude: -46.518789},
            {name: "CECAES4", latitude: -21.356448, longitude: -46.519525},
          ]} strokeWidth={2} strokeColor="rgba(255,255,255,1)" fillColor="rgba(255,255,255,0.3)" onPress={() => {setNomeSetorSelecionado("CECAES");setCoordenadasMarcador({latitude:-21.356185, longitude:-46.518963})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.356185, longitude:-46.518963}} onPress={() => {setNomeSetorSelecionado("CECAES");setCoordenadasMarcador({latitude:-21.356185, longitude:-46.518963})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(255,255,255,1)"}}>CECAES</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "estacionamento1", latitude: -21.349971, longitude: -46.527160},
            {name: "estacionamento2", latitude: -21.350259, longitude: -46.527117},
            {name: "estacionamento3", latitude: -21.350346, longitude: -46.527532},
            {name: "estacionamento4", latitude: -21.350037, longitude: -46.527669},
          ]} strokeWidth={2} strokeColor="rgba(102,49,87,1)" fillColor="rgba(102,49,87,0.3)" onPress={() => {setNomeSetorSelecionado("Estacionamento");setCoordenadasMarcador({latitude:-21.350168, longitude: -46.527375})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350168, longitude: -46.527375}} onPress={() => {setNomeSetorSelecionado("Estacionamento");setCoordenadasMarcador({latitude:-21.350168, longitude: -46.527375})}} tappable={true} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(102,49,87,1)"}}>Estacionamento</Text>
          </Marker>
        </MapView>

      <SetorSelecionado nomeSetor={nomeSetorSelecionado}></SetorSelecionado>

      <Layout style={styles.footer} level="1">
        <BottomNavigation style={styles.menuInferior} selectedIndex={0} onSelect={index => {setSelectedIndex(index);if(index == 1){navegaParaSobre();}}}>
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