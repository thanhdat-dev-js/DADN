import { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { API } from "../api";
import { LineChart, BarChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 1,
  useShadowColorFromDataset: false, // optional
};

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [fan1, setFan1] = useState(0);
  const [fan2, setFan2] = useState(0);
  const [light1, setLight1] = useState(0);
  const [light2, setLight2] = useState(0);
  const [lightSensor, setLightSensor] = useState([]);
  const [temp, setTemp] = useState([]);
  const [humid, setHumid] = useState([]);
  const data = {
    labels: ["Quạt 1", "Quạt 2", "Đèn 1", "Đèn 2"],
    datasets: [
      {
        data: [fan1, fan2, light1, light2],
      },
    ],
  };
  const dataLightSensor = {
    labels: [],
    datasets: [
      {
        data: lightSensor,
      },
    ],
  };
  useEffect(() => {
    API.get("/history").then(({ data }) => {
      var fan1 = 0;
      var fan2 = 0;
      var light1 = 0;
      var light2 = 0;
      var lightSensor = [];
      data.forEach((item: any) => {
        if (item["Fan_1"] == "1") fan1++;
        if (item["Fan_2"] == "1") fan2++;
        if (item["Light_1"] == "1") light1++;
        if (item["Light_2"] == "1") light2++;
        lightSensor.push(item["light_sensor"]);
      });
      setFan1(fan1);
      setFan2(fan2);
      setLight1(light1);
      setLight2(light2);
      setLightSensor(lightSensor);
    });
  }, []);
  console.log(lightSensor);
  return (
    <ScrollView>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.title}>Biểu đồ Cột số lần bật của Đèn và Quạt</Text>
        <BarChart
          // style={graphStyle}
          style={{ marginTop: 20 }}
          data={data}
          width={Dimensions.get("window").width}
          height={300}
          yAxisLabel=""
          yAxisSuffix=""
          fromZero={true}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
        {/* <LineChart
          data={dataLightSensor}
          width={Dimensions.get("window").width}
          height={256}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
