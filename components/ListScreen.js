import React, { useEffect, useState } from 'react';
import { View,
         Text,  
         StyleSheet, 
         FlatList } 
from 'react-native';
import Recipe from './Recipe';

export default function ListScreen({navigation, route}) {
    const [recipeList, setRecipeList] = useState([])
    const [recipeListKeep, setRecipeListKeep] = useState([])
    const [isReady, setReady] = useState(true)

    const {data} = route.params;

    React.useEffect(() => {
          setRecipeList(data)
          setRecipeListKeep(data)
          setReady(true)
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