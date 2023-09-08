import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MyDrinksContext } from "../../context/MyDrinksContext";
import axios from "axios";

import {v4 as uuidv4} from 'uuid';
import { Feather } from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Ingredients({ drink }) {
  const {drinksLiked, setDrinksLiked, getDrinks, saveDrink, removeDrink} = useContext(MyDrinksContext);
  
  useEffect(() => {
    
    async function getDrinksStorage() {

      const currentDrinks = await getDrinks();
      
      
      const drinkFinded = currentDrinks.findIndex((d) => d.idDrink == drink.idDrink);

      if(drinkFinded >= 0) {
        setLike(true);
      }
      
      
    }
    
    getDrinksStorage();
    

  }, [drink,like]);

  let key = '71f258fa847643289815245b16e0ee39';

  let location = 'brazilsouth';

    let ingredients = '';
    const [translates, setTranslates] = useState([]);
    const [translate, setTranslate] = useState();
    const [like, setLike] = useState(false);
    const [currentDrink, setCurrentDrink] = useState(drink);

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if(ingredient && measure) {
        ingredients += `${measure}  ${ingredient} \n ` 
      }
      
      
    }

    translateText(ingredients);
  
    function translateText(ingredient) {
        
          axios({
            baseURL: 'https://api.cognitive.microsofttranslator.com',
            url: '/translate',
            method: 'post',
            headers: {
              'Ocp-Apim-Subscription-Key': key,
               // location required if you're using a multi-service or regional (not global) resource.
              'Ocp-Apim-Subscription-Region': location,
              'Content-type': 'application/json',
              'X-ClientTraceId': uuidv4().toString()
          },
          params: {
              'api-version': '3.0',
              'from': 'en',
              'to': ['pt']
          },
          data: [{
            'text': ingredient
          }],
        responseType: 'json'
        }).then(function(response){
          setTranslate(response.data[0].translations[0].text);
          // setTranslates([...translates, translate]);
          // console.log(response.data[0].translations[0].text);
            //ingredients.push(response.data[0].translations[0].text);
          //   console.log(ingredients);
            
            
        })
    }

    
    
    async function handleLike() {
      setLike((current) => !current);
      
      !like ? await saveDrink(drink) : await removeDrink(drink);
    }

  return (
    <View style={styles.container}>
      <View style={styles.likeLine}>
        <Text style={styles.title}>Ingredientes</Text>
        <TouchableOpacity style={styles.button}  onPress={handleLike}>
            <Feather name="heart" size={20} color={like ? 'red' : 'white'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.ingredients}>
        {/* {notNullIngredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredient}>
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
        ))} */}
        <Text style={styles.ingredientText}>{translate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginBottom: -40,
    
    },
    title: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    ingredients: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#00875F",
        borderRadius: 15,
        marginHorizontal: 24,
        padding: 12,

    },
    ingredient: {},
    ingredientText: {
        color: "#fff",
    },
    likeLine: {
      justifyContent: "center",
      flexDirection: "row",
    },
    button: {
      marginLeft: 16,
      marginTop: 4,
    }
});