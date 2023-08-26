import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParam } from "../../routes/types";

interface HeaderProps {
  title: string;
  backBtn: boolean;
}

const Header = (props: HeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RoutesParam>>();

  return (
    <View
      style={props.backBtn ? styles.containerWithBackBtn : styles.container}
    >
      {props.backBtn ? (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 80,
    backgroundColor: "#5C5470",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerWithBackBtn: {
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: "row",
    height: 80,
    backgroundColor: "#5C5470",
    alignItems: "center",
    // alignItems: "flex-end",
    // justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    // alignSelf: "center",
  },
  btnBack: {
    marginRight: 10,
  },
});

export default Header;
