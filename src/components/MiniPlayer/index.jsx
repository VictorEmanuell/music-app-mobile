import React from 'react';
import {
	View,
	Image,
	Text,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Vibration,
} from 'react-native';
import TrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player';
import ContentLoader from 'react-native-easy-content-loader';
import MarqueeText from 'react-native-marquee';
import Animated from 'react-native-reanimated';

import Rewind from '../../assets/Icons/rewind.svg';
import Forward from '../../assets/Icons/forward.svg';
import Play from '../../assets/Icons/play-blue.svg';
import Pause from '../../assets/Icons/pause-blue.svg';
import ImageLoad from '../../assets/Icons/image-load.png';

import { styles } from './styles';

const events = [Event.PlaybackState, Event.PlaybackTrackChanged];

export function MiniPlayer({ navigation }) {
	const [state, setState] = React.useState('paused');
	const [track, setTrack] = React.useState({
		title: '...',
		artwork: '',
		artist: '...',
	});
	const [loading, setLoading] = React.useState(false);

	const getState = async () => {
		let state = await TrackPlayer.getState();

		setState(state);
	};

	const getTrack = async () => {
		setLoading(true);
		let index = await TrackPlayer.getCurrentTrack();
		let track = await TrackPlayer.getTrack(index);
		setTimeout(() => setLoading(false), 200);

		setTrack({ index, ...track });
	};

	React.useEffect(() => {
		getState();
		getTrack();
	}, []);

	useTrackPlayerEvents(events, (event) => {
		if (event.type === Event.PlaybackState) {
			getState();
		}

		if (event.type === Event.PlaybackTrackChanged) {
			getTrack();
		}
	});

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				navigation.navigate('Player', { artwork: track.artwork });
			}}
		>
			<View style={styles.containerMiniPlayer}>
				<View style={styles.containerImageCover}>
					<Animated.Image
						// sharedTransitionTag="sharedTag"
						style={styles.imageCover}
						resizeMode="cover"
						source={!track.artwork ? ImageLoad : { uri: track.artwork }}
					/>
				</View>

				<View style={styles.musicInfos}>
					<View style={styles.titleAndArtist}>
						<ContentLoader
							title={true}
							paragraph={false}
							tWidth={150}
							loading={loading}
							containerStyles={{ paddingHorizontal: 0, bottom: -6.5 }}
							primaryColor="#3B3F44"
							secondaryColor="#41464B"
						>
							<MarqueeText
								style={styles.textTitle}
								speed={0.3}
								marqueeOnStart={true}
								loop={true}
								delay={2000}
							>
								{track.title}
							</MarqueeText>
						</ContentLoader>

						<ContentLoader
							pRows={1}
							title={false}
							loading={loading}
							containerStyles={{ paddingHorizontal: 0 }}
							pWidth={100}
							primaryColor="#3B3F44"
							secondaryColor="#41464B"
						>
							<Text style={styles.textArtist} numberOfLines={1}>
								{track.artist}
							</Text>
						</ContentLoader>
					</View>
				</View>

				<View style={styles.controls}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.buttonBack}
						onPress={async () => {
							Vibration.vibrate(20);
							await TrackPlayer.skipToPrevious();
							TrackPlayer.play();
						}}
					>
						<Rewind width={20} />
					</TouchableOpacity>

					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.buttonPlay}
						onPress={() => {
							console.log(state);
							Vibration.vibrate(20);

							if (state === 'playing') {
								TrackPlayer.pause();
							}

							if (state === 'paused' || state === 'ready' || state === 'sopped') {
								TrackPlayer.play();
							}
						}}
					>
						{state === 'playing' ? <Pause width={20} /> : <Play width={20} style={{ left: 2 }} />}
					</TouchableOpacity>

					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.buttonNext}
						onPress={async () => {
							Vibration.vibrate(20);
							await TrackPlayer.skipToNext();
							TrackPlayer.play();
						}}
					>
						<Forward width={20} />
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
