import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Alert
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";
import Tag from "../components/Tag";
import Timer from "../components/Timer";
import Galleta from "../assets/images/cookie.png";

const ViewRecipe = ({ navigation, route }) => {
  const { Receta } = route.params;
  const [Fav, setFav] = useState(Receta.Datos.Fav);

  const changeFav = (Fav) => {
    setFav(!Fav);
    Receta.Datos.Fav = Fav;
  };

  const editRecipe = () =>{
    navigation.navigate("Crear Receta",{Receta: Receta})
  }

  const deleteRecipe = async() =>{
    imprimir()
    await firebase.db.collection('recipe').doc(Receta.Datos.id).delete()
    Alert.alert("Receta eliminada")
    navigation.navigate("Home")
  }

  const imprimir = () => {
    console.log("================");
    console.log(Receta);
  };

  const createComponente = (value) => {
    setComponentes([...Componentes, { Tipo: value, Visible: true }]);
  };

  const tipoNota = [
    { icon: "warning", color: "yellow" },
    { icon: "information-circle-outline", color: "blue" },
    { icon: "flag", color: "red" },
    { icon: "checkmark-circle-outline", color: "#77D970" },
  ];

  const ColocarComponente = (value, index) => {
    switch (value.Tipo) {
      case 0:
        return (
          <Text key={index} style={{ margin: 8, fontSize: 18 }}>
            {value.Texto}
          </Text>
        );
      case 1:
        return (
          <Image
            style={Estilo.imageComp}
            key={index}
            source={{ uri: value.Image }}
          />
        );
      case 2:
        return (
          <Timer
            key={index}
            Segundos={value.Segundos}
            Minutos={value.Minutos}
          />
        );
      case 3:
        return (
          <View
            key={index}
            style={{
              backgroundColor: tipoNota[value.Nota].color,
              margin: 8,
              padding: 10,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={tipoNota[value.Nota].icon}
              size={25}
              color={"white"}
              style={{ marginLeft: 8 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text>{value.Texto}</Text>
            </View>
          </View>
        );

      case 4:
        return (
          <TouchableOpacity
            onPress={async () => await Linking.openURL(value.Link)}
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Ionicons name={"link-outline"} size={30} color={"#FF4848"} />
            <Text
              style={{ color: "#FF4848", fontSize: 30, fontWeight: "bold" }}
            >
              {value.Texto}
            </Text>
          </TouchableOpacity>
        );

      default:
        return (
          <Text key={index}>Componente no encontrado, Tipo: {value.Tipo}</Text>
        );
    }
  };

  return (
    <View style={Estilo.container}>
      <ScrollView>
        <View style={Estilo.portada}>
          <View style={Estilo.barMenu}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={40} color="#FF4848" />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => editRecipe()}>
              <Ionicons name="pencil" size={40} color="#FF4848" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteRecipe()}>
              <Ionicons name="trash" size={40} color="#FF4848" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={Estilo.photo}
              source={
                Receta.Datos.Photo == -1
                  ? Galleta
                  : {
                      uri: Receta.Datos.Photo,
                    }
              }
            />
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={Estilo.titulo}>{Receta.Datos.Title}</Text>
              <Text style={{ flex: 1 }}>{Receta.Datos.Desc}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginBottom: 16,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="time" size={30} color="#BDBDBD" />
                  <Text style={{ fontSize: 25, color: "#BDBDBD" }}>
                    {Receta.Datos.Time.Minutos}:{Receta.Datos.Time.Segundos}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => changeFav(Fav)}>
                  <Ionicons
                    name={Fav ? "star" : "star-outline"}
                    size={40}
                    color={Fav ? "#FF4848" : "#BDBDBD"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={Estilo.tagView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {Receta.Datos.Tags.map((value) => {
                return <Tag ID={value} key={value} />;
              })}
            </ScrollView>
          </View>
        </View>

        {/* Creación de componentes*/}
        {Receta.Datos.Components.map((value, index) => {
          return ColocarComponente(value, index);
        })}
      </ScrollView>
    </View>
  );
};

export default ViewRecipe;

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1ECEC",
  },
  portada: {
    backgroundColor: "white",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  photo: {
    resizeMode: "contain",
    width: 150,
    height: 150,
    borderRadius: 16,
    margin: 8,
    marginTop: 0,
  },
  titulo: {
    color: "#FF4848",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  tagView: {
    marginHorizontal: 32,
    marginBottom: 8,
    alignItems: "center",
  },
  imageComp: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 5,
    resizeMode: "center",
    borderRadius: 12,
  },
  barMenu: {
    flexDirection: "row",
    paddingBottom: 8,
  },
});
