import { StatusBar } from "expo-status-bar";
import {
  Text,
  SafeAreaView,
  Button,
  FlatList,
  TouchableOpacity,
  Pressable,
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
      <Text style={styles.welcome}>
        Welcome to the Village hidden in the Web
      </Text>
      <Text style={styles.welcome}>Meet our Shinobi</Text>
      <FlatList
        data={character}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Character", item)}
          >
            <Text style={styles.listItems}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
      <Pressable
        onPress={() => navigation.navigate("CreateShinobi")}
        style={[styles.btn]}
      >
        <Text style={styles.btnText}>Create Shinobi</Text>
      </Pressable>
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
          options={{ title: "Web Village" }}
        />
        <stack.Screen
          name="CreateShinobi"
          component={CreateShinobi}
          options={{ title: "Create Shinobi" }}
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
