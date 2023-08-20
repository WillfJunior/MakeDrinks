import React, {useState, useEffect} from 'react';

import {View, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Text, 
    FlatList,
    Image,
    SafeAreaView
} from 'react-native';
import Header from '../../components/Header';
import Ingredients from '../../components/Ingredients';
import HowToMake from '../../components/howMake';
import { ScrollView } from 'react-native-gesture-handler';

export default function Details({navigation, route}) {

    const [drink, setDrink] = useState({});

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${route.params.id}`)
        .then((response) => response.json())
        .then((json) => {
            setDrink(json.drinks[0]);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [setDrink]);


    return (
        <SafeAreaView style={styles.container}>
            <Header title={drink.strDrink} />
            <Image style={styles.image} source={{uri: drink.strDrinkThumb}} />
            <Ingredients drink={drink} />

            
                <TouchableOpacity 
                onPress={() => navigation.navigate('HowMake', {drink:drink})}
                style={styles.buttonBack}
                >
                <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 12}}>Como Fazer</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={() => navigation.navigate('Home')}
                style={styles.buttonHowMake}
                >
                <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 12}}>Voltar</Text>
                </TouchableOpacity>
            


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
container: {
        
    flex:1,
    backgroundColor:"#131016",
},
image: {

    marginTop:16,
    width: '100%',
    height: 150,
    resizeMode: 'contain',
},
buttonBack:{
    width: 400,
    height: 50,
    backgroundColor: '#00875F',
    marginRight: 24,
    marginBottom: 24,
    
},
buttonHowMake:{
    width: 400,
    height: 50,
    backgroundColor: '#E23C44',
    marginRight: 24,
    marginBottom: 24,
    
},

    
});