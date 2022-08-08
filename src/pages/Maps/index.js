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
          <Marker coordinate={{latitude:-21.351004, longitude: -46.526076}} tracksViewChanges={false}>
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
          ]} strokeWidth={2} strokeColor="rgba(202,164,125,1)" fillColor="rgba(202,164,125,0.3)" onPress={() => {setNomeSetorSelecionado("Depósito");setCoordenadasMarcador({latitude:-21.350924, longitude: -46.526269})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350924, longitude: -46.526269}} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(202,164,125,1)"}}>CEAD</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "celin1", latitude: -21.351093,longitude:-46.526470},
            {name: "celin2", latitude: -21.351045, longitude: -46.526673},
            {name: "celin3", latitude: -21.350821, longitude: -46.526583},
            {name: "celin4", latitude: -21.350867, longitude: -46.526423},
          ]} strokeWidth={2} strokeColor="rgba(89,224,25,1)" fillColor="rgba(89,224,25,0.3)" onPress={() => {setNomeSetorSelecionado("CELIN");setCoordenadasMarcador({latitude:-21.350957, longitude: -46.526553})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350957, longitude: -46.526553}} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(89,224,25,1)"}}>CELIN</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "deposito1", latitude: -21.350957, longitude: -46.526912},
            {name: "deposito2", latitude: -21.351001, longitude: -46.526692},
            {name: "deposito3", latitude: -21.350701, longitude: -46.526595},
            {name: "deposito4", latitude: -21.350627, longitude: -46.526826},
          ]} strokeWidth={2} strokeColor="rgba(98,204,225,1)" fillColor="rgba(98,204,225,0.3)" onPress={() => {setNomeSetorSelecionado("Depósito");setCoordenadasMarcador({latitude:-21.350772, longitude: -46.526763});navegaParaSobre()}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350772, longitude: -46.526763}} tracksViewChanges={false}>
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
          <Marker coordinate={{latitude:-21.350563, longitude: -46.527424}} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(208,39,237,1)"}}>Cozinha</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "infraTI1", latitude: -21.350554, longitude: -46.527725},
            {name: "infraTI2", latitude: -21.350428, longitude: -46.527697},
            {name: "infraTI3", latitude: -21.350475, longitude: -46.527533},
            {name: "infraTI4", latitude: -21.350577, longitude: -46.527574},
          ]} strokeWidth={2} strokeColor="rgba(109,149,37,1)" fillColor="rgba(109,149,37,0.2)" onPress={() => {setNomeSetorSelecionado("Infra TI");setCoordenadasMarcador({latitude:-21.350507, longitude: -46.527632})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.350507, longitude: -46.527632}} tracksViewChanges={false}>
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
          ]} strokeWidth={2} strokeColor="rgba(199,119,144,1)" fillColor="rgba(199,119,144,0.3)" onPress={() => {setNomeSetorSelecionado("Não Sei");setCoordenadasMarcador({latitude:-21.350117, longitude:-46.527776})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349599, longitude: -46.527905}} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(199,119,144,1)"}}>Jardinagem e Paisagismo</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "laboratorioSolos1", latitude: -21.349699, longitude: -46.528295},
            {name: "laboratorioSolos2", latitude: -21.349723, longitude: -46.528096},
            {name: "laboratorioSolos3", latitude: -21.349524, longitude: -46.528064},
            {name: "laboratorioSolos4", latitude: -21.349476, longitude: -46.528245},
          ]} strokeWidth={2} strokeColor="rgba(29,219,137,1)" fillColor="rgba(29,219,137,0.3)" onPress={() => {setNomeSetorSelecionado("Laboratório de Solos e Pedologia");setCoordenadasMarcador({latitude:-21.349602, longitude: -46.528163})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349602, longitude: -46.528163}} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(29,219,137,1)"}}>Laboratório de Solos</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "espacoMaker1", latitude: -21.349301, longitude:-46.528090},
            {name: "espacoMaker2", latitude: -21.349124, longitude:-46.528319},
            {name: "espacoMaker3", latitude: -21.349258, longitude:-46.528417},
            {name: "espacoMaker4", latitude: -21.349417, longitude:-46.528196},
          ]} strokeWidth={2} strokeColor="rgba(129,119,37,1)" fillColor="rgba(129,119,37,0.3)" onPress={() => {setNomeSetorSelecionado("Construção Espaço Maker");setCoordenadasMarcador({latitude:-21.349267, longitude:-46.528258})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349267, longitude: -46.528258}} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(129,119,37,1)"}}>Construção Espaço Maker</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "ginasioPoliesportivo1", latitude: -21.349314, longitude: -46.528620},
            {name: "ginasioPoliesportivo2", latitude: -21.349030, longitude: -46.529003},
            {name: "ginasioPoliesportivo3", latitude: -21.348818, longitude: -46.528825},
            {name: "ginasioPoliesportivo4", latitude: -21.349105, longitude: -46.528448},
          ]} strokeWidth={2} strokeColor="rgba(29,219,137,1)" fillColor="rgba(29,219,137,0.3)" onPress={() => {setNomeSetorSelecionado("Ginásio Poliesportivo");setCoordenadasMarcador({latitude:-21.349056, longitude: -46.528728})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349056, longitude: -46.528728}} tracksViewChanges={false}>
            <Text style={{fontSize:12,fontWeight:"bold",color:"rgba(29,219,137,1)"}}>Ginásio Poliesportivo</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "enfermaria1", latitude: -21.349494, longitude: -46.528671},
            {name: "enfermaria2", latitude: -21.349450, longitude: -46.528729},
            {name: "enfermaria3", latitude: -21.349351, longitude: -46.528635},
            {name: "enfermaria4", latitude: -21.349391, longitude: -46.528584},
          ]} strokeWidth={2} strokeColor="rgba(229,99,178,1)" fillColor="rgba(229,99,178,0.3)" onPress={() => {setNomeSetorSelecionado("Enfermaria");setCoordenadasMarcador({latitude: -21.349431, longitude: -46.528666})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349431, longitude: -46.528666}} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(229,99,178,1)"}}>Enfermaria</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "secretaria1", latitude: -21.349509, longitude:-46.528782},
            {name: "secretaria2", latitude: -21.349376, longitude:-46.528961},
            {name: "secretaria3", latitude: -21.349220, longitude:-46.528845},
            {name: "secretaria4", latitude: -21.349342, longitude:-46.528652},
          ]} strokeWidth={2} strokeColor="rgba(141,199,78,1)" fillColor="rgba(141,199,78,0.3)" onPress={() => {setNomeSetorSelecionado("Secretaria e Registros Acadêmicos");setCoordenadasMarcador({latitude: -21.349367, longitude: -46.528809})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349367, longitude: -46.528809}} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(141,199,78,1)"}}>Secretaria e Registros Acadêmicos</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "quadraEsportes1", latitude: -21.349390, longitude:-46.528992},
            {name: "quadraEsportes2", latitude: -21.349178, longitude:-46.528818},
            {name: "quadraEsportes3", latitude: -21.349054, longitude:-46.528989},
            {name: "quadraEsportes4", latitude: -21.349280, longitude:-46.529166},
          ]} strokeWidth={2} strokeColor="rgba(141,199,78,1)" fillColor="rgba(32,99,178,0.3)" onPress={() => {setNomeSetorSelecionado("Quadra de Esportes");setCoordenadasMarcador({latitude: -21.349222, longitude: -46.528979})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349222, longitude: -46.528979}} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(32,99,178,1)"}}>Quadra de Esportes</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "espacoConvivencia1", latitude: -21.349206, longitude:-46.529206},
            {name: "espacoConvivencia2", latitude: -21.349069, longitude:-46.529409},
            {name: "espacoConvivencia3", latitude: -21.348903, longitude:-46.529263},
            {name: "espacoConvivencia4", latitude: -21.349076, longitude:-46.529013},
          ]} strokeWidth={2} strokeColor="rgba(232,199,148,1)" fillColor="rgba(232,199,148,0.3)" onPress={() => {setNomeSetorSelecionado("Espaço de Convivência");setCoordenadasMarcador({latitude: -21.349057, longitude: -46.529237})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349057, longitude: -46.529237}} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(232,199,148,1)"}}>Espaço de Convivência</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "alojamentoA1", latitude: -21.349330, longitude:-46.529303},
            {name: "alojamentoA2", latitude: -21.349015, longitude:-46.529740},
            {name: "alojamentoA3", latitude: -21.349238, longitude:-46.529901},
            {name: "alojamentoA4", latitude: -21.349513, longitude:-46.529442},
          ]} strokeWidth={2} strokeColor="rgba(132,99,218,1)" fillColor="rgba(132,99,218,0.3)" onPress={() => {setNomeSetorSelecionado("Alojamento Masculino Bloco A");setCoordenadasMarcador({latitude: -21.349367, longitude: -46.528809})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349367, longitude: -46.528809}} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(132,99,218,1)"}}>Alojamento Masculino Bloco A</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "alojamentoB1", latitude: -21.349670, longitude:-46.529482},
            {name: "alojamentoB2", latitude: -21.349360, longitude:-46.529911},
            {name: "alojamentoB3", latitude: -21.349520, longitude:-46.530046},
            {name: "alojamentoB4", latitude: -21.349832, longitude:-46.529624},
          ]} strokeWidth={2} strokeColor="rgba(98,199,118,1)" fillColor="rgba(98,199,118,0.3)" onPress={() => {setNomeSetorSelecionado("Alojamento Masculino Bloco B");setCoordenadasMarcador({latitude: -21.349593, longitude: -46.529758})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.349593, longitude: -46.529758}} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(98,199,118,1)"}}>Alojamento Masculino Bloco B</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "alojamentoC1", latitude: -21.350102, longitude:-46.529708},
            {name: "alojamentoC2", latitude: -21.349787, longitude:-46.530182},
            {name: "alojamentoC3", latitude: -21.349970, longitude:-46.530311},
            {name: "alojamentoC4", latitude: -21.350280, longitude:-46.529871},
          ]} strokeWidth={2} strokeColor="rgba(241,46,89,1)" fillColor="rgba(241,46,89,0.3)" onPress={() => {setNomeSetorSelecionado("Alojamento Feminino Bloco C");setCoordenadasMarcador({latitude: -21.350047, longitude: -46.530021})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.350047, longitude: -46.530021}} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(241,46,89,1)"}}>Alojamento Feminino Bloco C</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "pn061", latitude: -21.348890, longitude:-46.529714},
            {name: "pn062", latitude: -21.348741, longitude:-46.529561},
            {name: "pn063", latitude: -21.348664, longitude:-46.529680},
            {name: "pn064", latitude: -21.348778, longitude:-46.529804},
          ]} strokeWidth={2} strokeColor="rgba(241,46,89,1)" fillColor="rgba(241,46,89,0.3)" onPress={() => {setNomeSetorSelecionado("PN 06");setCoordenadasMarcador({latitude: -21.348773, longitude: -46.529700})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348773, longitude: -46.529700}} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(241,46,89,1)"}}>PN 06</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "sae1", latitude: -21.348901, longitude:-46.529710},
            {name: "sae2", latitude: -21.348798, longitude:-46.529830},
            {name: "sae3", latitude: -21.348642, longitude:-46.529687},
            {name: "sae4", latitude: -21.348746, longitude:-46.529544},
          ]} strokeWidth={2} strokeColor="rgba(241,46,89,1)" fillColor="rgba(241,46,89,0.3)" onPress={() => {setNomeSetorSelecionado("Setor de Assistência ao Educando");setCoordenadasMarcador({latitude: -21.348773, longitude: -46.529700})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348773, longitude: -46.529700}} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(241,46,89,1)"}}>Setor de Assistência ao Educando</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "museu1", latitude: -21.348701, longitude:-46.529942},
            {name: "museu2", latitude: -21.348617, longitude:-46.530039},
            {name: "museu3", latitude: -21.348520, longitude:-46.529950},
            {name: "museu4", latitude: -21.348585, longitude:-46.529835},
          ]} strokeWidth={2} strokeColor="rgba(41,46,189,1)" fillColor="rgba(41,46,189,0.3)" onPress={() => {setNomeSetorSelecionado("Museu Histórico");setCoordenadasMarcador({latitude: -21.348615, longitude: -46.529924})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348615, longitude: -46.529924}} tracksViewChanges={false}>
            <Text style={{fontSize:6,fontWeight:"bold",color:"rgba(41,46,189,1)"}}>Museu Histórico</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "centroEstudosAmbientais1", latitude: -21.348380, longitude:-46.530373},
            {name: "centroEstudosAmbientais2", latitude: -21.348261, longitude:-46.530499},
            {name: "centroEstudosAmbientais3", latitude: -21.348161, longitude:-46.530375},
            {name: "centroEstudosAmbientais4", latitude: -21.348257, longitude:-46.530235},
          ]} strokeWidth={2} strokeColor="rgba(31,246,109,1)" fillColor="rgba(31,246,109,0.3)" onPress={() => {setNomeSetorSelecionado("CEAM");setCoordenadasMarcador({latitude: -21.348260, longitude: -46.530382})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348260, longitude: -46.530382}} tracksViewChanges={false}>
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
          ]} strokeWidth={2} strokeColor="rgba(202,164,125,1)" fillColor="rgba(202,164,125,0.3)" onPress={() => {setNomeSetorSelecionado("Horta");setCoordenadasMarcador({latitude: -21.348066, longitude: -46.530602})}} tappable={true} 
          />
          <Marker coordinate={{latitude: -21.348066, longitude: -46.530602}} tracksViewChanges={false}>
            <Text style={{fontSize:10,fontWeight:"bold",color:"rgba(202,164,125,1)"}}>CEAM</Text>
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
          
          
          
          
          
          
          
          
          
          <Polygon coordinates={[
            {name: "viveiroMuda1", latitude: -21.349585, longitude: -46.524114},
            {name: "viveiroMuda2", latitude: -21.349588, longitude: -46.523934},
            {name: "viveiroMuda3", latitude: -21.349487, longitude: -46.523935},
            {name: "viveiroMuda4", latitude: -21.349481, longitude: -46.524095},
          ]} strokeWidth={2} strokeColor="rgba(198,74,95,1)" fillColor="rgba(198,74,95,0.3)" onPress={() => {setNomeSetorSelecionado("Viveiro de Muda");setCoordenadasMarcador({latitude:-21.348876, longitude:-46.523163})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.349531, longitude:-46.524021}} tracksViewChanges={false}>
            <Text style={{fontSize:8,fontWeight:"bold",color:"rgba(198,74,95,1)"}} >Viveiro de Muda</Text>
          </Marker>
          <Polygon coordinates={[
            {name: "Z31", latitude: -21.349245, longitude: -46.523798},
            {name: "Z32", latitude: -21.349426, longitude: -46.523073},
            {name: "Z33", latitude: -21.348656, longitude: -46.522575},
            {name: "Z34", latitude: -21.348399, longitude: -46.523554},
          ]} strokeWidth={2} strokeColor="rgba(204,24,195,1)" fillColor="rgba(204,24,195,0.3)" onPress={() => {setNomeSetorSelecionado("Z3");setCoordenadasMarcador({latitude:-21.348956, longitude:-46.523222})}} tappable={true} 
          />
          <Marker coordinate={{latitude:-21.348956, longitude:-46.523222}} tracksViewChanges={false}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"rgba(204,24,195,1)"}}>Z3</Text>
          </Marker>
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