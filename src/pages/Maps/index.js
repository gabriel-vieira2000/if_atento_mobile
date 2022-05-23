import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, {Marker, Polygon} from "react-native-maps";

import { Layout, BottomNavigation , BottomNavigationTab} from "@ui-kitten/components";

export default function Maps() {

  return (
    <View style={styles.container}>
      <MapView style={styles.map} mapType="hybrid" minZoomLevel={15} maxZoomLevel={20} zoomTapEnabled={false} zoomControlEnabled={false}
        initialRegion={{
          latitude: -21.350371,
          longitude: -46.528377,
          latitudeDelta: 0.002,
          longitudeDelta: 0.009,
        }}> 
          <Marker coordinate={{latitude: -21.350371, longitude: -46.528377, }}/>
          <Polygon coordinates={[
            {name: "predioInfo1", latitude: -21.350482, longitude: -46.527217},
            {name: "predioInfo2", latitude: -21.350605, longitude: -46.526832},
            {name: "predioInfo3", latitude: -21.350980, longitude: -46.526956},
            {name: "predioInfo4", latitude: -21.350854, longitude: -46.527341},
          ]} strokeWidth={2} strokeColor="#000" fillColor="rgba(0,0,0,0.3)" tappable={true}
          />
          <Polygon coordinates={[
            {name: "refeitorio1", latitude: -21.350741, longitude: -46.527749},
            {name: "refeitorio2", latitude: -21.350576, longitude: -46.527698},
            {name: "refeitorio3", latitude: -21.350706, longitude: -46.527337},
            {name: "refeitorio4", latitude: -21.350843, longitude: -46.527359},
          ]} strokeWidth={2} strokeColor="#fff" fillColor="rgba(255,255,255,0.3)" tappable={true}
          />
          <Polygon coordinates={[
            {name: "refeitorio1", latitude: -21.350247, longitude: -46.527686},
            {name: "refeitorio2", latitude: -21.350259, longitude: -46.527797},
            {name: "refeitorio3", latitude: -21.350030, longitude: -46.527855},
            {name: "refeitorio4", latitude: -21.350006, longitude: -46.527753},
          ]} strokeWidth={2} strokeColor="rgba(255,0,0,1)" fillColor="rgba(255,0,0,0.3)" tappable={true}
          />
        </MapView>

      <Layout style={styles.footer} level="1">
        <Text>Menu Inferior</Text>
      </Layout>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  footer: {
    bottom: 0,
    height: 130,
    width: Dimensions.get("window").width,
    backgroundColor: "#ccc",
    zIndex: 100,
  },
});