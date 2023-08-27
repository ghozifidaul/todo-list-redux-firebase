import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalContainer from "../components/GlobalContainer";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadingDataSelector,
  selectedTodoSelector,
  toggleLoading,
} from "../store/todoListSlice";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParam } from "../routes/types";

const EditTaskScreen = () => {
  const selectedTodo = useAppSelector(selectedTodoSelector);
  const globalLoading = useAppSelector(loadingDataSelector);
  const dispatch = useAppDispatch();

  const [title, onChangeTitle] = useState(selectedTodo.title);
  const [description, onChangeDescription] = useState(selectedTodo.description);

  const navigation = useNavigation<NativeStackNavigationProp<RoutesParam>>();

  const updateData = async () => {
    dispatch(toggleLoading(true));
    const todoRef = doc(db, "todos", selectedTodo.id);

    await updateDoc(todoRef, {
      title,
      description,
    });
    dispatch(toggleLoading(false));
    navigation.goBack();
  };

  return (
    <>
      <Header title="Edit Task" backBtn={true} />
      <GlobalContainer>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.labelText}>Title*</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={onChangeTitle}
              value={title}
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
          </View>
          {globalLoading ? (
            <ActivityIndicator style={{ padding: 20 }} />
          ) : (
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={() => updateData()}
            >
              <Text style={{ fontWeight: "700", color: "#352F44" }}>
                Update
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

export default EditTaskScreen;
