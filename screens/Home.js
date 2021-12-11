import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";

import RecetaCard from "../components/RecetaCard";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";


function Home({ navigation }) {
  const [Open, setOpen] = useState(false);
  const [Recetas, setRecetas] = useState([])

  useEffect(() => {
    firebase.db.collection('recipe').onSnapshot((queryStapshot)=>{
      const Lista = []
      queryStapshot.docs.forEach((doc)=>{
        let receta = doc.data()
        receta.id = doc.id
        Lista.push(receta)
      })
      setRecetas(Lista)
    })
  }, [])



  return (

      <View style={Estilo.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor={"white"}
        />
        <View style={Estilo.top}>
          <Text style={Estilo.titulo}>CookNote</Text>
        </View>

        <ScrollView>
          {Recetas.map(value =>{
            return(
              <RecetaCard key={value.id} Receta={{Datos: value}} navigation= {navigation}/>
              
            )
          })}
          <View style={{ marginTop: 60 }} />
        </ScrollView>

        <TouchableOpacity
          style={Estilo.itemButton}
          onPress={() => navigation.navigate("Crear Receta")}
          activeOpacity={0.5}
        >
          <Ionicons
            name="add"
            size={60}
            color="#F1ECEC"
            style={Estilo.itemButtonText}
          />
        </TouchableOpacity>

        <Text style={{textAlign: 'center', backgroundColor: "#FF4848",
      color: 'white', padding: 10, borderTopLeftRadius: 16,borderTopRightRadius: 16}}>{"Cancino Roldan Javier Manuel\nVásquez Ruiz Benjamín Alejandro"}</Text>
      </View>
  );
}

export default Home;

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1ECEC",
  },
  titulo: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF4848",
    borderRadius: 200,
    flex: 1,
  },
  barra: {
    position: "absolute",
  },
  itemButton: {
    right: 8,
    bottom: 60,
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#FF4848",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  itemButtonText: {
    alignItems: "center",
    right: -2,
    bottom: 0,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderColor: "#FF4848",
  },
  menu: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: -30,
  },
  menuBoton: {
    marginVertical: 4,
    marginRight: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  menuBotonText: {
    fontSize: 20,
    color: "#FF4848",
    marginLeft: 8,
  },
  version: {
    textAlign: "center",
    paddingBottom: 30,
    color: "gray",
  },
  imagenFondo: {
    justifyContent: "center",
  },
});
