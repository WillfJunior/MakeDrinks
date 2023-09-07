
import React, { useState, useEffect, useContext } from "react";
import { View , StyleSheet, TextInput, TouchableOpacity, Text, Keyboard} from "react-native";
import Header from "../../components/Header";
import { MyDrinksContext } from "../../context/MyDrinksContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather } from "@expo/vector-icons";
import Card from "../../components/Card";

export default function Home({ navigation }) {

    const { myDrinks, setMyDrinks, keyStorage } = useContext(MyDrinksContext);
    const [drink, setDrink] = useState('');

    const [drinks, setDrinks] = useState([]);
     

    useEffect(() => {
        async function getDrinksStorage() {
            const currentDrinks = await getDrinks();
            setMyDrinks(currentDrinks.length);
            
          }
          
          
          getDrinksStorage();
    }, [myDrinks]);

    

    async function getDrinks() {
      const existingDrinks = await AsyncStorage.getItem(keyStorage);
      const currentDrinks = existingDrinks ? JSON.parse(existingDrinks) : [];
      return currentDrinks;
    }

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
            <TouchableOpacity 
            style={styles.buttonMyDrinks}
            onPress={() => navigation.navigate('MyDrinks')}
            >
                <Text style={styles.textMyDrinks}>Meus Drinks</Text>
                <View style={styles.containerAmount}>
                    <Text style={styles.amountMyDrinks}>{myDrinks}</Text>
                </View>
            </TouchableOpacity>
            
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
    buttonMyDrinks:{
        flexDirection:'row',
        marginLeft:24,
        marginBottom: -12,
        marginTop: 12,
        alignItems:'center',
    } ,
    textMyDrinks:{
        color:'#fff',
        fontWeight:'bold',
    } ,
    amountMyDrinks:{
        color:'#fff',
        fontWeight:'bold',
        textAlign: 'center',
    },
    containerAmount:{

        borderRadius: 50,
        backgroundColor: '#00875F',
        borderColor: '#00875F',
        borderWidth: 2,
        marginLeft: 8,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    }
})