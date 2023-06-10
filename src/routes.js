import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens

import { Main } from './screens/Main';
import { Player } from './screens/Player';

import Colors from './assets/Colors';

const Stack = createNativeStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Main"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name="Main"
					component={Main}
					options={{
						animation: 'slide_from_right',
						navigationBarColor: Colors.primary,
					}}
				/>
				<Stack.Screen
					name="Player"
					component={Player}
					options={{
						animation: 'slide_from_bottom',
						navigationBarColor: Colors.background,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
