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
  useEffect(() => {
    console.log(username);
  });
  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
    } else
      API.post(
        "/users/login",
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(() => {
          setUser(username);
        })
        .catch((err) => {
          Alert.alert(
            "Login failed",
            "Please check your username and password"
          );
          console.log(err);
        });
  };
  const handleRegister = () => {
    setUser("register");
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
            paddingTop: 30,
          }}
        >
          Đăng nhập
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

      <View style={{ flexGrow: 1, width: "100%" }}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn1} onPress={handleRegister}>
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
    marginHorizontal: 20,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#04C35C",
  },
  loginBtn1: {
    marginHorizontal: 20,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#C4C4C4",
  },
});
