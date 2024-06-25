import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "react-native";
//css styles import
import styles from "../appstyles";
//react imports
import { useEffect, useState } from "react";
//Components Imports
import KeyboardAvoidingContainer from "../components/KeyboardAviodingContainer";

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
      <KeyboardAvoidingContainer>
        <View>
          <Text style={styles.characterText}> Meet {route.params.name}</Text>
          <View style={styles.characterContainer}>
            <Text>Shinobi Info:</Text>
            <Text style={styles.characterText}> Age: {route.params.age}</Text>
            <Text style={styles.characterText}>
              Village: {route.params.village}
            </Text>
            <Pressable
              title="Delete"
              onPress={() => deleteCharacter()}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Delete Shinobi</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.descText}>Edit Shinobi Information:</Text>
          <View>
            <TextInput
              placeholder="Name"
              onChangeText={setCharacterName}
              value={characterName}
              style={styles.formInput}
            />
            <TextInput
              placeholder="Age"
              onChangeText={setCharacterAge}
              value={characterAge}
              keyboardType="numeric"
              style={styles.formInput}
            />
            <TextInput
              multiline
              placeholder="Village"
              onChangeText={setCharacterVillage}
              value={characterVillage}
              onEndEditing={Keyboard.dismiss}
              style={styles.formInput}
            />
            <Pressable
              style={styles.btn}
              type="submit"
              color="maroon"
              onPress={updateCharacter}
              disabled={isUpdating}
            >
              <Text style={styles.btnText}>Edit Shinobi</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </SafeAreaView>
  );
}
