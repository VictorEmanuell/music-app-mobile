import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { styles } from './styles';
import { SearchCard } from '../SearchCard';

// types >>> result, historic, categories

export function SearchList({ type, data, navigation }) {
	switch (type) {
		case 'historic':
			return (
				<View style={styles.container}>
					<Text style={styles.textTitle}>Histórico</Text>
					<SearchCard
						type="artist"
						title="The Weeknd"
						imageCover="https://lh3.googleusercontent.com/RNsC4IIArffVIpusLyonzKv_ijRbLmZYXkrQtKNrtLomjWr_sGnvPoDRoNSSDzq9F_ax-TOFmxuYS6hMRg=w1024-h1024-l90-rj"
					/>
					<SearchCard
						type="album"
						title="StarBoy"
						imageCover="https://lh3.googleusercontent.com/dcxXIIlest09vnvKznWM9VWQXu1EL7lKxBzXGzwgmVjmMNBm1dEWT_0qn1xrEZYyKF_qRE1TLq8P_JY_mQ=w1024-h1024-l90-rj"
					/>
					<SearchCard
						type="track"
						title="I Was Never There"
						imageCover="https://lh3.googleusercontent.com/AJ-AV9FxrD8AuPrZoq3IfhnjA0AzT5_xJ3_fdoFT7bPgbh4Z93tpECz_vr9-K82yAci22ylU01E7T8Fcew=w1024-h1024-l90-rj"
					/>
					<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}></ScrollView>
				</View>
			);

		case 'result':
			return (
				<View style={styles.container}>
					<Text style={styles.textTitle}>Resultado</Text>

					<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
						{data?.map((item) => {
							if (item.type && item.name && item.thumbnails[0]?.url) {
								return (
									<SearchCard
										type={cardTypes(item.type)}
										title={item.name}
										imageCover={item.thumbnails[0].url}
										data={item}
										navigation={navigation}
									/>
								);
							}
						})}
					</ScrollView>
				</View>
			);

		case 'categories':
			return (
				<View style={styles.container}>
					<Text style={styles.textTitle}>Gêneros</Text>

					<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}></ScrollView>
				</View>
			);

		default:
			break;
	}
}

const cardTypes = (type) => {
	switch (type) {
		case 'artist':
			return 'artist';
		case 'album' || 'single' || 'playlist':
			return 'album';
		case 'song' || 'music' || 'video':
			return 'track';

		default:
			return 'track';
	}
};