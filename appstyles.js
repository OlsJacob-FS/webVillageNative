import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
//#affac9
//dce1e8
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9fa1a0",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    textAlign: "center",
    gap: 1,
    margin: 20,
    fontSize: 26,
    fontStyle: "bold",
  },
  listItems: {
    fontSize: 20,
    margin: 15,
    alignContent: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#4d91ff",
    borderRadius: 20,
    elevation: 3,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 500,
  },
  characterContainer: {
    margin: 40,
    flex: 0,
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  characterText: {
    fontSize: 25,
    margin: 15,
  },
  formInput: {
    borderRadius: 15,
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  descText: {
    fontSize: 15,
    fontWeight: 600,
    margin: 10,
  },
  contentContainer: {
    paddingBottom: 50,
  },
});

export default styles;
