import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import CreateRecipe from "./screens/CreateRecipe";
import ViewRecipe from "./screens/ViewRecipe";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Crear Receta"
          component={CreateRecipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vista Receta"
          component={ViewRecipe}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}