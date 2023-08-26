import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Routes from "./routes";

function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
