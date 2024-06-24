import { Text, View, SafeAreaView, TextInput, Button } from "react-native";
//css styles import
import styles from "../appstyles";
import { useState } from "react";

export default function CreateShinobi() {
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
  };

  const handleSubmit = () => {
    createCharacter();
  };

  const handleInputChanges = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
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
          />
          <Button
            title={isPosting ? "Creating..." : "Create Shinobi"}
            type="submit"
            color="maroon"
            onPress={createCharacter}
            disabled={isPosting}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
