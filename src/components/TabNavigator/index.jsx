import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeIcon from '../../assets/Icons/home.svg';
import HomeIconFocused from '../../assets/Icons/home-focused.svg';
import SearchIcon from '../../assets/Icons/search.svg';
import SearchIconFocused from '../../assets/Icons/search-focused.svg';
import LibraryIcon from '../../assets/Icons/library.svg';
import LibraryIconFocused from '../../assets/Icons/library-focused.svg';

import { styles } from './styles';
import Colors from '../../assets/Colors';

export function TabNavigator({ currentScreen }) {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Pressable style={styles.pressable} onPressIn={() => navigation.navigate('Home')}>
				{currentScreen === 'Home' ? <HomeIconFocused width={20} /> : <HomeIcon width={20} />}
			</Pressable>

			<Pressable style={styles.pressable} onPressIn={() => navigation.navigate('Search')}>
				{currentScreen === 'Search' ? <SearchIconFocused width={20} /> : <SearchIcon width={20} />}
			</Pressable>

			<Pressable style={styles.pressable} onPressIn={() => navigation.navigate('Library')}>
				{currentScreen === 'Library' ? (
					<LibraryIconFocused width={20} />
				) : (
					<LibraryIcon width={20} />
				)}
			</Pressable>
		</View>
	);
}

export function TabNavigatorContainer({ children, screen }) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ height: '92%', backgroundColor: Colors.background }}>{children}</View>

			<TabNavigator currentScreen={screen} />
		</SafeAreaView>
	);
}
