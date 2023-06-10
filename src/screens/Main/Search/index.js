import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { styles } from './styles';
import { MiniPlayer } from '../../../components/MiniPlayer';
import Colors from '../../../assets/Colors';

export function Search({ navigation }) {
	const [focused, setFocused] = React.useState(false);

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

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					{
						padding: 30,
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
			></Animated.View>

			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => setFocused(!focused)}
				style={{ width: 150, height: 40, backgroundColor: 'red', top: 300 }}
			/>

			<MiniPlayer navigation={navigation} />
		</View>
	);
}
