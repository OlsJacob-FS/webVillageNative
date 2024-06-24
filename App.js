import { StatusBar } from "expo-status-bar";
import {
  Text,
  SafeAreaView,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
//css styles import
import styles from "./appstyles";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//pages imports
import CreateShinobi from "./pages/CreateShinobi";

import Character from "./pages/Character";

import React, { useState } from "react";

function Home({ navigation }) {
  const [character, setCharacter] = useState(null);
  //API call
  fetch(`https://narutoapi-089492ce1dc8.herokuapp.com/api/v1/characters`)
    .then((res) => res.json())
    .then((data) => setCharacter(data));

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to the Village hidden in the Web</Text>
      <FlatList
        data={character}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Character", item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        style={styles.listContainer}
      />
      <Button
        title="Create Shinobi "
        onPress={() => navigation.navigate("CreateShinobi")}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// <stack.Screen name="Details" component={Details} />
//       <stack.Screen name="Categories" component={Categories} />

const stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Village" }}
        />
        <stack.Screen
          name="CreateShinobi"
          component={CreateShinobi}
          options={{ title: "Village" }}
        />
        <stack.Screen
          name="Character"
          component={Character}
          options={{ title: "Character" }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
