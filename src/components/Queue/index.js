import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Vibration } from 'react-native';
import { Modalize } from 'react-native-modalize';
import TrackPlayer from 'react-native-track-player';

import ImageLoad from '../../assets/Icons/image-load.png';

import { styles } from './styles';
import Colors from '../../assets/Colors';

export function Queue({ modalizeRef, currentIndex }) {
	const [queue, setQueue] = useState([]);

	const getQueue = async () => {
		let queue = await TrackPlayer.getQueue();

		setQueue(queue);
	};

	useEffect(() => {
		getQueue();
	}, []);

	return (
		<Modalize
			ref={modalizeRef}
			modalStyle={{
				backgroundColor: Colors.background,
				borderTopLeftRadius: 18,
				borderTopRightRadius: 18,
			}}
			handlePosition="inside"
			handleStyle={{
				backgroundColor: Colors.white,
				opacity: 0.6,
				marginTop: 3,
				width: '15%',
				height: 4,
			}}
			avoidKeyboardLikeIOS={true}
			snapPoint={450}
			scrollViewProps={{
				showsVerticalScrollIndicator: false,
			}}
		>
			<View style={styles.container}>
				<Text style={styles.textQueueHeader}>Na fila:</Text>
				{queue.map((item, index) => {
					if (index <= currentIndex) {
						return;
					}

					return (
						<TouchableOpacity
							key={index}
							style={{
								paddingVertical: 15,
								width: '90%',
								flexDirection: 'row',
							}}
							onPress={async () => {
								await TrackPlayer.skip(index);
								TrackPlayer.play();
								modalizeRef.current.close();
							}}
							activeOpacity={0.6}
						>
							<View style={styles.containerImageCover}>
								<Image
									style={styles.imageCover}
									resizeMode="cover"
									source={!item.artwork ? ImageLoad : { uri: item.artwork }}
									loadingIndicatorSource={ImageLoad}
								/>
							</View>

							<View style={styles.containerTexts}>
								<Text style={styles.textTitle} numberOfLines={1}>
									{item.title}
								</Text>

								<Text style={styles.textArtist} numberOfLines={1}>
									{item.artist ? item.artist : '...'}
								</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		</Modalize>
	);
}
