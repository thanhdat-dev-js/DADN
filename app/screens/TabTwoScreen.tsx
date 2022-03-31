import { StyleSheet, Image, Switch, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import CircleSlider from "react-native-circle-slider";
import ProgressCircle from "react-native-progress-circle";
import { API } from "../api";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [temp, setTemp] = useState(0);
  const [humid, setHumid] = useState(0);
  const [lightsensor, setLightsensor] = useState(0);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useEffect(() => {
    const unsub = setInterval(async () => {
      try {
        await API.get("/devices").then(async (res) => {
          console.log(res.data);
          res.data.map((item: any) => {
            if (item.name === "Light") {
              setIsEnabled(item.feed == "1" ? true : false);
            } else if (item.name === "Fan") {
              setIsEnabled1(item.feed == "1" ? true : false);
            } else if (item.name === "temp") {
              setTemp(item.feed);
            } else if (item.name === "humid") {
              setHumid(item.feed);
            } else if (item.name === "lightsensor") {
              setLightsensor(item.feed);
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
      {/* <View style={styles.heading}>
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
      </View> */}
      <View></View>
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
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",

            borderRadius: 10,
            marginRight: 20,
            paddingTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Min: 0
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Max: 50
            </Text>
          </View>
          <ProgressCircle
            percent={temp * 2}
            radius={60}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{temp}</Text>
          </ProgressCircle>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Cảm biến
          </Text>
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          >
            nhiệt độ
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 10,
            paddingTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Min: 0
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Max: 100
            </Text>
          </View>
          <ProgressCircle
            percent={humid}
            radius={60}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{humid}</Text>
          </ProgressCircle>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Cảm biến
          </Text>
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          >
            độ ẩm
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 10,
            paddingTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Min: 0
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Max: 100
            </Text>
          </View>
          <ProgressCircle
            percent={lightsensor}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{lightsensor}</Text>
          </ProgressCircle>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Cảm biến
          </Text>
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          >
            ánh sáng
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
          }}
        >
          {/* <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{"30%"}</Text>
          </ProgressCircle> */}
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 10,
            }}
          ></Text>
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          ></Text>
        </View>
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
