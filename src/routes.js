import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens

import { Main } from './screens/Main';
import { Player } from './screens/Player';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Main'
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name='Main'
                    component={Main}
                    options={{
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name='Player'
                    component={Player}
                    options={{
                        animation: 'slide_from_bottom'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}