import { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const GlobalContainer = (props: PropsWithChildren) => {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#352F44",
  },
});

export default GlobalContainer;
