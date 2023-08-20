import { createStackNavigator } from "@react-navigation/stack";
import  Home  from "../pages/Home";
import Details  from "../pages/Details";
import HowToMake from "../pages/HowToMake";

const Stack = createStackNavigator();

export default function Route() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={Home}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="Details" 
            component={Details} 
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen 
            name="HowMake" 
            component={HowToMake} 
            options={{
                headerShown: false,
            }}
            />
        </Stack.Navigator>
    )

}