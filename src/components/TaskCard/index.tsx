import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  fetchTodosFromFirestore,
  toggleLoading,
} from "../../store/todoListSlice";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useAppDispatch } from "../../store/hooks";
import { ToDoList } from "../../store/types/todos";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const TaskCard = (props: ToDoList) => {
  const dispatch = useAppDispatch();

  const deleteTodo = async (id: string) => {
    dispatch(toggleLoading(true));
    await deleteDoc(doc(db, "todos", id));
    dispatch(toggleLoading(false));
    dispatch(fetchTodosFromFirestore());
  };

  const toggleTodo = async () => {
    dispatch(toggleLoading(true));
    const todoRef = doc(db, "todos", props.id);

    await updateDoc(todoRef, {
      status: !props.status,
    });
    dispatch(toggleLoading(false));
    dispatch(fetchTodosFromFirestore());
  };

  return (
    <View style={styles.itemContainer}>
      <Checkbox
        value={props.status}
        onValueChange={() => toggleTodo()}
        style={{ marginRight: 20 }}
      />
      <View>
        <Text
          style={props.status ? styles.taskTitleCompleted : styles.taskTitle}
        >
          {props.title}
        </Text>
        <Text
          style={
            props.status
              ? {
                  fontStyle: "italic",
                  color: "#5C5470",
                  textDecorationLine: "line-through",
                }
              : { fontStyle: "italic", color: "#5C5470" }
          }
        >
          {props.description}
        </Text>
        {props.status ? (
          <Text style={{ fontStyle: "italic", color: "#5C5470" }}>
            Completed
          </Text>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        style={styles.btnEdit}
        onPress={() => {
          console.log("edit task");
        }}
      >
        <Feather name="edit" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => {
          // console.log("delete task");
          deleteTodo(props.id);
        }}
      >
        <MaterialIcons name="delete-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#B9B4C7",
    borderColor: "#B9B4C7",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  btnEdit: {
    backgroundColor: "#FAF0E6",
    padding: 10,
    borderRadius: 8,
    marginLeft: "auto",
  },
  btnDelete: {
    backgroundColor: "#FAF0E6",
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  taskTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#352F44",
  },
  taskTitleCompleted: {
    fontWeight: "700",
    fontSize: 18,
    color: "#352F44",
    textDecorationLine: "line-through",
  },
});

export default TaskCard;
