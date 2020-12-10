import React, { useEffect, useState } from 'react';
import { View,
         Text,  
         StyleSheet,
         Image,
         Alert,
         ActivityIndicator, 
         FlatList } 
from 'react-native';

export default function RecipeScreen({ route, navigation }) {

    const { propsItem } = route.params;
    let itemId = propsItem.item.idMeal
    
    const [recipeById, setRecipeById] = useState({})
    
    console.log(recipeById, 'TÄMÄ')
    // let id = recipeById[0].idMeal
    // console.log(id, 'ID')
    // const image = { uri: recipeById[0].strMealThumb };
    // console.log(image, 'IMAGE')
    let image = { uri: propsItem.item.strMealThumb };

    function fetchRecipeById(){
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + itemId)
        .then((response) => response.json())
        .then((responseData) => {
          setRecipeById(responseData.meals[0])
          console.log(recipeById)
        })
        .catch((error) => {
          Alert.alert('Error', error.message)
        });
    }

    useEffect(() => {
        fetchRecipeById();
      }, []); 

  
  
    return(
        <View style={styles.RecipeScreenContainer}>
            <Image
              style={styles.Image}
              source={image}
              progressiveRenderingEnabled={true}
            />
            <Text>moro</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    RecipeScreenContainer: {
      flex: 1,
    },
    ActivityIndicator: {
      flex: 1,
    },
    Image: {
      flex: 1,
    
    },
    Infobox: {
      padding: 5,
    },
  });
  