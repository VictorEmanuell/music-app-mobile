import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';

import IconX from '../../assets/Icons/icon_x.svg';

import { styles } from './styles';
import Fonts from '../../assets/Fonts';
import Colors from '../../assets/Colors';
import { api } from '../../services/api';

export function SearchCard({ type, title, imageCover, data, navigation }) {
	const playTrack = async () => {
		const track = await api.get(`/data/song/audio?pl=false&id=${data.videoId}`);

		await TrackPlayer.reset();
		await TrackPlayer.add(track.data.data);
		await TrackPlayer.play();
		navigation.navigate('Player', { artwork: track.data.data.artwork });
	};

	switch (type) {
		case 'artist':
			return (
				<TouchableOpacity activeOpacity={0.8} style={styles.container}>
					<View style={{ aspectRatio: 1, width: 40 }}>
						<Image
							source={{
								uri: imageCover,
							}}
							style={{ width: '100%', height: '100%', borderRadius: 100 }}
							resizeMode="cover"
						/>
					</View>

					<View style={{ paddingLeft: 10 }}>
						<Text style={{ fontFamily: Fonts.bold, fontSize: 15, color: Colors.white }}>
							{title}
						</Text>
						<Text
							style={{ fontFamily: Fonts.bold, fontSize: 14, color: Colors.white, opacity: 0.5 }}
						>
							Artista
						</Text>
					</View>

					<TouchableOpacity
						activeOpacity={0.2}
						style={{ position: 'absolute', right: 0, opacity: 0.5, padding: 5 }}
					>
						<IconX width={20} />
					</TouchableOpacity>
				</TouchableOpacity>
			);

		case 'album':
			return (
				<TouchableOpacity activeOpacity={0.8} style={styles.container}>
					<View style={{ aspectRatio: 1, width: 40 }}>
						<Image
							source={{
								uri: imageCover,
							}}
							style={{ width: '100%', height: '100%', borderRadius: 5 }}
							resizeMode="cover"
						/>
					</View>

					<View style={{ paddingLeft: 10 }}>
						<Text style={{ fontFamily: Fonts.bold, fontSize: 15, color: Colors.white }}>
							{title}
						</Text>
						<Text
							style={{ fontFamily: Fonts.bold, fontSize: 14, color: Colors.white, opacity: 0.5 }}
						>
							Album
						</Text>
					</View>

					<TouchableOpacity
						activeOpacity={0.2}
						style={{ position: 'absolute', right: 0, opacity: 0.5, padding: 5 }}
					>
						<IconX width={20} />
					</TouchableOpacity>
				</TouchableOpacity>
			);

		case 'track':
			return (
				<TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => playTrack()}>
					<View style={{ aspectRatio: 1, width: 40 }}>
						<Image
							source={{
								uri: imageCover,
							}}
							style={{ width: '100%', height: '100%', borderRadius: 5 }}
							resizeMode="cover"
						/>
					</View>

					<View style={{ paddingLeft: 10 }}>
						<Text style={{ fontFamily: Fonts.bold, fontSize: 15, color: Colors.white }}>
							{title}
						</Text>
						<Text
							style={{ fontFamily: Fonts.bold, fontSize: 14, color: Colors.white, opacity: 0.5 }}
						>
							Música {data?.artist?.name ? `• ${data.artist.name}` : ''}
						</Text>
					</View>

					<TouchableOpacity
						activeOpacity={0.2}
						style={{ position: 'absolute', right: 0, opacity: 0.5, padding: 5 }}
					>
						<IconX width={20} />
					</TouchableOpacity>
				</TouchableOpacity>
			);

		default:
			break;
	}
}
