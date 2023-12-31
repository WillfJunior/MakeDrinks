import React, { useState, useEffect, useContext } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { View, StyleSheet, TouchableOpacity, Text} from "react-native";
import { MyDrinksContext } from "../../context/MyDrinksContext";

import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonBack from "../../components/ButtonBack";

export default function MyDrinks({ navigation}) {
    const { myDrinks, setMyDrinks, getDrinks } = useContext(MyDrinksContext);
    const [drinks, setDrinks] = useState([]);
    

    useEffect(() => {
        async function getDrinksStorage() {
            const currentDrinks = await getDrinks();
            
            setDrinks(currentDrinks);
            
          }
          
          
          getDrinksStorage();
    }, [drinks]);

    

   
    return (
        <View style={styles.container}>
            <Header title="My Drinks" />
            {
                drinks.length === 0 ? (
                    <View style={styles.noDrinks}>
                        <Text style={styles.noDrinksText}>
                            Você ainda não tem drinks salvos
                        </Text>
                    </View>
                ) : 
                (
                    <View style={styles.cards}>
                        <Card drinks={drinks} navigation={navigation} origin='MyDrinks'/>
                    </View>
                )
            }
            
            <View style={styles.buttonBackView}>
                <ButtonBack navigation={navigation} route="Home" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#131016"

    },
    cards: {
        flex: 1,
        marginTop: 20,
    },
    buttonBack:{

        width: 400,
        height: 50,
        backgroundColor: '#E23C44',
        marginRight: 24,
        marginBottom: 24,
        
    },
    buttonBackView: {
        alignItems: 'end',

        justifyContent: 'flex-end',
    },
    noDrinks: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDrinksText: {
        color: '#21222c',
        fontSize: 18,
        textAlign: 'center',
    }
})