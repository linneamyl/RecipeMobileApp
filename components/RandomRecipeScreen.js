import React, { useEffect, useState } from 'react';
import { View,
         Text,  
         StyleSheet,
         Image,
         Alert,
         ActivityIndicator, 
         FlatList } 
from 'react-native';

export default function RandomRecipeScreen({ route, navigation }) {

    const { data } = route.params;
    console.log(data)
    
    return(
        <View style={styles.RandomRecipeScreenContainer}>
            <Text>Moro</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    RandomRecipeScreenContainer: {
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