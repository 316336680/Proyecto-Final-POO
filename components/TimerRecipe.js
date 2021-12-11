import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const TimerRecipe = ({Componente}) => {
  const [Editable, setEditable] = useState(true);
  const [Visible, setVisible] = useState(true);

  const [Minutos, setMinutos] = useState(Componente.Datos['Minutos'].toString())
  const [Segundos, setSegundos] = useState(Componente.Datos['Segundos'].toString())

  const BorrarComponente = () => {
    Componente.Datos["Visible"] = false;

    setVisible(!Visible);
  };

  const changeMinutos = (value) =>{
    setMinutos = value
    Componente.Datos['Minutos'] = Number(value)
  }

  const changeSegundos = (value) =>{
    setSegundos = value
    Componente.Datos['Segundos'] = Number(value)
  }

  return (
    <View style={{...Estilo.vista, display: Visible ? "flex" : "none" }}>
      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Ionicons name={"stopwatch-outline"} size={18} color="#FF4848" />
        <Text style={Estilo.titulo}>Cronometro</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TextInput
          placeholder={"Minutos"}
          style={Estilo.input}
          editable={Editable}
          keyboardType= {'number-pad'}
          value={Minutos}
          onChangeText={(value)=>{changeMinutos(value)}}
        />
        <Text style={{color: "#FF4848",fontSize: 30}}>:</Text>
        <TextInput
          placeholder={"Segundos"}
          style={Estilo.input}
          editable={Editable}
          value={Segundos}
          keyboardType= {'number-pad'}
          onChangeText={(value)=>{changeSegundos(value)}}
        />
      </View>

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
        onPress={() => BorrarComponente()}
        >
          <Ionicons name={"trash-outline"} size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerRecipe;

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
    marginHorizontal: 4,
    textAlign: 'center'
  },
});
