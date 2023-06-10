import { StyleSheet } from 'react-native';

import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

export const styles = StyleSheet.create({
	containerMiniPlayer: {
		flexDirection: 'row',
		padding: 20,
		backgroundColor: Colors.secondary,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	containerImageCover: {
		width: '15%',
		aspectRatio: 1,
		elevation: 4,
	},
	imageCover: {
		width: '100%',
		height: '100%',
		borderRadius: 8,
	},
	musicInfos: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 12,
		width: '55%',
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
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		position: 'absolute',
		alignSelf: 'center',
		right: 15,
	},
	buttonBack: {
		padding: 5,
	},
	buttonPlay: {
		padding: 8,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonNext: {
		padding: 5,
	},
});
