import { useNavigation } from "@react-navigation/native";
import { Layout, TopNavigation, Button } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";

const RegistroSalvo = () => {
    const navigation = useNavigation();
    const [patologias, setPatologias] = useState([]);

    useEffect(() => {
        api.get('patologias').then(respostaAPI => {
            setPatologias(respostaAPI.data);
        });
    }, []);

    return (
        <SafeAreaView style={{flex:1}}>
            <TopNavigation style={styles.barraTopo} title="REGISTRAR PATOLOGIA" alignment="center"/>
            <Layout style={styles.container}>
                <Text style={styles.texto}>Seu Registro foi armazenado com Sucesso!</Text>
                <Text style={styles.texto}>Agradecemos imensamente pelas informações prestadas!</Text>
                <Text style={styles.texto}>Clique abaixo em voltar para visualizar o mapa da instituição novamente e continuar contribuindo.</Text>
                <Button style={styles.botaoVoltar} onPress={() => navigation.navigate('Map')}>VOLTAR</Button>
            </Layout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    barraTopo:{
        backgroundColor:"#C4F979",
        fontWeight:"bold",
    },

    container: {
        flex:1,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems: "center",
        backgroundColor: "#F0FED2",
    },

    texto: {
        color:'#247106',
        fontWeight: "bold",
        fontSize:18,
        paddingVertical:20,
        textAlign:"center",
    },

    botaoVoltar:{
        alignSelf:"center",
        width:200,
    },
});

export default RegistroSalvo;