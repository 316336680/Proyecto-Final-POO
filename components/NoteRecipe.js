import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";

const countries = ["Advertencia", "Información", "Peligro", "Recomendación"];
const tipoNota = [
  { icon: "warning", color: "yellow" },
  { icon: "information-circle-outline", color: "blue" },
  { icon: "flag", color: "red" },
  { icon: "checkmark-circle-outline", color: "green" },
];

const icono = (value, key = 0) => {
  if (key == -1) {
    key = 0;
  }
  return (
    <View style={{ flexDirection: "row"}}>
      <Ionicons
        name={tipoNota[key].icon}
        size={25}
        color={tipoNota[key].color}
        style={{marginLeft: 8}}
      />
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={{ color: "#FF4848",textAlign: 'center'}}>{countries[key]}</Text>
      </View>
    </View>
  );
};

const dropFlecha = () =>{
    return (
        <Ionicons name={'arrow-down'} size={18} color="#FF4848" />
    )
}

const NoteRecipe = ({Componente}) => {
  const [Editable, setEditable] = useState(true);
  const [Visible, setVisible] = useState(true);
  const [Texto, setTexto]= useState(Componente.Datos['Texto'])

  const BorrarComponente = () => {
    Componente.Datos["Visible"] = false;

    setVisible(!Visible);
  };

  const changeTexto = (value) =>{
    Componente.Datos['Texto'] = value
    setTexto(value)
  }

  return (
    <View style={{...Estilo.vista, display: Visible ? "flex" : "none" }}>
      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Ionicons name={"document-outline"} size={18} color="#FF4848" />
        <Text style={Estilo.titulo}>Nota</Text>
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
        onChangeText={(value)=>{changeTexto(value)}}
      />
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          Componente.Datos['Nota'] = index
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        defaultButtonText={"Tipo de Nota"}
        buttonStyle={Estilo.selector}
        buttonTextStyle={Estilo.selectorText}
        dropdownStyle={{borderRadius: 8 }}
        rowTextStyle={Estilo.selectorText}
        rowStyle={{ borderRadius: 8, borderColor: "white" }}
        defaultValueByIndex={Componente.Datos['Nota']}
        renderCustomizedButtonChild={icono}
        renderCustomizedRowChild= {icono}
        renderDropdownIcon={dropFlecha}
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

export default NoteRecipe;

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
  selector: {
      borderWidth: 1,
    borderColor: "#FF4848",
    borderRadius: 8,
    height: 35,
    width: 300 ,
    margin: 8,
    alignSelf: "center",
  },
});
