import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens

import { Main } from './Main';

import { Home } from './Main/Home';
import { Search } from './Main/Search';
import { Library } from './Main/Library';

import { Player } from './Player';

import Colors from '../assets/Colors';

const navTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent',
	},
};

const Stack = createNativeStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer theme={navTheme}>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						animation: 'none',
						navigationBarColor: Colors.background,
					}}
				/>
				<Stack.Screen
					name="Search"
					component={Search}
					options={{
						animation: 'none',
						navigationBarColor: Colors.background,
					}}
				/>
				<Stack.Screen
					name="Library"
					component={Library}
					options={{
						animation: 'none',
						navigationBarColor: Colors.background,
					}}
				/>
				<Stack.Screen
					name="Player"
					component={Player}
					options={{
						animation: 'slide_from_bottom',
						navigationBarColor: Colors.background,
						animationDuration: 100,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
