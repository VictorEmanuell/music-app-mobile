import React from 'react';
import { View, TouchableOpacity, Text, TextInput, Keyboard, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import SearchIconFocused from '../../../assets/Icons/search-focused.svg';

import { MiniPlayer } from '../../../components/MiniPlayer';
import { TabNavigatorContainer } from '../../../components/TabNavigator';

import Colors from '../../../assets/Colors';
import { styles } from './styles';
import { SearchList } from '../../../components/SearchList';

import { api } from '../../../services/api';

export function Search({ navigation, route }) {
	const [focused, setFocused] = React.useState(false);
	const [searchInput, setSearchInput] = React.useState('');
	const [typing, setTyping] = React.useState({
		isTyping: false,
	});
	const [searchResult, setSearchResult] = React.useState();
	const inputSearch = React.useRef();

	const searchBoxMarginHorizontal = useSharedValue(20);
	const searchBoxMarginVertical = useSharedValue(30);
	const searchBoxBorderRadius = useSharedValue(8);

	const animationFocused = () => {
		searchBoxMarginHorizontal.value = withTiming(0, { duration: 200 });
		searchBoxMarginVertical.value = withTiming(0, { duration: 200 });
		searchBoxBorderRadius.value = withTiming(0, { duration: 200 });
	};

	const animationNotFocused = () => {
		searchBoxMarginHorizontal.value = withTiming(20, { duration: 200 });
		searchBoxMarginVertical.value = withTiming(30, { duration: 200 });
		searchBoxBorderRadius.value = withTiming(8, { duration: 200 });
	};

	React.useEffect(() => {
		if (focused) {
			animationFocused();
		}

		if (!focused) {
			animationNotFocused();
		}
	}, [focused]);

	React.useEffect(() => {
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			inputSearch.current.blur();
			setFocused(false);
		});

		return () => {
			hideSubscription.remove();
		};
	}, []);

	const search = async (text) => {
		const result = await api.get(`/search?query=${text}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		setSearchResult(result.data.data);
	};

	return (
		<TabNavigatorContainer screen={route.name}>
			<Animated.View
				style={[
					useAnimatedStyle(() => {
						'worklet';
						return {
							paddingTop: searchBoxMarginVertical.value,
						};
					}),
				]}
			>
				<Animated.View
					style={[
						{
							flexDirection: 'row',
							alignItems: 'center',
							padding: 5,
							backgroundColor: Colors.secondary,
						},
						useAnimatedStyle(() => {
							'worklet';
							return {
								marginLeft: searchBoxMarginHorizontal.value,
								marginRight: searchBoxMarginHorizontal.value,
								borderRadius: searchBoxBorderRadius.value,
							};
						}),
					]}
				>
					<SearchIconFocused width={18} style={{ marginHorizontal: 8 }} />

					<TextInput
						ref={inputSearch}
						onFocus={() => {
							setFocused(true);
						}}
						placeholder="pesquisar"
						placeholderTextColor={'#FFFFFF50'}
						cursorColor={'#FFFFFF50'}
						style={styles.inputTextSearch}
						value={searchInput}
						onChangeText={(text) => {
							setSearchInput(text);

							if (typing.isTyping && typing.timeout) {
								clearTimeout(typing.timeout);

								setTyping({
									isTyping: true,
									timeout: setTimeout(() => {
										setTyping({ isTyping: false });
										search(text);
									}, 300),
								});
							} else {
								setTyping({
									isTyping: true,
									timeout: setTimeout(() => {
										setTyping({ isTyping: false });
										search(text);
									}, 300),
								});
							}
						}}
					/>
				</Animated.View>
			</Animated.View>

			<SearchList
				type={searchInput ? 'result' : 'historic'}
				data={searchResult}
				navigation={navigation}
			/>

			<MiniPlayer navigation={navigation} />
		</TabNavigatorContainer>
	);
}
