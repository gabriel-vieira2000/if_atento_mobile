import { Divider, TopNavigation, Layout, BottomNavigation , BottomNavigationTab, Icon } from "@ui-kitten/components";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const mapIcon = (props) => (
    <Icon {...props} name='map-outline'/>
);
  
const infoIcon = (props) => (
    <Icon {...props} name='info-outline'/>
);

const Sobre = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const navegacao = useNavigation();
    function navegaParaTela() {
        navegacao.navigate("Map");
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <TopNavigation style={styles.barraTopo} title="Sobre" alignment="center"/>
        <Layout style={styles.container}>
            <View>
                <Text style={styles.textoSobrePesquisa}>Este Aplicativo faz parte da pesquisa entitulada "IF Atento: software de análise e visualização de dados de patologias nas construções em uma instituição de ensino a partir de um aplicativo de informação geográfica voluntária."</Text>
                <Text style={styles.textoContribuicao}>Por meio dos dados obtidos a partir desse aplicativo, pretende-se realizar uma análise dos mesmos de forma que ofereçam subsídios para tomadas de decisão em relação às patologias encontradas. Portanto, sua ajuda será de grande valia!</Text>
            </View>
            <Divider style={styles.divisor}/>
            <View style={styles.quadroInformacoes}>
                <Text style={styles.tituloInformacao}>Autor:</Text>
                <Text style={styles.conteudoInformacao}>Gabriel Vieira Cardoso</Text>
                <Text style={styles.tituloInformacao}>Orientador:</Text>
                <Text style={styles.conteudoInformacao}>Rodrigo César Evangelista</Text>
                <Text style={styles.tituloInformacao}>Curso:</Text>
                <Text style={styles.conteudoInformacao}>Bacharelado em Ciência da Computação</Text>
                <Text style={styles.tituloInformacao}>Instituição:</Text>
                <Text style={styles.conteudoInformacao}>IFSULDEMINAS - Campus Muzambinho</Text>
            </View>
        </Layout>

        <Layout style={styles.footer} level="1">
            <BottomNavigation style={styles.menuInferior} selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
                <BottomNavigationTab style={styles.menuInferior} title='MAPA' icon={mapIcon} onPress={navegaParaTela}/>
                <BottomNavigationTab style={styles.menuInferior} title='SOBRE' icon={infoIcon}/>
            </BottomNavigation>
        </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    barraTopo: {
        backgroundColor:"#C4F979",
        fontWeight:"bold",
    },

    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },

    textoSobrePesquisa: {
        color:'#247106',
        fontWeight: "bold",
        fontSize:18,
        paddingHorizontal:20,
        paddingVertical:20,
        textAlign:"center",
    },
    textoContribuicao:{
        color:'#247106',
        fontSize:16,
        paddingHorizontal:15,
        paddingVertical:20,
        textAlign:"center"
    },

    quadroInformacoes:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems: "flex-start",

        backgroundColor: "white",

        borderStyle:"solid",
        borderRadius:2,
        borderColor:"#247106",
        borderWidth:2,

        width:Dimensions.get("window").width - 30,
        maxHeight:250,
        padding:10,
    },
    tituloInformacao:{
        color:"#247106",
        fontSize:16,
        fontWeight:"bold",
        paddingTop:5,
    },
    divisor:{
        paddingVertical:40,
    },
    conteudoInformacao:{
        color:"#247106",
        fontSize:16,
        fontWeight:"bold",
        paddingBottom:5,
    },

    footer: {
        bottom: 0,
        height: "auto",
        width: Dimensions.get("window").width,
        backgroundColor: "white",
        zIndex: 100,
    },
    menuInferior: {
        backgroundColor: "#F0FED2",
        color: "#247106"
    }
});

export default Sobre;