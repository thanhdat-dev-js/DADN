import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { API } from "../api";

import { Text, View } from "../components/Themed";

export default function TabFourScreen({ navigation }) {
  const [data, setData] = useState([]);
  const fetchData = () => {
    API.get("/notification").then(({ data }) => {
      const temp = data
        .sort((item1: any, item2: any) => (item1.time > item2.tiem ? 1 : -1))
        .filter((item, idx) => (idx < 20 ? true : false));
      setData(temp);
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={{}}>
      <View style={{ backgroundColor: "#fff" }}>
        <Text style={styles.title}>Thông báo</Text>
      </View>
      {data?.map((item: any) => (
        <View
          key={item._id}
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
        >
          <Text>{item.notification}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    paddingLeft: 20,
  },
});
