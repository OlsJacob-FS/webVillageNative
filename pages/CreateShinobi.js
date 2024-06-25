import { Text, View, SafeAreaView, TextInput, Pressable } from "react-native";
//css styles import
import styles from "../appstyles";
//React imports
import { useState } from "react";
//component imports:
import KeyboardAvoidingContainer from "../components/KeyboardAviodingContainer";

export default function CreateShinobi({ navigation }) {
  //character variables
  const [characterName, setCharacterName] = useState("");
  const [characterAge, setCharacterAge] = useState("");
  const [characterVillage, setCharacterVillage] = useState("");
  //post loader
  const [isPosting, setIsPosting] = useState(false);

  const createCharacter = async () => {
    setIsPosting(true);
    await fetch(
      "https://narutoapi-089492ce1dc8.herokuapp.com/api/v1/characters",
      {
        method: "POST",
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
    setIsPosting(false);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Add A Shinobi To Our Ranks</Text>
      <KeyboardAvoidingContainer>
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
            style={styles.formInput}
          />
          <Pressable
            title={isPosting ? "Creating..." : "Create Shinobi"}
            type="submit"
            color="maroon"
            onPress={createCharacter}
            disabled={isPosting}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Add Shinobi</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingContainer>
    </SafeAreaView>
  );
}
