import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import firebase from "../database/firebase";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import cookie from "../assets/images/cookie.png";

import TextRecipe from "../components/TextRecipe";
import ImageRecipe from "../components/ImageRecipe";
import LinkRecipe from "../components/LinkRecipe";
import NoteRecipe from "../components/NoteRecipe";
import TimerRecipe from "../components/TimerRecipe";
import Return from "../components/Return";

const Tags = [
  { Texto: "Frutas", Color: "#ff4d6d" },
  { Texto: "Verduras", Color: "#bcefa9" },
  { Texto: "Cereal", Color: "#f9dc5c" },
  { Texto: "Carne", Color: "#e76f51" },
  { Texto: "Jugo", Color: "#fdc500" },
  { Texto: "Azúcar", Color: "#e2afff" },
  { Texto: "Dulce", Color: "#4361ee" },
  { Texto: "Salado", Color: "#f7d6e0" },
  { Texto: "Seco", Color: "#83c5be" },
];

const Tag = ({ ID = 0, receta }) => {
  const [selected, setSelected] = useState(false);

  const selectTag = () => {
    if (!selected) {
      receta.Lista.push(ID);
    } else {
      receta.Lista.splice(receta.Lista.indexOf(ID), 1);
    }

    setSelected(!selected);
  };

  return (
    <TouchableOpacity
      style={{
        ...Estilo.tag,
        backgroundColor: selected ? Tags[ID].Color : "#F1ECEC",
        borderColor: Tags[ID].Color,
        borderWidth: 2,
      }}
      onPress={() => selectTag()}
    >
      <Text
        style={{
          fontStyle: "italic",
        }}
      >
        {Tags[ID].Texto}
      </Text>
    </TouchableOpacity>
  );
};

