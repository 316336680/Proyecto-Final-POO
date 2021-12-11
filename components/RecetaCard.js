import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Galleta from '../assets/images/cookie.png'

import Tag from "./Tag";

const RecetaCard = ({ Receta, navigation }) => {
  const [Fav, setFav] = useState(Receta.Datos.Fav);

  const changeFav = (Fav) => {
    setFav(!Fav);
    Receta.Datos.Fav = Fav;
  };

  const imprimir = () => {
    navigation.navigate("Vista Receta",{Receta: Receta})
  };

  return (
    <View style={Estilo.card}>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => imprimir()}
      >
        <View style={Estilo.fotoView}>
          <Image
            source={(Receta.Datos.Photo == -1)?Galleta:{
              uri: Receta.Datos.Photo,
            }}
            style={Estilo.foto}
          />
        </View>

        <View style={Estilo.desc}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={Estilo.titulo}>{Receta.Datos.Title}</Text>
              <Text>{Receta.Datos.Desc}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => changeFav(Fav)}>
                <Ionicons
                  name={Fav ? "star" : "star-outline"}
                  size={25}
                  color="#FF4848"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity onPress={() => imprimir()} style = {Estilo.Tiempo}>
                <Ionicons name="time" size={15} color="#858585" />
                <Text style={{ ...Estilo.reloj }}>
                  {Receta.Datos.Time.Minutos}:{Receta.Datos.Time.Segundos}
                </Text>
              </TouchableOpacity>

              {Receta.Datos.Tags.map((value) => {
                return <Tag ID={value} key={value} />;
              })}
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecetaCard;

const Estilo = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginTop: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  fotoView: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C1FFD7",
    margin: 16,
    borderRadius: 8,
    alignSelf: "center",
  },
  foto: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },

  desc: {
    marginVertical: 16,
    marginRight: 16,
    justifyContent: "space-between",
    flex: 1,
  },

  titulo: {
    fontWeight: "bold",
  },

  reloj: {
    color: "black",
    fontStyle: "italic",
    fontSize: 12,
    marginLeft: 4,
  },
  Tiempo:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginRight: 8,
    borderRadius: 4,
    paddingRight: 8,
  },
});
 