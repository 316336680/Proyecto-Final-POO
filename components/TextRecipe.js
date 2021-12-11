import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const TextRecipe = ({ Componente }) => {
  const [Editable, setEditable] = useState(true);
  const [Visible, setVisible] = useState(true);
  const [Texto, setTexto]=useState(Componente.Datos["Texto"])

  const BorrarComponente = () => {
    Componente.Datos["Visible"] = false;

    setVisible(!Visible);
  };

  const changeTexto = (value) =>{
    Componente.Datos["Texto"] = value
    setTexto(value)
  }

  return (
    <View style={{ ...Estilo.vista, display: Visible ? "flex" : "none" }}>
      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Ionicons name={"create-outline"} size={18} color="#FF4848" />
        <Text style={Estilo.titulo}>Texto</Text>
      </View>

      <TextInput
        multiline
        style={{
          backgroundColor: "white",
          borderRadius: 4,
          flex: 1,
          paddingHorizontal: 8,
        }}
        numberOfLines={4}
        editable={Editable}
        value={Texto}
        onChangeText={(value) => {
          changeTexto(value);
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ ...Estilo.boton, flex: 1, marginRight: 16 }}
          onPress={() => (Editable ? setEditable(false) : setEditable(true))}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {Editable ? "Salvar" : "Editar"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Estilo.boton}
          onPress={() => BorrarComponente()}
        >
          <Ionicons name={"trash-outline"} size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextRecipe;

const Estilo = StyleSheet.create({
  vista: {
    borderWidth: 1,
    borderColor: "#FF4848",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 8,
  },
  titulo: {
    color: "#FF4848",
    fontWeight: "bold",
    marginLeft: 8,
  },
  boton: {
    backgroundColor: "#FF4848",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
});
