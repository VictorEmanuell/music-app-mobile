import { View } from 'react-native';

import { styles } from './styles';
import { MiniPlayer } from '../../../components/MiniPlayer';

export function Library({ navigation }) {
  return (
    <View style={styles.container}>

      <MiniPlayer navigation={navigation} />
    </View>
  );
}