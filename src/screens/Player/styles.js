import { StyleSheet } from 'react-native';

import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	header: {
		flexDirection: 'row',
		width: '80%',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	textPlaylist: {
		fontSize: 14,
		fontFamily: Fonts.bold,
		color: Colors.white,
	},
	containerImageCover: {
		width: '80%',
		aspectRatio: 1,
		elevation: 4,
	},
	imageCover: {
		width: '100%',
		height: '100%',
		borderRadius: 18,
	},
	musicInfos: {
		flexDirection: 'row',
		width: '80%',
		justifyContent: 'space-between',
		bottom: -20,
	},
	titleAndArtist: {
		gap: 2,
	},
	textTitle: {
		fontSize: 20,
		fontFamily: Fonts.bold,
		color: Colors.white,
		elevation: 4,
	},
	textArtist: {
		fontSize: 14,
		fontFamily: Fonts.regular,
		color: Colors.white,
		opacity: 0.44,
		elevation: 4,
	},
	containerSlider: {
		width: '80%',
		height: 50,
		justifyContent: 'space-evenly',
	},
	containerTimes: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textCurrentTime: {
		color: Colors.white,
		fontSize: 12,
		fontFamily: Fonts.light,
	},
	textFullTime: {
		color: Colors.white,
		opacity: 0.35,
		fontSize: 12,
		fontFamily: Fonts.light,
	},
	controls: {
		flexDirection: 'row',
		width: '80%',
		justifyContent: 'space-around',
		alignItems: 'center',
		top: -15,
	},
	buttonBack: {
		padding: 5,
	},
	buttonPlay: {
		padding: 28,
		borderRadius: 100,
		backgroundColor: '#0095E9',
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonNext: {
		padding: 5,
	},
});
