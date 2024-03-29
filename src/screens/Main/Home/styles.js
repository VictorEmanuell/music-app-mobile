import { StyleSheet } from 'react-native';

import Colors from '../../../assets/Colors';
import Fonts from '../../../assets/Fonts';

export const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		height: '92%',
		backgroundColor: Colors.background,
	},
	button: {
		backgroundColor: '#fff',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20,
		borderRadius: 15,
	},
});
