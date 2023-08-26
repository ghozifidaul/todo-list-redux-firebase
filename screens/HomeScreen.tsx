import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToDoList, toDoListSelector } from "../store/todoListSlice";

const HomeScreen = () => {
  const [text, onChangeText] = useState("");

  const todosList = useAppSelector(toDoListSelector);
  const dispatch = useAppDispatch();
  return (
    <View>
      <StatusBar style="dark" />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Put Your To-Do Here"
      />
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => {
          dispatch(
            addToDoList({
              id: "2",
              title: text,
              description: "Empty",
              reminder: "empty",
              status: false,
            })
          );
        }}
      >
        <Text style={{ color: "white" }}>Add To Do List</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id + index}
          data={todosList}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  listContainer: {
    margin: 10,
  },
  btnAdd: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "blue",
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default HomeScreen;
