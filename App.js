import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Home from './src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import Route from './src/Routes';
import MyDrinksProvider  from './src/context/MyDrinksContext';

export default function App() {
  return (
    <NavigationContainer>
      <MyDrinksProvider>
        <Route />
      </MyDrinksProvider>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '##131016',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
