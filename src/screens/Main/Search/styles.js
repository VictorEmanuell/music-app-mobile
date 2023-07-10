import { StyleSheet } from 'react-native';

import Colors from '../../../assets/Colors';
import Fonts from '../../../assets/Fonts';

export const styles = StyleSheet.create({
	container: {
		height: '92%',
		backgroundColor: Colors.background,
	},
	inputTextSearch: {
		color: 'white',
		fontFamily: Fonts.regular,
		fontSize: 20,
		top: -3,
	},
});
