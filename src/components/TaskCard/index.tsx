import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ToDoList } from "../../store/todoListSlice";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const TaskCard = (props: ToDoList) => {
  return (
    <View style={styles.itemContainer}>
      <Checkbox
        value={props.status}
        onValueChange={(value) => {}}
        style={{ marginRight: 20 }}
      />
      <View>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 18,
            color: "#352F44",
          }}
        >
          {props.title}
        </Text>
        <Text style={{ fontStyle: "italic", color: "#5C5470" }}>
          {props.description}
        </Text>
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
          console.log("delete task");
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
});

export default TaskCard;
