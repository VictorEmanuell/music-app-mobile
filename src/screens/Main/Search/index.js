import React from 'react';
import { View, TouchableOpacity, TextInput, Keyboard, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import SearchIconFocused from '../../../assets/Icons/search-focused.svg';

import { MiniPlayer } from '../../../components/MiniPlayer';
import { TabNavigatorContainer } from '../../../components/TabNavigator';

import Colors from '../../../assets/Colors';
import { styles } from './styles';

export function Search({ navigation, route }) {
	const [focused, setFocused] = React.useState(false);
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

	return (
		<TabNavigatorContainer screen={route.name}>
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
							top: searchBoxMarginVertical.value,
							borderRadius: searchBoxBorderRadius.value,
						};
					}),
				]}
			>
				<SearchIconFocused width={18} style={{marginHorizontal: 8}} />

				<TextInput
					ref={inputSearch}
					onFocus={() => {
						setFocused(true);
					}}
					placeholder="pesquisar"
					placeholderTextColor={'#FFFFFF50'}
					cursorColor={'#FFFFFF50'}
					style={styles.inputTextSearch}
				/>
			</Animated.View>

			<MiniPlayer navigation={navigation} />
		</TabNavigatorContainer>
	);
}
