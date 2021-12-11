import React from "react";
import { TouchableOpacity, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Return = ({navigation}) =>{
    return(
        <TouchableOpacity
        style={Estilo.itemButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="#F1ECEC"
        />
      </TouchableOpacity>
    )
}

export default Return

const Estilo = StyleSheet.create({
    itemButton: {
        left:8,
        top: 8,
        position: "absolute",
        width: 45,
        height: 45,
        backgroundColor: "#FF4848",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
      },
})