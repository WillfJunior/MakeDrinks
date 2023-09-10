import React, {useState, useEffect} from 'react';

import {View, 
    StyleSheet, 

    TouchableOpacity, 
    Text, 

    Image,
    SafeAreaView
} from 'react-native';
import Header from '../../components/Header';
import Ingredients from '../../components/Ingredients';

import { Feather } from "@expo/vector-icons";
import ButtonBack from '../../components/ButtonBack';

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
                onPress={() => navigation.navigate('HowMake', {drink:drink, origin: route.params.origin})}
                style={styles.buttonBack}
                >
                <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 12}}>Como Fazer</Text>
                </TouchableOpacity>
                
                <ButtonBack navigation={navigation} route={route.params.origin} />
            


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
container: {
        
    flex:1,
    backgroundColor:"#131016",
    justifyContent: "center",
},
image: {

    marginTop:16,
    width: '100%',
    height: 150,
    resizeMode: 'contain',
},
buttonBack:{
    width: '100%',
    height: 50,
    backgroundColor: '#00875F',
    marginRight: 24,
    marginBottom: 24,
    
},

buttonLike:{

}

    
});