import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import axios from "axios";

export default function App() {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
    setLoading(true);
  }, []);

  const fetchData = async () => {
    await axios
      .get("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events")
      .then((res) => {
        setEvent(res.data.events);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Yükleniyor...</Text>
        </View>
      ) : (
        <MapView
          initialRegion={{
            latitude: 52.5,
            longitude: 19.2,
            latitudeDelta: 8.5,
            longitudeDelta: 8.5,
          }}
          style={{ height: "100%" }}
        >
          {event.map((item, index) => {
            console.log();
            if (typeof item.geometries[0].coordinates[0] !== "object") {
              return (
                <Marker
                  title={item.title}
                  description={item.description}
                  key={index}
                  coordinate={{
                    latitude: item.geometries[0].coordinates[1],
                    longitude: item.geometries[0].coordinates[0],
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 30 }}>🔥</Text>
                  </View>
                </Marker>
              );
            }
          })}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
