import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistroPatologia({route}) {
    const {nomeSetor} = route.params;
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.textoTeste}>
                    Página do Registro de Patologias! {JSON.stringify(nomeSetor)}
                </Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    textoTeste: {
        color: 'red',
        top: 100,
    },
    container: {
        backgroundColor: 'red',
    }
});