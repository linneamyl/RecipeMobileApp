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
        let ingredients = []
        for (let entry of Object.entries(recipeById)) {
            if (entry[0].includes("strIngredient")) {
                ingredients.push(entry[1]);
            }
        }
        const cleanedIngrArray =  ingredients.filter(e =>  e);

        let measures = []
        for (let entry of Object.entries(recipeById)) {
          if (entry[0].includes("strMeasure")) {
              measures.push(entry[1]);
          }
        }
        const cleanedMeasArray =  measures.filter(e =>  e);
        console.log(cleanedMeasArray)
      return(
          <View style={styles.RecipeScreenContainer}>
              <Image
                style={styles.Image}
                source={image}
                progressiveRenderingEnabled={true}
              />
              <View style={styles.recipeInfo}>
                  <Text style={styles.text}>{recipeById.strMeal}</Text>
                  <Text style={styles.text}>{recipeById.strInstructions}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
              <View>
              { cleanedMeasArray.map((item, key)=>(
                <Text key={key}> { item } </Text>)
              )}
              </View>
                <View>
              { cleanedIngrArray.map((item, key)=>(
                <Text key={key}> { item } </Text>)
              )}
              </View>
              
              </View>
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
      flex: 1.5,
    },
    recipeInfo: {
      flex: 2,
      alignItems: "center"
    },
    text: {
      padding: 5
    }
  });
  