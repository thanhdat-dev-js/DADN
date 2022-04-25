import { StyleSheet, Image, Switch, FlatList, ScrollView } from "react-native";
import { useState, useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import CircleSlider from "react-native-circle-slider";
import ProgressCircle from "react-native-progress-circle";
import { API } from "../api";
import Slider from "@react-native-community/slider";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnable2] = useState(false);
  const [isEnabled3, setIsEnable3] = useState(false);
  const [temp, setTemp] = useState(0);
  const [humid, setHumid] = useState(0);
  const [lightsensor, setLightsensor] = useState(0);

  const toggleSwitch1 = () => {
    API.put("/devices/623ae518da7f074b55a950f1", {
      value: !isEnabled1 ? 1 : 0,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const toggleSwitch3 = () => {
    API.put("/devices/625d6a159f002e62d1f240af", {
      value: !isEnabled3 ? 1 : 0,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const toggleSwitch2 = () => {
    API.put("/devices/625d69f79f002e62d1f240ae", {
      value: !isEnabled2 ? 1 : 0,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const toggleSwitch = () => {
    API.put("/devices/623ae316da7f074b55a950ee", {
      value: !isEnabled ? 1 : 0,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const unsub = setInterval(async () => {
      try {
        await API.get("/devices").then(async (res) => {
          // console.log(res.data);
          res.data.map((item: any) => {
            if (item.name === "Light_1") {
              setIsEnabled(item.feed == "1" ? true : false);
            } else if (item.name === "Fan_1") {
              setIsEnabled1(item.feed == "1" ? true : false);
            } else if (item.name === "Light_2") {
              setIsEnable2(item.feed == "1" ? true : false);
            } else if (item.name === "Fan_2") {
              setIsEnable3(item.feed == "1" ? true : false);
            } else if (item.name === "temp") {
              setTemp(item.feed);
            } else if (item.name === "humid") {
              setHumid(item.feed);
            } else if (item.name === "light_sensor") {
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
    <ScrollView>
      <View style={styles.container}>
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
                value={isEnabled}
                style={{ backgroundColor: "#fff" }}
              />
            </View>
            <Text
              style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
            >
              Bóng đèn 1
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
              <Image source={require("../assets/images/led.png")} />
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled2 ? "#E5E5E5" : "#f4f3f4"}
                onValueChange={toggleSwitch2}
                value={isEnabled2}
                style={{ backgroundColor: "#fff" }}
              />
            </View>
            <Text
              style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
            >
              Bóng đèn 2
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexGrow: 1,
              padding: 20,
              borderRadius: 10,
              backgroundColor: "#fff",
              marginTop: 20,
              paddingTop: 0,
              marginRight: 20,
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
                value={isEnabled1}
                style={{ backgroundColor: "#fff" }}
              />
            </View>
            <Text
              style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
            >
              Quạt 1
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
                thumbColor={isEnabled3 ? "#E5E5E5" : "#f4f3f4"}
                onValueChange={toggleSwitch3}
                value={isEnabled3}
                style={{ backgroundColor: "#fff" }}
              />
            </View>
            <Text
              style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
            >
              Quạt 2
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
    </ScrollView>
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

const WrapSlider = ({ isEnabled1, setIsEnabled1 }: any) => {
  console.log("text", isEnabled1);
  return (
    <Slider
      style={{ width: "100%", height: 80 }}
      step={1}
      value={isEnabled1}
      onValueChange={(value) => {
        setIsEnabled1(value);
      }}
      minimumValue={0}
      maximumValue={2}
      minimumTrackTintColor="#81b0ff"
      maximumTrackTintColor="#767577"
      thumbTintColor="#E5E5E5"
    />
  );
};
