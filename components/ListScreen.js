import React, { useEffect, useState } from 'react';
import { View,
         Text,  
         StyleSheet, 
         FlatList } 
from 'react-native';
import Recipe from './Recipe';

export default function ListScreen({navigation, route}) {
    const [recipeList, setRecipeList] = useState([])
  
    const {data} = route.params

    React.useEffect(() => {
          setRecipeList(data)
        //  console.log(data, 'DATA')
      }, []);

   
    const renderItem = (item) => {
        return <Recipe item={item}/>;
    };

    return(
        <View style={styles.RecipeListContainer}>
            <FlatList
                style={{marginLeft: 10}}
                data={recipeList}
                keyExtractor={(item) => item.idMeal}
                renderItem={({item}) => renderItem(item)}
            ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    RecipeListContainer: {
        flex: 1,
        marginTop: 30,
    },
    ActivityIndicator: {
        flex: 1,
    },
});