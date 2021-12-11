import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MenuDrawer from "react-native-side-drawer";
import { Ionicons } from "@expo/vector-icons";

const Menu = () => {

    const [Open, setOpen] = useState(false)

  toggleOpen = () => {
    setOpen(!Open);
  };

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={() => toggleOpen()} style={styles.animatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
    );
  };

  return (
    <MenuDrawer
      open={Open}
      drawerContent={drawerContent()}
      drawerPercentage={45}
      animationTime={250}
      overlay={true}
      opacity={0.4}
    >
      <View style={styles.top}>
        <View style={{ justifyContent: "center", marginStart: 8 }}>
          <TouchableOpacity>
            <Ionicons name="menu" size={40} color="#B8B8B8" />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>CookNote</Text>
        <View style={{ justifyContent: "center", marginEnd: 8 }}>
          <TouchableOpacity>
            <Ionicons name="sunny" size={40} color="#B8B8B8" />
          </TouchableOpacity>
        </View>
      </View>
    </MenuDrawer>
  );
};

export default Menu


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      zIndex: 0
    },
    animatedBox: {
      flex: 1,
      backgroundColor: "#38C8EC",
      padding: 10
    },
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FF4848",
        borderRadius: 200,
        flex: 1,
      },
      top: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        backgroundColor: "white",
        borderColor: "#FF4848",
      },
  })