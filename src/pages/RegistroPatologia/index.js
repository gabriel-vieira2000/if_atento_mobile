import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RegistroPatologia({route}) {
    const {nomeSetor} = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.textoTeste}>
                Página do Registro de Patologias! {JSON.stringify(nomeSetor)}
            </Text>
        </View>
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