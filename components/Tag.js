import React from "react";
import { View,StyleSheet,TouchableOpacity,Text } from "react-native";

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

const Tag = ({ ID = 0 }) => {
  return (
    <TouchableOpacity
      style={{
        ...Estilo.tag,
        backgroundColor: Tags[ID].Color,
      }}
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

export default Tag;

const Estilo = StyleSheet.create({
  tag: {
    padding: 4,
    marginRight: 8,
    borderRadius: 4,
  },
});
