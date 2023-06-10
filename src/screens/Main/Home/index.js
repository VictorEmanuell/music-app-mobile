import { View, TouchableOpacity, Text, StatusBar } from 'react-native';

import { MiniPlayer } from '../../../components/MiniPlayer';

import { styles } from './styles';
import Colors from '../../../assets/Colors';

export function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={Colors.background} />

            <MiniPlayer navigation={navigation} />
        </View>
    );
}