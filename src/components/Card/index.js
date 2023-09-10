import React, { useState, useEffect } from "react";

import { View, 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    FlatList, 
    Image, 
    SafeAreaView } from "react-native";



export default function Card({ drinks, navigation, origin}) {

    return (
        
        <SafeAreaView style={styles.container}>
            <FlatList 
            showsVerticalScrollIndicator={false}
            data={drinks}
            keyExtractor={(item) => item.idDrink}
            renderItem={({ item }) => (
                <TouchableOpacity 
                style={styles.button}
                activeOpacity={0.9}
                onPress={() => navigation.navigate(`Details`, {id: item.idDrink, origin: origin})}
                >
                    <View style={styles.contentCard}>
                        <Image style={styles.imageCard} source={{ uri: item.strDrinkThumb }} />
                        <Text style={styles.textCard}>{item.strDrink}</Text>
                       
                        
                    </View>
                </TouchableOpacity>
            )}
            
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageCard: {
        width: 60,
        height: 60,
        borderRadius: 15,
        borderColor: "#00875F",
        borderWidth: 2,
        marginRight: 48,
    },
    contentCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "#00875F",
        padding: 12,
        borderRadius: 15,
        paddingHorizontal: 24,
        marginHorizontal: 24,
    },
    textCard: {
        
        color: "#fff",
    },
});