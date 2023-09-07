import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TouchableOpacity, StyleSheet } from 'react-native';

export default function Like({ drink }) {

    const [like, setLike] = useState(false);
    const [drinksLiked, setDrinksLiked] = useState([]);

    const key = '@drinksLiked:drinks';
   
    useEffect(() => {
        getDrinks();
    }, [like, drinksLiked]);

    async function getDrinks() {
        try {
            const existingDrinks = await AsyncStorage.getItem(key);
           console.log('getdrinks', existingDrinks);
        } catch (error) {
            console.log('getdrins', error);
        }
    }

    async function saveDrink(drink) {
        try {

            
            const existingDrinks = await AsyncStorage.getItem('drinks');
            let newDrink = JSON.parse(existingDrinks);
            
            const drinkStorage = [];

            if(!newDrink) {
                
                setDrinksLiked(drinkStorage.push(drink));
            }else{
                setDrinksLiked([...newDrink, drink])
            }
            await AsyncStorage.setItem('drinks', JSON.stringify(drinksLiked));
            console.log('savedrinks', drinksLiked);
            
        } catch (error) {
            console.log('savedrinks',error);
        }
    }

    async function removeDrink(drink) {
        try {

            const existingDrinks = await AsyncStorage.getItem('drinks');
            let newDrink = JSON.parse(existingDrinks);
            
            await AsyncStorage.removeItem('drinks');

           
            setDrinksLiked(drinksLiked.pop(drink));
            
            await AsyncStorage.setItem('drinks', JSON.stringify(drinksLiked));
           
            
            
            
        } catch (error) {
            console.log(error);
        }
    }

    function handleLike() {
        setLike((current) => !current);
        console.log('like', like)
        like ? removeDrink(drink) : saveDrink(drink);
    }


    return (
        <TouchableOpacity style={styles.button}  onPress={handleLike}>
            <Feather name="heart" size={20} color={like ? 'red' : 'white'}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginLeft: 16,
        marginTop: 4,
    }
})