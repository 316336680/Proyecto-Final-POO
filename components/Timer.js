import React, { useRef, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const Timer = ({ Minutos, Segundos }) => {
  const [TimeMinutos, setTimeMinutos] = useState(Minutos);
  const [TimeSegundos, setTimeSegundos] = useState(Segundos);

  const [pause, setPause] = useState(false);

  let intervalRef = useRef();

  const decreaseNum = () => {
    setTimeSegundos((prev) => {
      if (prev == 0) {
        if (TimeMinutos == 0) {
          setPause((prev) => !prev);
          return 0;
        }
        setTimeMinutos(TimeMinutos - 1);
        return 59;
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
    setPause((prev) => !prev);
  };

  const resetTime = () => {
    setTimeMinutos(Minutos);
    setTimeSegundos(Segundos);
  };

  return (
    <View style={Estilo.Marco}>
      <Text style={Estilo.Texto}>
        {TimeMinutos}:{TimeSegundos < 10 ? "0" : ""}
        {TimeSegundos}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={handleClick}>
          <Ionicons name={!pause ? "pause" : "play"} size={50} color={"red"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetTime()}>
          <Ionicons name={"refresh"} size={50} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;

const Estilo = StyleSheet.create({
  Marco: {
    borderRadius: 12,
    borderColor: "#FF4848",
    margin: 8,
    padding: 8,
    borderWidth: 1,
  },
  Texto: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#FF4848",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 36,
    borderColor: "#FF4848",
  },
});
