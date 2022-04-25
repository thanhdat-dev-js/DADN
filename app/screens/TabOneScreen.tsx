import { StyleSheet, Image, Switch, FlatList, Alert } from "react-native";
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
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const { setUser }: any = useContext(AppContext);

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
            Danh sách người dùng
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
