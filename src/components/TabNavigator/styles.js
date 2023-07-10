import { StyleSheet } from 'react-native';

import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

export const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: Colors.primary,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	pressable: {
		padding: 20,
	},
});
