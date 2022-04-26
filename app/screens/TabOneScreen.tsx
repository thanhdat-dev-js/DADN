import {
  StyleSheet,
  Image,
  Switch,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { API } from "../api";
import { AppContext } from "../App";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    API.put("/devices/62669fd582f752873681f4ce", {
      value: !isEnabled ? 1 : 0,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const { user, setUser }: any = useContext(AppContext);
  useEffect(() => {
    const unsub = setInterval(async () => {
      try {
        await API.get("/devices").then(async (res) => {
          res.data.map((item: any) => {
            if (item.name == "Door") {
              setIsEnabled(item.feed == "1" ? true : false);
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
  const handleAddFace = () => {
    Alert.alert("Thông báo", "Vui lòng đứng trước camera để lấy dữ liệu", [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          API.post("/users/capture-face", {
            username: user,
          });
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {/* <FontAwesome name="microphone" size={24} color="black" /> */}
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
          <FontAwesome
            name="sign-out"
            size={24}
            color="black"
            onPress={() => setUser(null)}
          />
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
            flexGrow: 1,
            padding: 20,
            borderRadius: 10,
            backgroundColor: "#fff",
            marginTop: 20,
            paddingTop: 0,
          }}
        >
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          >
            Trạng thái cửa
          </Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={require("../assets/images/door.png")}
              style={{
                width: 80,
                height: 80,
              }}
            />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#E5E5E5" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ backgroundColor: "#fff" }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              paddingVertical: 14,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <TouchableOpacity style={{ width: "100%" }}>
              <Text style={{ textAlign: "center" }} onPress={handleAddFace}>
                Thêm khuôn mặt
              </Text>
            </TouchableOpacity>
          </View>
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
