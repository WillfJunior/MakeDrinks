import{ View, Image,Text, StyleSheet, TouchableOpacity } from "react-native";
import HowMake from "../../components/howMake";
import Header from "../../components/Header";
import ButtonBack from "../../components/ButtonBack";

export default function HowToMake({ drink, navigation, route }) {
    return (
        
        <View style={styles.container} >
            <Header title={route.params.drink.strDrink} />
            <Image style={styles.image} source={{uri: route.params.drink.strDrinkThumb}} />
            <HowMake drink={route.params.drink} />
            
            <ButtonBack navigation={navigation} route='Details' params={route.params}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131016",
    },
    image: {

        marginTop:16,
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    
});