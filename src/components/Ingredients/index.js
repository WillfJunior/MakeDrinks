import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

import {v4 as uuidv4} from 'uuid';

export default function Ingredients({ drink }) {

  let key = '71f258fa847643289815245b16e0ee39';

  let location = 'brazilsouth';

    let ingredients = '';
    const [translates, setTranslates] = useState([]);
    const [translate, setTranslate] = useState();



   

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if(ingredient) {
        ingredients += measure ? `${measure}  ${ingredient} : ` : 'a gosto'
      }
      
      
    }

    

    // useEffect(() => {
    //   notNullIngredients.map((ingredient) => {
    //     translateText(ingredient);
    //   })
    // }, [translate, translates]);
    

    

    translateText(ingredients);
    // translateText(`${drink.strIngredient2} - ${drink.strMeasure2}`)
    // translateText(`${drink.strIngredient3} - ${drink.strMeasure3}`)
    // translateText(`${drink.strIngredient4} - ${drink.strMeasure4}`)
    // translateText(`${drink.strIngredient5} - ${drink.strMeasure5}`)
    // translateText(`${drink.strIngredient6} - ${drink.strMeasure6}`)
    // translateText(`${drink.strIngredient7} - ${drink.strMeasure7}`)
    // translateText(`${drink.strIngredient8} - ${drink.strMeasure8}`)
    // translateText(`${drink.strIngredient9} - ${drink.strMeasure9}`)
    // translateText(`${drink.strIngredient10} - ${drink.strMeasure10}`)
    // translateText(`${drink.strIngredient11} - ${drink.strMeasure11}`)
    // translateText(`${drink.strIngredient12} - ${drink.strMeasure12}`)
    // translateText(`${drink.strIngredient13} - ${drink.strMeasure13}`)
    // translateText(`${drink.strIngredient14} - ${drink.strMeasure14}`)
    // translateText(`${drink.strIngredient15} - ${drink.strMeasure15}`)

    


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

    
      
   
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredientes</Text>
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
});