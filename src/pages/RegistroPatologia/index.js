import { useNavigation } from "@react-navigation/native";
import { Layout, TopNavigation, Button, Select, IndexPath, SelectItem, Radio, RadioGroup } from "@ui-kitten/components";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";

const RegistroPatologia = ({route}) => {
    const navegacao = useNavigation();

    const {nomeSetor} = route.params;

    const [tipoPatologia, setTipoPatologia] = useState(new IndexPath(0));
    const tiposPatologias = ["Rachadura", "Infiltração"];

    const [tempoPatologia, setTempoPatologia] = useState(new IndexPath(0));
    const temposPatologias = ["Primeira Vez que Vi", "Comecei a ver recentemente (< 1 ano)", "Já vejo a muito tempo (> 1 ano)"]

    const [urgencia, setUrgencia] = useState(1);

    const [patologia, setPatologia] = useState([]);
    useEffect(() => {
        api.get('/patologias').then(respostaAPI => {
            setPatologia(respostaAPI.data);
        });
    }, []);

    return (
        <SafeAreaView style={{flex:1}}>
            <TopNavigation style={styles.barraTopo} title="REGISTRAR PATOLOGIA" alignment="center"/>
            <Layout style={styles.container}>
                <View style={styles.containerGrupo}>
                    <Text style={styles.textoTituloSetor}>Setor ou Localidade Selecionada:</Text>
                    <Text style={styles.textoSetorSelecionado}>{nomeSetor.toUpperCase()}</Text>
                </View>
                <View style={styles.containerGrupo}>
                    <Text style={styles.textoTituloSetor}>Selecione o tipo de patologia encontrada:</Text>
                    <Select selectedIndex={tipoPatologia} value={tiposPatologias[tipoPatologia.row]} onSelect={selecao => {setTipoPatologia(selecao);}}>
                        {patologia.map(patologia => (
                           <SelectItem key={patologia.idPatologia} title={patologia.nomePatologia}/> 
                        ))}
                    </Select>
                    <Text style={styles.textoRodape}>Você deve selecionar uma opção dentre as apresentadas que se enquadra com o que você está vendo!</Text>
                </View>
                <View style={styles.containerGrupo}>
                    <Text style={styles.textoTituloSetor}>Há quanto tempo você vê tal patologia?</Text>
                    <Select selectedIndex={tempoPatologia} value={temposPatologias[tempoPatologia.row]} onSelect={selecao => setTempoPatologia(selecao)}>
                        <SelectItem style={styles.selecao} title="Primeira Vez que Vi"/>
                        <SelectItem style={styles.selecao} title="Comecei a ver recentemente (< 1 ano)"/>
                        <SelectItem style={styles.selecao} title="Já vejo a muito tempo? ( > 1 ano) "/>
                    </Select>
                    <Text style={styles.textoRodape}>Selecione uma dentre as opções acima que mais se aproxime do tempo que você vem percebendo essa patologia identificada.</Text>
                </View>
                <View style={styles.containerGrupo}>
                    <Text style={styles.textoTituloSetor}>Acha Urgente?</Text>
                    <RadioGroup style={styles.grupoRadio} selectedIndex={urgencia} onChange={radioSelecionado => setUrgencia(radioSelecionado)}>
                        <Radio>SIM</Radio>
                        <Radio>NÃO</Radio>
                    </RadioGroup>
                    <Text style={styles.textoRodape}>Por padrão a urgência da patologia está selecionada como negativa. Caso ache que ela precise ser solucionada com urgência, troque a opção para SIM!</Text>
                </View>
                <View style={styles.containerGrupoCentralizado}>
                    <Text style={styles.textoBotao}>Após preencher todas as informações acima, por favor clique no botão abaixo!</Text>
                    <Button appearance="filled" onPress={async () => {
                        const gTipoPatologia = tipoPatologia.row;
                        const gTempoPatologia = tempoPatologia.row;
                        const gUrgencia = urgencia;
                        console.log(`${gTipoPatologia} - ${gTempoPatologia} - ${gUrgencia}`);
                            
                        await api.post("/patologias", {
                            nomeSetor: nomeSetor,
                            tipoPatologia: gTipoPatologia,
                            tempoPatologia: gTempoPatologia,
                            urgencia: gUrgencia,
                        }).then(response => console.log(response))
                        .catch(error => {
                            if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            }
                        });
                        navegacao.navigate("SavedRegistry");
                        
                    }}>SALVAR REGISTRO</Button>
                </View>
                <Text style={styles.textoRodape}>O registro das patologias é feito de forma totalmente anônima!</Text>          
            </Layout>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    barraTopo:{
        backgroundColor:"#C4F979",
        fontWeight:"bold",
    },
    
    container: {
        flex:1,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems: "flex-start",
        backgroundColor: "#F0FED2",
    },
    containerGrupo:{
        padding:10,
    },
    containerGrupoCentralizado:{
        padding:10,
        alignSelf:"center",
    },
    containerRadio:{
        flex:2,
        flexDirection:"row",
        flexWrap:"wrap",
    },

    textoTituloSetor: {
        color: '#247106',
        fontSize:16,
        fontWeight:"bold",
    },
    textoSetorSelecionado:{
        color: '#247106',
        fontSize:20,
        fontWeight:"bold",
    },

    selecao:{
        backgroundColor: "white",
        color: '#247106',
        fontWeight:'bold',
    },

    grupoRadio:{
        flexDirection:"row",
        flexWrap:"wrap",
        alignContent:"space-around",
    },

    textoBotao: {
        color: '#247106',
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center",
    },    
    
    textoRodape:{
        color: '#247106',
        fontSize:12,
        fontWeight:"bold",
        alignSelf:"center",
    }
});

export default RegistroPatologia;