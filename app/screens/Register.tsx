import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { API } from "../api";

export default function App({ setUser }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegister = () => {
    if (username && password && password2)
      if (password == password2)
        API.post("/users/create", {
          username,
          password,
        })
          .then((res) => {
            setUser(null);
          })
          .catch((err) => {
            Alert.alert("Thông báo", "Đăng ký thất bại");
          });
      else Alert.alert("Thông báo", "Mật khẩu không trùng khớp");
    else Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-end", width: "100%" }}>
        <Text
          style={{
            textAlign: "left",
            width: "100%",
            fontSize: 26,
            paddingLeft: 20,
            fontWeight: "bold",
          }}
        >
          Đăng kí
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/images/login.png")}
        />
      </View>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mật khẩu"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password2) => setPassword2(password2)}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.loginBtn1}
          onPress={() => setUser(null)}
        >
          <Text>TRỞ VỀ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => handleRegister()}
        >
          <Text>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "40%",
    marginHorizontal: 10,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#04C35C",
  },
  loginBtn1: {
    width: "40%",
    marginHorizontal: 10,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#C4C4C4",
  },
});
