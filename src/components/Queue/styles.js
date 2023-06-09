import { StyleSheet } from 'react-native';

import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    textQueueHeader: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: Colors.white,
        width: '90%',
        paddingVertical: 25
    },
    textTitle: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: Colors.white,
        elevation: 4
    },
    textArtist: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.white,
        opacity: 0.44,
        elevation: 4
    },
});