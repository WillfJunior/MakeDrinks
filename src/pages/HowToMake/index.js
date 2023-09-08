import{ View, Image,Text, StyleSheet, TouchableOpacity } from "react-native";
import HowMake from "../../components/howMake";
import Header from "../../components/Header";

export default function HowToMake({ drink, navigation, route }) {
    return (
        <View style={styles.container} >
            <Header title={route.params.drink.strDrink} />
            <Image style={styles.image} source={{uri: route.params.drink.strDrinkThumb}} />
            <HowMake drink={route.params.drink} />

            <TouchableOpacity 
                onPress={() => navigation.navigate('Home')}
                style={styles.buttonHowMake}
                >
                <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 12}}>Voltar</Text>
                </TouchableOpacity>
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
    buttonHowMake:{
        width: '100%',
        height: 50,
        backgroundColor: '#E23C44',
        marginRight: 24,
        marginBottom: 24,
        
    },
});