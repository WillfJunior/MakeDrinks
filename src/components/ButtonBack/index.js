import { TouchableOpacity, Text,StyleSheet } from "react-native"

export default function ButtonBack({navigation, route, params = null}) {
    return (
        <TouchableOpacity 
        onPress={() => navigation.navigate(route, params)}
        style={styles.buttonBack}
        >
        <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 12}}>Voltar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBack:{
        width: '100%',
        height: 50,
        backgroundColor: '#E23C44',
        marginRight: 24,
        marginBottom: 24,
        
    },
})