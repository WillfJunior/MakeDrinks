import React, { useState, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MyDrinksContext = createContext({});

function MyDrinksProvider({ children }) {
  const [myDrinks, setMyDrinks] = useState([]);
  const [drinksLiked, setDrinksLiked] = useState({});
  const keyStorage = "@drinks:liked";
  
  async function getDrinks() {
    const existingDrinks = await AsyncStorage.getItem(keyStorage);
    const currentDrinks = existingDrinks ? JSON.parse(existingDrinks) : [];
    return currentDrinks;
  }

  async function saveDrink(drink) {

    console.log('drink', drink);
    const currentDrinks = await getDrinks();

    const drinkFormatted = [...currentDrinks, drink];
    setMyDrinks(drinkFormatted.length);
    await AsyncStorage.setItem(keyStorage, JSON.stringify(drinkFormatted));
    
    
}

 async function removeDrink(drink) {
    const currentDrinks = await getDrinks();
    const newDrinks = currentDrinks.filter((d) => d.idDrink !== drink.idDrink);
    await AsyncStorage.removeItem(keyStorage);
    setMyDrinks(newDrinks.length);
    await AsyncStorage.setItem(keyStorage, JSON.stringify(newDrinks));
}
 
  

  return (
    <MyDrinksContext.Provider value={{ myDrinks, 
    setMyDrinks, 
    keyStorage, 
    drinksLiked, 
    setDrinksLiked,
    getDrinks,
    saveDrink,
    removeDrink }}>
      {children}
    </MyDrinksContext.Provider>
  );
}

export default MyDrinksProvider;