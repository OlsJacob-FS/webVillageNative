import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, TextInput, Keyboard } from "react-native";
import { Button } from "react-native";
//css styles import
import styles from "../appstyles";
import { useEffect, useState } from "react";

export default function Character({ navigation, route }) {
  //character variables
  const [characterName, setCharacterName] = useState("");
  const [characterAge, setCharacterAge] = useState("");
  const [characterVillage, setCharacterVillage] = useState("");
  //post loader
  const [isUpdating, setIsUpdating] = useState(false);
  const id = route.params._id;

  const deleteCharacter = async () => {
    // const [characters, setCharacters] = useState(null);
    try {
      await fetch(
        `https://narutoapi-089492ce1dc8.herokuapp.com/api/v1/characters/${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then(() => {
          navigation.navigate("Home");
        });
    } catch {}
  };

  const updateCharacter = async () => {
    setIsUpdating(true);
    await fetch(
      `https://narutoapi-089492ce1dc8.herokuapp.com/api/v1/characters/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: characterName,
          age: characterAge,
          village: characterVillage,
        }),
      }
    );
    setCharacterAge("");
    setCharacterName("");
    setCharacterVillage("");
    setIsUpdating(false);
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text> ID: {route.params._id}</Text>
      <Text> Name: {route.params.name}</Text>
      <Text> Age: {route.params.age}</Text>
      <Text> Village: {route.params.village}</Text>
      <Button title="Delete" onPress={() => deleteCharacter()} />
      <View>
        <View>
          <TextInput
            placeholder="Name"
            onChangeText={setCharacterName}
            value={characterName}
          />
          <TextInput
            placeholder="Age"
            onChangeText={setCharacterAge}
            value={characterAge}
            keyboardType="numeric"
          />
          <TextInput
            multiline
            placeholder="Village"
            onChangeText={setCharacterVillage}
            value={characterVillage}
            onEndEditing={Keyboard.dismiss}
          />
          <Button
            title={isUpdating ? "Updating..." : "Update Shinobi"}
            type="submit"
            color="maroon"
            onPress={updateCharacter}
            disabled={isUpdating}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
