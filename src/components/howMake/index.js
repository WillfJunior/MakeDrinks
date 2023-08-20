import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";

import {v4 as uuidv4} from 'uuid';

export default function HowMake({ drink }) {

    let key = '71f258fa847643289815245b16e0ee39';

    let location = 'brazilsouth';
    const [translate, setTranslate] = useState([]);
    
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
          
      })
    }

    useEffect(() => {
        translateText(drink.strInstructions);
    }, [translate]);

    return (
        <View style={styles.container}>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginBottom:12}}>Modo de preparo</Text>
            <ScrollView style={styles.ingredients}>
                <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 12}}>{translate}</Text>
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        
    
    },
    title: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        
    },
    ingredients: {
        
        // justifyContent: "center",
        // alignItems: "center",
        borderWidth: 2,
        borderColor: "#00875F",
        borderRadius: 15,
        marginHorizontal: 24,
        padding: 12,
        marginBottom: 24,

    },
    ingredient: {},
    ingredientText: {
        color: "#fff",
    },
});