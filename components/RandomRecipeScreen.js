import React from 'react';
import { View,
         Text,  
         StyleSheet,
         Image,
         ScrollView,
        } 
from 'react-native';

export default function RandomRecipeScreen({ route }) {

    const { data } = route.params;
    let image = { uri: data.strMealThumb}

    let ingredients = []
    for (let entry of Object.entries(data)) {
        if (entry[0].includes("strIngredient")) {
            ingredients.push(entry[1]);
        }
    }

    /*  Reseptin ainesosat ja niiden määrät pitää filtteröidä useamman kerran, koska rajapinnan tyhjät ingredients kohdat 
        sisältävät erilaisia muuttujia kuten "", " ", ja null  */

    const firstFilterIng =  ingredients.filter(item => item != "") ;
    const secondFilterIng = firstFilterIng.filter(item => item != " " )
    const thirdFilterIng = secondFilterIng.filter(item => item)

    let measures = []
    for (let entry of Object.entries(data)) {
      if (entry[0].includes("strMeasure")) {
          measures.push(entry[1]);
      }
    }
    const firstFilterMeas =  measures.filter(item => item != "") 
        const secondFilterMeas = firstFilterMeas.filter(item => item != " " )
        const thirdFilterMeas = secondFilterMeas.filter(item => item)
    
    return(
      <ScrollView style={styles.RandomRecipeScreenContainer}>
        <View style = {{alignItems: 'center'}}> 
          <Image
            style={styles.Image}
            source={image}
            progressiveRenderingEnabled={true}
          />
        </View> 
        <View style={styles.recipeInfo}>
            <Text style={styles.title}>{data.strMeal}</Text>
        </View> 
        <View style={styles.ingredientsContainer}> 
          <View>
          { thirdFilterMeas.map((item, key)=>(
            <Text key={key}> { item } </Text>)
          )}
          </View>
          <View>
          { thirdFilterIng.map((item, key)=>(
            <Text key={key}> { item } </Text>)
          )}
          </View> 
        </View> 
        <Text style={styles.text}>{data.strInstructions}</Text>
  </ScrollView>
    )
}

const styles = StyleSheet.create({
    RandomRecipeScreenContainer: {
      flex: 1,
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