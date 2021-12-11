import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";
import cookie from "../assets/images/cookie.png";

const ImageRecipe = ({ Componente }) => {
  const [image, setImage] = useState(Componente.Datos["Image"]);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      Componente.Datos["Image"] = result.uri;
      setImage(result.uri);
      
    }
  };

  const [Visible, setVisible] = useState(true);

  const BorrarComponente = () => {
    Componente.Datos["Visible"] = false;

    setVisible(!Visible);
  };

  return (
    <View style={{...Estilo.vista, display: Visible ? "flex" : "none" }}>
      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Ionicons name={"image-outline"} size={18} color="#FF4848" />
        <Text style={Estilo.titulo}>Imagen</Text>
      </View>

      <View style={Estilo.vistaImagen}>
        <Image
          style={Estilo.imagen}
          source={image == -1 ? cookie : { uri: image }}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ ...Estilo.boton, flex: 1, marginRight: 16 }}
          onPress={() => selectImage()}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Agregar imagen
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

export default ImageRecipe;

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
  vistaImagen: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  imagen: {
    resizeMode: "contain",
    height: 200,
    width: 400
  },
});
