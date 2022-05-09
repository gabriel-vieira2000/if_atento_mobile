import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";

import { Layout, BottomNavigation , BottomNavigationTab} from "@ui-kitten/components";

export default function Maps() {

  return (
    <View style={styles.container}>
      <MapView style={styles.map} mapType="hybrid" minZoomLevel={15} maxZoomLevel={20} zoomTapEnabled="false" zoomControlEnabled="false"
        initialRegion={{
          latitude: -21.350371,
          longitude: -46.528377,
          latitudeDelta: 0.002,
          longitudeDelta: 0.009,
        }} />

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
    height: 200,
    width: Dimensions.get("window").width,
    backgroundColor: "#ccc",
    zIndex: 100,
  },
});