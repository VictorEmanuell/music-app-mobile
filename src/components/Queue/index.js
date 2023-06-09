import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import { Modalize } from 'react-native-modalize';
import TrackPlayer from 'react-native-track-player';

import { styles } from './styles';
import Colors from '../../assets/Colors';

export function Queue({ modalizeRef, currentIndex }) {
    const [queue, setQueue] = useState([]);

    const getQueue = async () => {
        let queue = await TrackPlayer.getQueue();

        setQueue(queue);
    };

    useEffect(() => {
        getQueue();
    }, [])

    return (
        <Modalize
            ref={modalizeRef}
            modalStyle={{
                backgroundColor: Colors.background,
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
            }}
            handlePosition='inside'
            handleStyle={{
                backgroundColor: Colors.white,
                opacity: 0.6,
                marginTop: 3,
                width: '15%',
                height: 4
            }}
            avoidKeyboardLikeIOS={true}
            snapPoint={450}
            scrollViewProps={{
                showsVerticalScrollIndicator: false
            }}
        >
            <View
                style={styles.container}
            >
                <Text
                    style={styles.textQueueHeader}
                >Na fila:</Text>
                {queue.map((item, index) => {
                    if (index <= currentIndex) {
                        return;
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            style={{
                                padding: 10,
                                width: '90%'
                            }}
                            onPress={async () => {
                                await TrackPlayer.skip(index);
                                TrackPlayer.play();
                                modalizeRef.current.close();
                            }}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.textTitle}>{item.title}</Text>
                            <Text style={styles.textArtist}>{item.artist ? item.artist : '...'}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </Modalize>
    );
}