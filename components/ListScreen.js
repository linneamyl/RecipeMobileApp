import React, { useState } from 'react';
import { View, 
         StyleSheet, 
         FlatList } 
from 'react-native';
import Recipe from './Recipe';

export default function ListScreen({ route}) {
    const [recipeList, setRecipeList] = useState([])
    const {data} = route.params

    React.useEffect(() => {
          setRecipeList(data)
      }, []);

    const renderItem = (item) => {
        return <Recipe item={item}/>;
    };

    const listSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#CED0CE",
              marginLeft: "10%"
            }}
          />
        );
      };

    return(
        <View style={styles.RecipeListContainer}>
            <FlatList
                style={{marginLeft: 10}}
                data={recipeList}
                keyExtractor={(item) => item.idMeal}
                renderItem={({item}) => renderItem(item)}
                ItemSeparatorComponent={listSeparator}
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