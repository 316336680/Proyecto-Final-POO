import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const LinkRecipe = ({Componente}) => {
  const [Editable, setEditable] = useState(true);
  const [Visible, setVisible] = useState(true);

  const BorrarComponente = () => {
    Componente.Datos["Visible"] = false;

    setVisible(!Visible);
  };

  return (
    <View style={{...Estilo.vista, display: Visible ? "flex" : "none" }}>
      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Ionicons name={"link-outline"} size={18} color="#FF4848" />
        <Text style={Estilo.titulo}>Enlace</Text>
      </View>

      <TextInput
        placeholder={"Texto del enlace"}
        style={Estilo.input}
        editable={Editable}
        onChangeText={(value)=>{Componente.Datos['Texto'] = value}}
      />
      <TextInput
        placeholder={"Enlace"}
        style={Estilo.input}
        editable={Editable}
        onChangeText={(value)=>{Componente.Datos['Link'] = value}}
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
        <TouchableOpacity style={Estilo.boton}
        onPress={() => BorrarComponente()}>
          <Ionicons name={"trash-outline"} size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LinkRecipe;

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
  input: {
    backgroundColor: "white",
    borderRadius: 4,
    flex: 1,
    padding: 8,
    marginVertical: 8,
  },
});
