import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchTodosFromFirestore,
  loadingDataSelector,
  toDoListSelector,
} from "../store/todoListSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParam } from "../routes/types";
import GlobalContainer from "../components/GlobalContainer";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { PropsWithChildren, useEffect } from "react";

const HomeScreen = (props: PropsWithChildren) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<RoutesParam>>();

  let todosList = useAppSelector(toDoListSelector);
  let loadingDataTodos = useAppSelector(loadingDataSelector);
  const dispatch = useAppDispatch();

  const getDataFromFirestore = () => dispatch(fetchTodosFromFirestore());

  useEffect(() => {
    getDataFromFirestore();
  }, [props, isFocused]);

  return (
    <>
      <Header title="Home" backBtn={false} />
      <GlobalContainer>
        <View style={styles.homeContainer}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => {
              navigation.navigate("AddTaskScreen");
            }}
          >
            <Text style={styles.btnAddText}>Add Task</Text>
          </TouchableOpacity>
          <View
            style={
              todosList.length != 0
                ? styles.listContainer
                : styles.emptyContainer
            }
          >
            {todosList.length != 0 ? (
              loadingDataTodos ? (
                <ActivityIndicator style={{ marginBottom: 20 }} />
              ) : (
                <>
                  <Text
                    style={{
                      marginBottom: 20,
                      fontWeight: "700",
                      color: "#B9B4C7",
                      fontSize: 18,
                    }}
                  >
                    To Do List
                  </Text>
                  <FlatList
                    keyExtractor={(item, index) => item.id + index}
                    data={todosList}
                    renderItem={({ item }) => {
                      return (
                        <TaskCard
                          title={item.title}
                          description={item.description}
                          id={item.id}
                          status={item.status}
                        />
                      );
                    }}
                  />
                </>
              )
            ) : (
              <Text
                style={{
                  color: "#B9B4C7",
                  textAlign: "center",
                  marginBottom: 10,
                  fontStyle: "italic",
                }}
              >
                Task Empty
              </Text>
            )}
          </View>
        </View>
      </GlobalContainer>
    </>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    padding: 20,
  },
  listContainer: {
    marginTop: 20,
    backgroundColor: "#5C5470",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
  },
  emptyContainer: {
    // flex: 1,
    height: 200,
    justifyContent: "center",
  },
  btnAdd: {
    height: 50,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#FAF0E6",
    justifyContent: "center",
  },
  btnAddText: {
    color: "#352F44",
    fontWeight: "700",
  },
});

export default HomeScreen;
