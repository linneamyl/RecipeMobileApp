import React, { useEffect, useState } from 'react';
import { View,
         StyleSheet, 
         Alert,
         Text,
         } 
from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { SearchBar,
         Button, 
         Tile, 
         Icon } 
from 'react-native-elements';

export default function HomeScreen({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('')
    const [areas, setAreas] = useState([])
    const [chosenArea, setChosenArea] = useState('')

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
        navigation.navigate("ListScreen", {data: responseData.meals})
      })
      .catch((error) => {
        Alert.alert('Error', error)
      });
    }

    // Hakutoiminnon funktio
    const searchRecipes = () =>  {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchQuery)
        .then((response) => response.json())
        .then((responseData) => {
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
        navigation.navigate("RandomRecipeScreen", { data: responseData.meals[0] })
      })
      .catch((error) => {
        Alert.alert('Error', error.message)
      });
    }

    return (
        <View>
            <Tile
                imageSrc={{uri: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview'}}
                title="Recipe Finder"
                featured caption="Find the best food recipes for everyday occasions"
                captionStyle={{color: 'black', fontSize: 20, fontWeight: 'bold'}}
                titleStyle={{color: 'black', fontSize: 40, fontWeight: 'bold'}}
            /> 
            <View style={{padding:10}}>
                <SearchBar
                    inputStyle={{backgroundColor: 'white'}}
                    containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                    placeholderTextColor={"rgb(0,0,0)"}
                    inputContainerStyle={{backgroundColor: 'white'}}
                    style={{justifyContent: 'space-around'}}
                    placeholder="Search recipes..."
                    onChangeText={value => setSearchQuery(value)}
                    value={searchQuery}
              />
            </View>
            <View style={styles.Icon}>
                <Icon reverse
                      type="material"
                      name="search"
                      onPress={searchRecipes}
                />
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.Text}>Choose recipes by area</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <Picker 
                    style={{height: 30, width: 150}} 
                    onValueChange={selectedValue => setChosenArea(selectedValue)}
                    selectedValue={chosenArea}>
                    {
                      areas.map((item) =>
                        <Picker.Item key={item} label={item.strArea} value={item.strArea} />)
                    }
                </Picker>
                <Button
                    style={{alignItems: 'flex-end'}}
                    type="clear"
                    
                    onPress={searchByArea}
                    title="SEARCH BY AREA"/>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.Text}>Get a random recipe</Text>
            </View>
                <Button 
                    type="clear"
                    onPress={fetchRandomRecipe}
                    title="RANDOM RECIPE"
                />
        </View>
    )
}

const styles = StyleSheet.create({
  Icon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
