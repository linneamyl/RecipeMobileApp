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
    let itemId = propsItem.item.idMeal;
    const [isReady, setReady] = useState(false)
    const [recipeById, setRecipeById] = useState()
    
   // console.log(recipeById, 'TÄMÄ')
    console.log(itemId)
     //let desc = recipeById.strInstructions
    // console.log(id, 'ID')
    // const image = { uri: recipeById[0].strMealThumb };
    // console.log(image, 'IMAGE')
    let image = { uri: propsItem.item.strMealThumb };

    function fetchRecipeById(){
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + itemId)
        .then((response) => response.json())
        .then((responseData) => {
          setRecipeById(responseData.meals[0])
          console.log(responseData.meals[0])
        })
        .then(data => setReady(true))
        .catch((error) => {
          Alert.alert('Error', error.message)
        });
    }

    useEffect(() => {
        fetchRecipeById();
      }, []); 

  
    if (isReady === true){
    return(
        <View style={styles.RecipeScreenContainer}>
            <Image
              style={styles.Image}
              source={image}
              progressiveRenderingEnabled={true}
            />
            <Text>{recipeById.strMeal}</Text>
        </View>
    )
    } else {
      return(
        <View style={styles.RecipeScreenContainer}>
            
            <Text>loading...</Text>
        </View>
    )
    }
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
  