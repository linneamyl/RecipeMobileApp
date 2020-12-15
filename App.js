import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen'
import ListScreen from './components/ListScreen'
import RecipeScreen from './components/RecipeScreen'
import RandomRecipeScreen from './components/RandomRecipeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: "Back" }}/>
        <Stack.Screen name="RecipeScreen" component={RecipeScreen} options={{ title: "Back" }}/>
        <Stack.Screen name="RandomRecipeScreen" component={RandomRecipeScreen} options={{ title: "Back" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
