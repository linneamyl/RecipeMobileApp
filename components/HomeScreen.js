import React, { useEffect, useState } from 'react';
import { View,
         Text,  
         StyleSheet, 
         FlatList,
         Alert
         } 
from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { SearchBar, Button, Tile } from 'react-native-elements';

export default function HomeScreen({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [areas, setAreas] = useState([])
    const [chosenArea, setChosenArea] = useState('')
    const [randomRecipe, setRandomRecipe] = useState()


    // Pickerin alueet haetaan aina kun sivu avataan
    useEffect(() => {
      fetchAreas()
    },[]);

    const fetchAreas = () => {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then(response => response.json())
      .then(responseData => {
        setAreas(responseData.meals)
      })
      .catch(error => {
        Alert.alert(error.message)
      })
    }



    // Hakee Arean mukaan 
    const searchByArea = () => {
      fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + chosenArea)
      .then((response) => response.json())
      .then((responseData) => {
        setSearchResults(responseData.meals)
      })
      .catch((error) => {
        Alert.alert('Error', error)
      });
      navigation.navigate("ListScreen", {data: searchResults})
    }





    // Hakutoiminnon funktio
    const searchRecipes = () =>  {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchQuery)
        .then((response) => response.json())
        .then((responseData) => {
          //setSearchResults(responseData.meals)
          //console.log(searchResults)
          navigation.navigate("ListScreen", {data: responseData.meals})
        })
        .catch((error) => {
          Alert.alert('Error', error.message)
        });
        
      }



    // Random reseptin fetch
    const fetchRandomRecipe = () =>  {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((responseData) => {
        setRandomRecipe(responseData.meals[0])
        //console.log(randomRecipe)
      })
      .catch((error) => {
        Alert.alert('Error', error.message)
      });
      navigation.navigate("RandomRecipeScreen", { data: randomRecipe })
    }
    

    return (
        <View>
            <Tile
                imageSrc={require('../assets/foodpic.png')}
                title="Recipe Finder"
                featured caption="Find the best food recipes for everyday occasions"
            />
            <SearchBar
                placeholder="Search recipes..."
                onChangeText={value => setSearchQuery(value)}
                value={searchQuery}
            />
            <Button 
                raised icon = {{name: 'search'}}
                onPress={searchRecipes}
                title="SEARCH"/>
            <Picker 
                style={{height: 30, width: 150, marginTop: 40}} 
                onValueChange={selectedValue => setChosenArea(selectedValue)}
                selectedValue={chosenArea}>
                {
                  areas.map((item) =>
                    <Picker.Item key={item} label={item.strArea} value={item.strArea} />)
                }
            </Picker>
            <Button 
                raised icon = {{name: 'search'}}
                onPress={searchByArea}
                title="SEARCH BY AREA"/>
            <Button 
                onPress={fetchRandomRecipe}
                title="RANDOM RECIPE"/>
        </View>
    )
}


const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
})
