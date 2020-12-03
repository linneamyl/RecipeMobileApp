import React, { useEffect, useState } from 'react';
import { View,
         Text,  
         StyleSheet, 
         FlatList } 
from 'react-native';
import { SearchBar, Button, Tile } from 'react-native-elements';

export default function HomeScreen({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    function searchRecipes ()  {
        console.log(searchQuery)
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchQuery)
        .then((response) => response.json())
        .then((responseData) => {
          setSearchResults(responseData.meals)
          console.log(searchResults)
        })
        .catch((error) => {
          Alert.alert('Error', error)
        });
        navigation.navigate("ListScreen", {data: searchResults})
      }

    return (
        <View>
            <Tile
                imageSrc={require('../assets/foodpic.png') }
                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                featured caption="Some Caption Text"
            />
            <SearchBar
                placeholder="Search recipes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <Button 
                raised icon = {{name: 'search'}}
                onPress={searchRecipes} 
                title="SEARCH"/>
        </View>
    )
}
