import { View, TouchableOpacity, Text, StatusBar } from 'react-native';

import { MiniPlayer } from '../../../components/MiniPlayer';
import { TabNavigatorContainer } from '../../../components/TabNavigator';

import { styles } from './styles';
import Colors from '../../../assets/Colors';

export function Home({ navigation, route }) {
	return (
		<TabNavigatorContainer screen={route.name}>
			<StatusBar barStyle="light-content" backgroundColor={Colors.background} />

			<MiniPlayer navigation={navigation} />
		</TabNavigatorContainer>
	);
}
