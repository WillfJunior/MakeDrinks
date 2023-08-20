
import React, { useState, useEffect } from "react";
import { View , StyleSheet, TextInput, TouchableOpacity, Text, Keyboard} from "react-native";
import Header from "../../components/Header";

import { Feather } from "@expo/vector-icons";
import Card from "../../components/Card";

export default function Home({ navigation }) {

    const [drink, setDrink] = useState('');

    const [drinks, setDrinks] = useState([]);

    function handleGetDrinks() {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then((response) => response.json())
        .then((json) => {
            setDrinks(json.drinks);
            setDrink('');
            Keyboard.dismiss();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function handleDrinkTextChange(text) {
        setDrink(text);
    }

    return (
        <View style={styles.container}>
            <Header title="Drinks" />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Busque o seu Drink Favorito'
                    placeholderTextColor='#6B6B6B'
                    onChangeText={(text) => handleDrinkTextChange(text)}
                    
                    value={drink}
                    
                />

                <TouchableOpacity style={styles.button} onPress={handleGetDrinks} >
                    <Text style={styles.buttonText}><Feather name="search" size={20} color="#fff"/></Text>
                </TouchableOpacity>
            </View>

            <Card drinks={drinks} navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
        flex:1,
        backgroundColor:"#131016",
        
    },
    button:{
        width:56,
        height:56,
        borderRadius:5,
        backgroundColor:'#31CF67',
        alignItems:'center',
        justifyContent:'center'
    },
    form:{
        width:'100%',
        flexDirection:'row',
        marginTop:36,
        marginBottom:42,
        paddingHorizontal:24
    },
    input:{
        flex:1,
        marginRight:12,
        height:56,
        backgroundColor:'#1F1E25',
        borderRadius:5,
        color:'#FFF',
        padding:16,
        fontSize:16
    },
    buttonText:{
        color:'#FFF',
        fontSize:24
    },
})