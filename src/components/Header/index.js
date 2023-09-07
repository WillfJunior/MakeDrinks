import { 
    StatusBar, 
    View,
    StyleSheet,
    Text,
    TouchableOpacity
 } from "react-native";
 import { useContext, useEffect } from "react";
import { MyDrinksContext } from "../../context/MyDrinksContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

 import { Entypo } from "@expo/vector-icons";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22: 64;

export default function Header({ title }) {
    const { myDrinks, setMyDrinks,getDrinks } = useContext(MyDrinksContext);

    useEffect(() => {
        async function getDrinksStorage() {
            const currentDrinks = await getDrinks();
            setMyDrinks(currentDrinks.length);
            
          }
          
          
          getDrinksStorage();
    }, [myDrinks]);

    

   
    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
                        <Entypo name="drink" size={27} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.username}>{title}</Text>

                    <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
                        <Entypo name="drink" size={27} color="#fff" />
                </TouchableOpacity>
                
            </View>
            
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#00875F",
        paddingTop: statusBarHeight,
        flexDirection: "row",
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44,
    },
    username: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    content: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonUser: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
    },
    
});