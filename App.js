import 'react-native-gesture-handler';
import React from 'react';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from 'react-native-track-player';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavBar from 'react-native-system-navigation-bar';

import Colors from './src/assets/Colors';

import Routes from './src/routes';

import axios from 'axios';

(async function () {
	await TrackPlayer.setupPlayer();
	await TrackPlayer.updateOptions({
		android: {
			appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
		},
		compactCapabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
		],
		notificationCapabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.SeekTo,
		],
	});

	// const getSongs = await axios.get('http://192.168.0.10:8000/data/song/audio?pl=true&id=PLz5qkjG8i6lP0xvJNUF_F1NGcNjmyEQ6Z')

	import('./data.json').then((data) => {
		TrackPlayer.add(data.data);
	});
})();

export default function App() {
	NavBar.setNavigationBarDividerColor(Colors.primary);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: Colors.background,
					paddingTop: Platform.OS === 'android' ? 24 : 0,
					paddingBottom: Platform.OS === 'android' ? 24 : 0,
				}}
			>
				<StatusBar barStyle="light-content" backgroundColor={Colors.background} />
				<Routes />
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}
