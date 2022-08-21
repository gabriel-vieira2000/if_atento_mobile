import { useNavigation } from "@react-navigation/native";
import { Layout, TopNavigation, Button, Select, IndexPath, SelectItem, Radio, RadioGroup, Input } from "@ui-kitten/components";
import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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


    const [uriFoto, setUriFoto] = useState("");
    const [modalFotoVisivel, setModalFotoVisivel] = useState(false);
    const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.back);
    const [temPermissaoCamera, setTemPermissaoCamera] = useState(null);
    const camRef = useRef(null);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setTemPermissaoCamera(status === 'granted');
            if(status !== 'granted'){
                navegacao.goBack();
            }
        })();
        api.get('/patologias').then(respostaAPI => {
            setPatologia(respostaAPI.data);
        });
    }, []);

    async function takePicture(){
        console.log("Entrou na função");
        console.log(uriFoto);
        if(camRef){
            console.log("Pegou a referencia");
            const dadosFoto = await camRef.current.takePictureAsync();
            setUriFoto(dadosFoto.uri);
            console.log(dadosFoto);
            console.log(dadosFoto.uri);
            console.log(uriFoto);
            //navegacao.state.params.uriFoto(dadosFoto.uri);
            navegacao.goBack();
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


                    <View style={styles.containerGrupo}>
                        <Text style={styles.textoTituloSetor}>Por gentileza nos envie uma foto da patologia abaixo:</Text>
                        <Button appearance="filled" onPress={() => {setModalFotoVisivel(true);}}>ABRIR CÂMERA</Button>
                        
                        <Modal animationType="slide" transparent={false} visible={modalFotoVisivel}>
                            <Layout style={styles.container}>
                            <Text>Posicione a câmera para captar a patologia e pressione em Tirar Foto:</Text>
                                <Camera style={styles.camera} type={tipoCamera} ref={camRef}>
                                </Camera>
                                <View style={styles.containerRadio}>
                                <Button onPress={() => {
                                            setTipoCamera(tipoCamera === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                                }}> Trocar Camera</Button>
                                <Button onPress={async () => {
                                            await takePicture();
                                            setModalFotoVisivel(false);
                                }}> Tirar Foto</Button>
                                </View>
                            </Layout>
                        </Modal>

                        <Text>{uriFoto}</Text>
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
                            console.log(`${gTipoPatologia} - ${gTempoPatologia} - ${gUrgencia} - ${textoDetalhes}`);
                                
                            await api.post("/patologias", {
                                nomeSetor: nomeSetor,
                                tipoPatologia: gTipoPatologia,
                                tempoPatologia: gTempoPatologia,
                                urgencia: gUrgencia,
                                detalhes: textoDetalhes
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