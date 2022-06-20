import { Divider, TopNavigation, Layout } from "@ui-kitten/components";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Sobre = () => {
    return (
        <SafeAreaView style={{flex:1}}>
        <TopNavigation style={styles.barraTopo} title="Sobre" alignment="center"/>
        <Layout style={styles.container}>
            <View>
                <Text style={styles.textoSobrePesquisa}>Este Aplicativo faz parte da pesquisa entitulada "IF Atento: software de análise e visualização de dados de patologias nas construções em uma instituição de ensino a partir de um aplicativo de informação geográfica voluntária."</Text>
                <Text style={styles.textoContribuicao}>Por meio dos dados obtidos a partir desse aplicativo, pretende-se realizar uma análise dos mesmos de forma que ofereçam subsídios para tomadas de decisão em relação às patologias encontradas. Portanto, sua ajuda será de grande valia!</Text>
            </View>
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
        justifyContent:"space-evenly",
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
    conteudoInformacao:{
        color:"#247106",
        fontSize:16,
        fontWeight:"bold",
        paddingBottom:5,
    }

});

export default Sobre;