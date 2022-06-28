import React from "react";
import {Text} from "react-native";
import {Polygon} from "react-native-maps";

const PoligonosSetores = () => {
    return(
        <>
            <Polygon coordinates={[
                {name: "1", latitude: -21.349712, longitude: -46.527953},
                {name: "2", latitude: -21.349695, longitude: -46.527824},
                {name: "3", latitude: -21.349477, longitude: -46.527872},
                {name: "4", latitude: -21.349500, longitude: -46.527986},
            ]} strokeWidth={2} strokeColor="rgba(105,98,174,1)" fillColor="rgba(105,98,174,0.3)" onPress={() => {setNomeSetor("Setor de Jardinagem e Paisagismo"); setCoordenadasMarcador({latitude:-21.349600, longitude: -46.527914})}} tappable={true}
            />
            <Marker coordinate={{latitude:-21.349600, longitude: -46.527914}}>
                <Text>Jardinagem e Paisagismo</Text>
            </Marker>
        </>
    );
}

export default PoligonosSetores;