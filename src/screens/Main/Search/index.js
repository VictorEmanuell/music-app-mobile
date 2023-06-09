import { View } from 'react-native';

import { styles } from './styles';
import { MiniPlayer } from '../../../components/MiniPlayer';

export function Search({ navigation }) {
  return (
    <View style={styles.container}>
      <MiniPlayer navigation={navigation} />
    </View>
  );
}