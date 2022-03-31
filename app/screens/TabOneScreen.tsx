import { StyleSheet, Image, Switch, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { API } from "../api";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useEffect(() => {
    const unsub = setInterval(async () => {
      try {
        await API.get("/devices").then(async (res) => {
          console.log(res.data);
          await setData(res.data);
          res.data.map((item: any) => {
            if (item.name === "Light") {
              setIsEnabled(item.feed == "1" ? true : false);
            } else if (item.name === "Fan") {
              setIsEnabled1(item.feed == "1" ? true : false);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => {
      clearInterval(unsub);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <FontAwesome name="microphone" size={24} color="black" />
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Hi, Sói
        </Text>
        <Image
          source={require("../assets/images/soi.png")}
          style={{ marginLeft: 20 }}
        />
        <View
          style={{
            flexGrow: 1,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <FontAwesome name="sign-out" size={24} color="black" />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            paddingTop: 32,
          }}
        >
          Các thiết bị của bạn
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexGrow: 1,
            padding: 20,
            borderRadius: 10,
            backgroundColor: "#fff",
            marginRight: 20,
            marginTop: 20,
            paddingTop: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            <Image source={require("../assets/images/led.png")} />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#E5E5E5" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              disabled
              value={isEnabled}
              style={{ backgroundColor: "#fff" }}
            />
          </View>
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          >
            Bóng đèn
          </Text>
        </View>

        <View
          style={{
            flexGrow: 1,
            padding: 20,
            borderRadius: 10,
            backgroundColor: "#fff",
            marginTop: 20,
            paddingTop: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            <Image source={require("../assets/images/fan.png")} />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled1 ? "#E5E5E5" : "#f4f3f4"}
              onValueChange={toggleSwitch1}
              disabled
              value={isEnabled1}
              style={{ backgroundColor: "#fff" }}
            />
          </View>
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          >
            Quạt
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 20,
          paddingVertical: 20,
          width: "100%",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            paddingLeft: 20,
          }}
        >
          <Image source={require("../assets/images/user.png")} />
          <Text
            style={{
              fontSize: 18,
              textAlign: "left",
              fontWeight: "bold",
              paddingLeft: 20,
            }}
          >
            Danh sách người dùng hai
          </Text>
        </View>
        <FlatList
          data={[{ key: "Sói cha" }, { key: "Sói mẹ" }]}
          renderItem={({ item }) => (
            <Text
              style={{
                fontSize: 18,
                textAlign: "left",
                fontWeight: "bold",
                paddingLeft: 70,
                paddingTop: 10,
              }}
            >
              {item.key}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
