import React from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Recipe(props) {
  let propsItem = props;
  let navigation = useNavigation();

  let image;
  if (props.item.strMealThumb) {
    image = { uri: props.item.strMealThumb };
  } else {
    image = {
      uri:
        "https://libreshot.com/wp-content/uploads/2016/07/healthy-food.jpg",
    };
  }

  let title = props.item.strMeal

  return (
    <View style={styles.RecipeContainer}>
      <View style={{ marginRight: 10, alignItem: "center" }}>
        <TouchableHighlight
          onPress={() => navigation.navigate("RecipeScreen", { propsItem })}
        >
          <Image
            progressiveRenderingEnabled={true}
            style={{ width: 55, height: 55 }}
            source={image}
          />
        </TouchableHighlight>
      </View>
      <View>
        <Text
          onPress={() => navigation.navigate("RecipeScreen", { propsItem })}
          style={{ fontWeight: "bold", maxWidth: 250 }}
        >
          {title}
        </Text>
        <Text>{props.item.strArea}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  RecipeContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
  },
});