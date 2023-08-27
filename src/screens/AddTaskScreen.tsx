import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import GlobalContainer from "../components/GlobalContainer";
import Header from "../components/Header";
import { useAppDispatch } from "../store/hooks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParam } from "../routes/types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const AddTaskScreen = () => {
  const [text, onChangeText] = useState("");
  const [description, onChangeDescription] = useState("");
  // const [reminder, onChangeReminder] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RoutesParam>>();

  const addToDoListToFirestore = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: text,
        description: description,
        reminder: new Date(),
        status: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Add Task" backBtn={true} />
      <GlobalContainer>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.labelText}>Title*</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={onChangeText}
              value={text}
              placeholder="Pur your task's title here"
            />
            <Text style={styles.labelText}>Description*</Text>
            <TextInput
              style={styles.textAreaStyle}
              onChangeText={onChangeDescription}
              value={description}
              placeholder="Put your task's description here"
              multiline={true}
              numberOfLines={5}
            />
            {/* <Text style={styles.labelText}>Reminder (Optional)</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={onChangeReminder}
              value={reminder}
              placeholder="Pur your task's title here"
            /> */}
          </View>
          {loading ? (
            <ActivityIndicator style={{ padding: 20 }} />
          ) : (
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={() => addToDoListToFirestore()}
            >
              <Text style={{ fontWeight: "700", color: "#352F44" }}>
                Submit
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </GlobalContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#B9B4C7",
    marginBottom: 10,
  },
  textAreaStyle: {
    minHeight: 128,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#B9B4C7",
    marginBottom: 10,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#5C5470",
    borderRadius: 8,
  },
  labelText: {
    marginBottom: 10,
    color: "white",
    fontWeight: "700",
  },
  btnSubmit: {
    backgroundColor: "#B9B4C7",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 30,
  },
});

export default AddTaskScreen;
