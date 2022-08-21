import { Button, Divider, TopNavigation, Layout, BottomNavigation , BottomNavigationTab, Icon } from "@ui-kitten/components";
import React, {useEffect, useState, useRef} from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const CameraRegistroPatologia = () => {
    const navegacao = useNavigation();
    const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.back);
    const [temPermissaoCamera, setTemPermissaoCamera] = useState(null);
    const [uriFoto, setUriFoto] = useState("");
    const camRef = useRef(null);
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setTemPermissaoCamera(status === 'granted');
            if(status !== 'granted'){
                navegacao.goBack();
            }
        })();
    }, []);

    async function takePicture(){
        if(camRef){
            const dadosFoto = await camRef.current.takePictureAsync();
            setUriFoto(dadosFoto);
            console.log(uriFoto);
            //navegacao.state.params.uriFoto(dadosFoto.uri);
            navegacao.goBack();
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <TopNavigation style={styles.barraTopo} title="CÂMERA" alignment="center"/>
            <Layout style={styles.container}>
                <Camera style={styles.camera} type={tipoCamera}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                            setTipoCamera(tipoCamera === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                            }}>
                            <Text style={styles.text}> <Icon name="flip-outline"/> </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <Button style={{paddingBottom:10}} onPress={() => {
                            setTipoCamera(tipoCamera === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                }}> Trocar Camera</Button>
                <Button style={{paddingTop:10}} onPress={() => {
                            takePicture()
                }}> Tirar Foto</Button>
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
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
    },
    camera: {
        width: Dimensions.get("window").width,
        height: "80%",
    }
});

export default CameraRegistroPatologia;