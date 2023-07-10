// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import SystemNavigationBar from 'react-native-system-navigation-bar';

// import { Home } from './Home';
// import { Search } from './Search';
// import { Library } from './Library';

// import Colors from '../../assets/Colors';

// import HomeIcon from '../../assets/Icons/home.svg';
// import HomeIconFocused from '../../assets/Icons/home-focused.svg';
// import SearchIcon from '../../assets/Icons/search.svg';
// import SearchIconFocused from '../../assets/Icons/search-focused.svg';
// import LibraryIcon from '../../assets/Icons/library.svg';
// import LibraryIconFocused from '../../assets/Icons/library-focused.svg';

// const Stack = createStackNavigator();

// export function Main() {
// 	return (
// 		<Stack.Navigator
// 			screenOptions={{
// 				headerShown: false,
// 			}}
// 		>
// 			<Stack.Screen
// 				name="Home"
// 				component={Home}
// 				options={{
// 					tabBarIcon: ({ focused }) => {
// 						if (!focused) {
// 							return <HomeIcon />;
// 						}

// 						if (focused) {
// 							return <HomeIconFocused />;
// 						}
// 					},
// 				}}
// 			/>
// 			<Stack.Screen
// 				name="Search"
// 				component={Search}
// 				options={{
// 					tabBarIcon: ({ focused }) => {
// 						if (!focused) {
// 							return <SearchIcon />;
// 						}

// 						if (focused) {
// 							return <SearchIconFocused />;
// 						}
// 					},
// 				}}
// 			/>
// 			<Stack.Screen
// 				name="Library"
// 				component={Library}
// 				options={{
// 					tabBarIcon: ({ focused }) => {
// 						if (!focused) {
// 							return <LibraryIcon />;
// 						}

// 						if (focused) {
// 							return <LibraryIconFocused />;
// 						}
// 					},
// 				}}
// 			/>
// 		</Stack.Navigator>
// 	);
// }
