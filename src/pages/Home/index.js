
import React, { useState, useEffect, useContext } from "react";
import { View , StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, Switch, Alert} from "react-native";
import Header from "../../components/Header";
import { MyDrinksContext } from "../../context/MyDrinksContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather, Entypo } from "@expo/vector-icons";
import Card from "../../components/Card";

export default function Home({ navigation }) {

    const { myDrinks, setMyDrinks, keyStorage } = useContext(MyDrinksContext);
    const [drink, setDrink] = useState('');

    const [drinks, setDrinks] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const randomDrink = 'random.php';
    const searchDrink = `search.php?s=`;
    const searchDrinkByName = `search.php?s=`;
    const searchDrinkByIngredient = `filter.php?i=${drink}`;
     

    useEffect(() => {
        async function getDrinksStorage() {
            const currentDrinks = await getDrinks();
            setMyDrinks(currentDrinks.length);
            
          }
          
          
          getDrinksStorage();
          GetAllDrinks(searchDrink);
          //SortedDrinks();
    }, [myDrinks]);

    

    async function getDrinks() {
      const existingDrinks = await AsyncStorage.getItem(keyStorage);
      const currentDrinks = existingDrinks ? JSON.parse(existingDrinks) : [];
      return currentDrinks;
    }

    function SortedDrinks(drinkArray) {
        
        for (let i = 0; i < drinkArray.length - 1; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [drinkArray[i], drinkArray[j]] = [drinkArray[j], drinkArray[i]];
        }
        return drinkArray;
    }

    function GetAllDrinks(filter) {
        console.log(filter)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filter}`)
        .then((response) => response.json())
        .then((json) => {

            if(filter === 'search.php?s=') {
                const drinkArray = SortedDrinks(json.drinks);
                const drinksSlice = drinkArray.slice(0, 10);
                setDrinks(drinksSlice);
            } else {
                setDrinks(json.drinks);
            }
            
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function handleSuggestDrinks() {
        GetAllDrinks(randomDrink);
    }

    function handleGetDrinks() {
        if(drink === '') {
            alert('Digite o nome do drink ou ingrediente');
        }
            
        else if(isEnabled ) {
            GetAllDrinks(searchDrinkByIngredient);
            
        }  
        else {
            GetAllDrinks(searchDrinkByName);
            
            
        }
        setDrink('');
            Keyboard.dismiss();
            
        
        
    }

    function handleDrinkTextChange(text) {
        
        if(!isEnabled){
            console.log(text)
            GetAllDrinks(`${searchDrinkByName}${text}`)
        }
        setDrink(text)
        
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
            
            <View style={styles.formContainer}>
                <View style={styles.buscarIngrediente}>
                    <Text style={styles.buscarIngredienteText}>Buscar Por Ingrediente ?</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#FFF'}}
                        thumbColor={isEnabled ? '#00875F' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder={isEnabled ? 'Busque seu Drink pelo Ingrediente' :'Busque o seu Drink Favorito'}
                        placeholderTextColor='#6B6B6B'
                        onChangeText={(text) => handleDrinkTextChange(text)}
                        value={drink}
                        
                    />

                    <TouchableOpacity style={styles.button} onPress={handleGetDrinks} >
                        <Text style={styles.buttonText}><Feather name="search" size={20} color="#fff"/></Text>
                    </TouchableOpacity>
                    
                </View>
                <TouchableOpacity style={styles.buttonSuggest} onPress={handleSuggestDrinks} >
                        <Text style={styles.buttonSuggestText}>Sugestão de Drink<Entypo name="drink" size={20} color="#fff"/></Text>
                    </TouchableOpacity>
            </View>
            {
                drinks ? (
                    <Card drinks={drinks} navigation={navigation} origin='Home' />
                ):
                (
                    alert('Nenhum Drink Encontrado')
                    
                )
            }
            
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
    formContainer:{
        width:'100%',
        flexDirection:'column',
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
    },
    buscarIngrediente:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center', 
    } ,
    buscarIngredienteText:{
        color:'#fff',
        fontWeight:'bold',
        marginRight: 64,
    },
    form:{
        flexDirection:'row',
        marginTop:10
    },
    buttonSuggest:{
        backgroundColor:'#00875F',
        width:'100%',
        height:40,
        borderRadius:5,
        marginTop:12,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonSuggestText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    }
})