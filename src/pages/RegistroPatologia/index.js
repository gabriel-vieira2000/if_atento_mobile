import { useNavigation } from "@react-navigation/native";
import { Layout, TopNavigation, Button, Select, IndexPath, SelectItem, Radio, RadioGroup, Input } from "@ui-kitten/components";
import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, Modal, Dimensions, Platform, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RNS3 } from "react-native-aws3";
import { secretVar } from "../../secretVar";

import api from "../../services/api";

const RegistroPatologia = ({route}) => {
    const navegacao = useNavigation();

    const {nomeSetor} = route.params;

    const [tipoPatologia, setTipoPatologia] = useState(new IndexPath(0));
    const tiposPatologias = ["Infiltração", "Carbonatação ou Corrosão do Aço", "Deslocamento no revestimento", "Fissura ou Trincas", "Bolhas", "Vidro Quebrado", "Falta de iluminação", "Lixo ou sujeira acumulada"];

    const [tempoPatologia, setTempoPatologia] = useState(new IndexPath(0));
    const temposPatologias = ["Primeira Vez que Vi", "Comecei a ver recentemente (< 1 ano)", "Já vejo a muito tempo (> 1 ano)"]

    const [urgencia, setUrgencia] = useState(1);
    
    const [textoDetalhes, setTextoDetalhes] = useState("");

    const [patologia, setPatologia] = useState([]);


    const [foto, setFoto] = useState(null);
    const [nomeFoto, setNomeFoto] = useState("");
    const [tipoFoto, setTipoFoto] = useState("");


    useEffect(() => {
        (async () => {

            if(Platform.OS !== 'web'){
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if( status !== 'granted'){
                    alert("Permissão de Acesso aos arquivos negada! Confira as suas configurações no celular");
                }
            }
        })();

        tiposPatologias.map((patologia) => {
            setPatologia(patologia);
        });
    }, []);

    async function selecionaFoto(){
        let resultado = await ImagePicker.launchCameraAsync({
            quality: 1
        });
        console.log(resultado);
        if (!resultado.cancelled){
            setFoto(resultado.uri);
            setNomeFoto(resultado.uri.split('/').pop());
            setTipoFoto(resultado.type);
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <TopNavigation style={styles.barraTopo} title="REGISTRAR PATOLOGIA" alignment="center"/>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} style={{flex:1}} showsVerticalScrollIndicator={false}>
                <Layout style={styles.container}>
                    <View style={styles.containerGrupo}>
                        <Text style={styles.textoTituloSetor}>Setor ou Localidade Selecionada:</Text>
                        <Text style={styles.textoSetorSelecionado}>{nomeSetor.toUpperCase()}</Text>
                    </View>


                    <View style={styles.containerGrupo}>
                        <Text style={styles.textoTituloSetor}>Selecione o tipo de patologia encontrada:</Text>
                        <Select selectedIndex={tipoPatologia} value={tiposPatologias[tipoPatologia.row]} onSelect={selecao => {setTipoPatologia(selecao);console.log(`${tipoPatologia} - ${tiposPatologias[tipoPatologia.row]}`)}}>
                            {tiposPatologias.map(patologia => (
                                <SelectItem key={patologia} title={patologia}/> 
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


                    <View style={styles.containerGrupo}>
                        <Text style={styles.textoTituloSetor}>Por gentileza nos envie uma foto da patologia abaixo:</Text>
                        {foto && <Image source={{uri:foto}} style={{width:200,height:200,alignSelf:"center"}}/>}
                        {foto ? <Button appearance="filled" onPress={() => {selecionaFoto()}}>ALTERAR FOTO</Button>  : <Button appearance="filled" onPress={() => {selecionaFoto()}}>ABRIR CÂMERA</Button> } 
                    </View>


                    <View style={styles.containerGrupo}>
                        <Text style={styles.textoTituloSetor}>Algum detalhe ou observação?</Text>
                        <Input value={textoDetalhes} multiline={true} textStyle={{ minHeight: 64, textAlignVertical:"top" }} placeholder="Clique aqui para digitar!" onChangeText={textoInserido => setTextoDetalhes(textoInserido)}/>
                        <Text style={styles.textoRodape}>Caso deseje inserir alguma informação adicional, por gentileza clique e escreva na caixa de texto. Toda informação pode ser importante!</Text>
                    </View>


                    <View style={styles.containerGrupoCentralizado}>
                        <Text style={styles.textoBotao}>Após preencher todas as informações acima, por favor clique no botão abaixo!</Text>
                        <Button appearance="filled" onPress={async () => {
                            const gTipoPatologia = tipoPatologia.row;
                            const gTempoPatologia = tempoPatologia.row;
                            const gUrgencia = urgencia;
                            let urlFotoS3 = "";

                            console.log("Patologia: ",gTipoPatologia);
                            console.log("Tempo: ",gTempoPatologia);
                            console.log("Urgencia: ",urgencia);

                            console.log(`${foto} - ${nomeFoto} - ${tipoFoto}`);

                            if(foto != null){
                                const arquivoFoto = {
                                    uri: foto,
                                    name: nomeFoto,
                                    type: 'image/png'
                                }
                                console.log(arquivoFoto);

                                const config = {
                                    bucket: secretVar.AWS_S3_BUCKET,
                                    region:'us-east-1',
                                    accessKey: secretVar.AWS_S3_KEY_ID,
                                    secretKey: secretVar.AWS_S3_SECRET_KEY,
                                    successActionStatus: 201
                                }
                                console.log(config);
                                await RNS3.put(arquivoFoto,config)
                                .then((response) => {
                                    if(response.status !== 201){
                                        console.log("Fez a conexão com o S3, mas não conseguiu enviar o arquivo");
                                        console.log(response);
                                    }else{
                                        console.log(response);
                                        console.log(response.body.postResponse.location);
                                        urlFotoS3 = response.body.postResponse.location;
                                        
                                    }
                                }).catch((error) => {console.log("Deu Erro!"); console.log(error); urlFotoS3 = "ERRO"});
                            }

                            /*if(foto != null){
                                while(urlFotoS3 == "" || urlFotoS3 != "ERRO"){
                                    console.log("Esperando o envio da foto para a nuvem");
                                }
                            }*/
                            
                            await api.post("/ocorrencias", {
                                "nomeSetor":nomeSetor,
                                "tempoPatologia":gTempoPatologia,
                                "urgencia":gUrgencia,
                                "textoDetalhes":textoDetalhes,
                                "foto":urlFotoS3 
                            })
                            .then((response) => {
                                console.log("Enviado para o Back-end");
                                console.log(response.statusText);
                                navegacao.navigate("SavedRegistry");
                            })
                            .catch((error) => {
                                console.log("Erro ao enviar para o back-end");
                                console.log(error);
                            });
                        }}>SALVAR REGISTRO</Button>
                    </View>
                    <Text style={styles.textoRodape}>O registro das patologias é feito de forma totalmente anônima!</Text>          
                </Layout>
            </KeyboardAwareScrollView>
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

    camera : {
        width: Dimensions.get("window").width,
        height: "70%",
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