const CreateRecipe = ({
  navigation,route 
}) => {
  const [Titulo, setTitulo] = useState( (route.params != undefined)?route.params.Receta.Datos.Title:"");
  const [Descripcion, setDescripcion] = useState( (route.params != undefined)?route.params.Receta.Datos.Desc:"");
  const [Favorito, setFavorito] = useState( (route.params != undefined)?route.params.Receta.Datos.Fav:false);
  const [Etiquetas, setEtiquetas] = useState( (route.params != undefined)?route.params.Receta.Datos.Tags:[]);
  const [Componentes, setComponentes] = useState( (route.params != undefined)?route.params.Receta.Datos.Components:[]);
  const [image, setImage] = useState( (route.params != undefined)?route.params.Receta.Datos.Photo:-1);
  const [Tiempo, setTiempo] = useState( (route.params != undefined)?route.params.Receta.Datos.Time:{ Minutos: 0, Segundos: 0 });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Es necesario los permisos de camara para crear la receta"
          );
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const createComponente = (value) => {
    setComponentes([...Componentes, { Tipo: value, Visible: true }]);
  };

  const ColocarComponente = (value, index) => {
    switch (value.Tipo) {
      case 0:
        return <TextRecipe key={index} Componente={{ Datos: value }} />;
      case 1:
        return <ImageRecipe key={index} Componente={{ Datos: value }} />;

      case 2:
        return <TimerRecipe key={index} Componente={{ Datos: value }} />;

      case 3:
        return <NoteRecipe key={index} Componente={{ Datos: value }} />;

      case 4:
        return <LinkRecipe key={index} Componente={{ Datos: value }} />;

      default:
        return (
          <Text key={index}>Componente incompotatible, Tipo: {value.Tipo}</Text>
        );
    }
  };

  const saveRecipe = async () => {
    const newLista = [];
    for (let index = 0; index < Componentes.length; index++) {
      if (Componentes[index].Visible) {
        newLista.push(Componentes[index]);
      }
    }

    setComponentes(newLista);
    const Recipe = {
      Title: Titulo,
      Desc: Descripcion,
      Fav: Favorito,
      Time: Tiempo,
      Photo: image,
      Tags: Etiquetas,
      Components: newLista,
    };

    await firebase.db.collection("recipe").add(Recipe);
    navigation.navigate("Home")
  };

  const updateRecipe = async () => {
    const newLista = [];
    for (let index = 0; index < Componentes.length; index++) {
      if (Componentes[index].Visible) {
        newLista.push(Componentes[index]);
      }
    }

    setComponentes(newLista);
    const Recipe = {
      Title: Titulo,
      Desc: Descripcion,
      Fav: Favorito,
      Time: Tiempo,
      Photo: image,
      Tags: Etiquetas,
      Components: newLista,
    };

    await firebase.db.collection("recipe").doc(route.params.Receta.Datos.id).update(Recipe);
    Alert.alert('Receta Actualizada')
    navigation.navigate("Home")

  };

  const imprimir = () =>{
    console.log(Componentes)
  }

  return (
    <View style={Estilo.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor={"#F1ECEC"}
      />
      <ScrollView>
        <Return navigation={navigation} />
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => selectImage()}
        >
          <Image
            style={Estilo.imgPortada}
            source={image == -1 ? cookie : { uri: image }}
          />
        </TouchableOpacity>
        <TextInput
          maxLength={50}
          style={Estilo.nameReceta}
          placeholder={"Nombre de la Receta"}
          value={Titulo}
          onChangeText={(value) => {
            setTitulo(value);
          }}
        />

        <TextInput
          multiline
          numberOfLines={4}
          maxLength={250}
          style={Estilo.desc}
          placeholder={"Descripción de la receta"}
          value={Descripcion}
          onChangeText={(value) => {
            setDescripcion(value);
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              ...Estilo.listaTags,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name={"stopwatch-outline"} size={40} color="#FF4848" />
            <TextInput
              style={Estilo.timeText}
              placeholder={"Minutos"}
              value={(Tiempo.Minutos).toString()}
              onChangeText={(value) => {
                setTiempo({ ...Tiempo, Minutos: Number(value) });
              }}
            />
            <Text style={{ color: "#FF4848", fontSize: 30 }}>:</Text>
            <TextInput
              style={Estilo.timeText}
              placeholder={"Segundos"}
              value={Tiempo.Segundos.toString()}
              onChangeText={(value) => {
                setTiempo({ ...Tiempo, Segundos: Number(value) });
              }}
            />
          </View>

          <View
            style={{
              ...Estilo.listaTags,
              marginHorizontal: 0,
              flex: 1,
              marginRight: 16,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setFavorito(!Favorito)}>
              <Ionicons
                name={Favorito ? "star" : "star-outline"}
                size={40}
                color="#FF4848"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <Ionicons name={"pricetags"} size={18} color="#FF4848" />
          <Text style={Estilo.tagsText}>Tags</Text>
        </View>

        <ScrollView style={Estilo.listaTags} horizontal={true}>
          {Tags.map((prop, key) => {
            return <Tag key={key} ID={key} receta={{ Lista: Etiquetas }} />;
          })}
        </ScrollView>

        {/* Creación de componentes*/}
        {Componentes.map((value, index) => {
          return ColocarComponente(value, index);
        })}

        <TouchableOpacity style={Estilo.save} onPress={() =>(route.params != undefined)?updateRecipe() :saveRecipe()}>
          <Text style={Estilo.saveText}>{(route.params != undefined)?'Actualizar Receta':'Guardar Receta'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={Estilo.menu}>
        <TouchableOpacity
          style={Estilo.menuOp}
          onPress={() => {
            createComponente(0);
          }}
        >
          <Ionicons name={"create-outline"} size={40} color="#FF4848" />
          <Text style={Estilo.menuDesc}>Texto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Estilo.menuOp}
          onPress={() => {
            createComponente(1);
          }}
        >
          <Ionicons name={"image-outline"} size={40} color="#FF4848" />
          <Text style={Estilo.menuDesc}>Imagen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Estilo.menuOp}
          onPress={() => {
            createComponente(3);
          }}
        >
          <Ionicons name={"document-outline"} size={40} color="#FF4848" />
          <Text style={Estilo.menuDesc}>Nota</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Estilo.menuOp}
          onPress={() => {
            createComponente(4);
          }}
        >
          <Ionicons name={"link-outline"} size={40} color="#FF4848" />
          <Text style={Estilo.menuDesc}>Link</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{backgroundColor:'green', padding: 32}} onPress={() => imprimir()}>
        <Text style={{textAlign:'center'}}>Imprimir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRecipe;

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1ECEC",
  },
  imgPortada: {
    resizeMode: "contain",
    width: 200,
    height: 200,
  },
  nameReceta: {
    borderBottomWidth: 1,
    borderColor: "#FF4848",
    padding: 4,
    marginHorizontal: 16,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  desc: {
    borderWidth: 1,
    borderColor: "#FF4848",
    borderRadius: 8,
    padding: 10,
    margin: 16,
  },
  listaTags: {
    margin: 16,
    borderWidth: 1,
    borderColor: "#FF4848",
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 2,
    marginTop: 0,
  },
  tagsText: {
    marginLeft: 4,
    fontWeight: "bold",
    color: "#FF4848",
  },
  tag: {
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  save: {
    alignItems: "center",
    backgroundColor: "#FF4848",
    marginHorizontal: 16,
    padding: 8,
    borderRadius: 12,
    marginVertical: 10,
  },
  saveText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",

    marginBottom: 12,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  menuDesc: {
    color: "#FF4848",
    fontSize: 10,
  },
  menuOp: {
    alignItems: "center",
  },
  timeText: {
    borderBottomWidth: 1,
    borderBottomColor: "#FF4848",
    paddingVertical: 4,
    textAlign: "center",
    marginHorizontal: 4,
  },
});
