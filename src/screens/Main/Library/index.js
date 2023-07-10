import { View } from 'react-native';

import { MiniPlayer } from '../../../components/MiniPlayer';
import { TabNavigatorContainer } from '../../../components/TabNavigator';

import { styles } from './styles';

export function Library({ navigation, route }) {
	return (
		<TabNavigatorContainer screen={route.name}>
			<MiniPlayer navigation={navigation} />
		</TabNavigatorContainer>
	);
}
