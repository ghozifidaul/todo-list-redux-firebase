import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import GlobalContainer from "../components/GlobalContainer";
import Header from "../components/Header";
import { useAppDispatch } from "../store/hooks";
import { addToDoList } from "../store/todoListSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParam } from "../routes/types";

const AddTaskScreen = () => {
  const [text, onChangeText] = useState("");
  const [description, onChangeDescription] = useState("");
  const [reminder, onChangeReminder] = useState("");

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RoutesParam>>();

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
            <Text style={styles.labelText}>Reminder (Optional)</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={onChangeReminder}
              value={reminder}
              placeholder="Pur your task's title here"
            />
          </View>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              dispatch(
                addToDoList({
                  id: text,
                  title: text,
                  description: description,
                  status: false,
                })
              );

              navigation.goBack();
            }}
          >
            <Text style={{ fontWeight: "700", color: "#352F44" }}>Submit</Text>
          </TouchableOpacity>
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
