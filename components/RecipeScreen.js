import React, { useEffect, useState } from 'react';
import { View,
         Text,  
         StyleSheet,
         Image,
         Alert,
         ScrollView } 
from 'react-native';

export default function RecipeScreen({ route }) {

    const { propsItem } = route.params;
    const [isReady, setReady] = useState(false)
    const [recipeById, setRecipeById] = useState()
    
    let itemId = propsItem.item.idMeal;
    let image = { uri: propsItem.item.strMealThumb };
    
    function fetchRecipeById(){
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + itemId)
        .then((response) => response.json())
        .then((responseData) => {
          setRecipeById(responseData.meals[0])
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

        // The MealDB:n APIssa joissain resepteissä tyhjät
        const firstFilterIng =  ingredients.filter(item => item != "") ;
        const secondFilterIng = firstFilterIng.filter(item => item != " " )

        let measures = []
        for (let entry of Object.entries(recipeById)) {
          if (entry[0].includes("strMeasure")) {
              measures.push(entry[1]);
          }
        }
        const firstFilterMeas =  measures.filter(item => item != "") 
        const secondFilterMeas = firstFilterMeas.filter(item => item != " " )

      return(
          <ScrollView style={styles.RecipeScreenContainer}>
              <View style = {{alignItems: 'center'}}> 
                <Image
                  style={styles.Image}
                  source={image}
                  progressiveRenderingEnabled={true}
                />
              </View> 
              <View style={styles.recipeInfo}>
                  <Text style={styles.title}>{recipeById.strMeal}</Text>
              </View>
              <View style={styles.ingredientsContainer}>
                <View>
                  { secondFilterMeas.map((item, key)=>(
                    <Text key={key}> { item } </Text>)
                  )}
                </View>
                <View>
                  { secondFilterIng.map((item, key)=>(
                    <Text key={key}> { item } </Text>)
                  )}
                </View>
              </View>
              <Text style={styles.text}>{recipeById.strInstructions}</Text>
          </ScrollView>
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
      flex: 1
    },
    Image: {
      resizeMode: 'contain',
       width: 300, 
       height: 300,
    },
    recipeInfo: {
      alignItems: "center"
    },
    title: {
      padding: 5,
      fontWeight: 'bold',
      fontSize: 18
    },
    text: {
      padding: 10,
    },
    ingredientsContainer: {
      flexDirection: 'row',
      padding: 10
    }
  });
  