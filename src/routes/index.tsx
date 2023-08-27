import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import EditTaskScreen from "../screens/EditTaskScreen";

const Stack = createNativeStackNavigator();

const routes = () => {
  const { Navigator, Screen } = Stack;
  return (
    <Navigator>
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="AddTaskScreen"
        component={AddTaskScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="EditTaskScreen"
        component={EditTaskScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default routes;
