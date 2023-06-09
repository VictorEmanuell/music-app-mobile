import { useEffect, useState, useRef } from 'react';
import { View, StatusBar, Image, Text, TouchableOpacity, Animated, Vibration } from 'react-native';
import TrackPlayer, {
    useTrackPlayerEvents,
    useProgress,
    Event,
} from 'react-native-track-player';
import NavBar from 'react-native-system-navigation-bar';
import { Slider } from '@miblanchard/react-native-slider';
import ContentLoader from 'react-native-easy-content-loader';

import { styles } from './styles';
import Colors from '../../assets/Colors';

import IconBack from '../../assets/Icons/icon_back.svg';
import IconPlaylist from '../../assets/Icons/icon_playlist.svg';
import Rewind from '../../assets/Icons/rewind.svg';
import Forward from '../../assets/Icons/forward.svg';
import Play from '../../assets/Icons/play.svg';
import Pause from '../../assets/Icons/pause.svg';

import { Queue } from '../../components/Queue';

const events = [Event.PlaybackState, Event.PlaybackTrackChanged];

export function Player({ navigation }) {
    NavBar.setNavigationColor(Colors.background);

    const modalizeRef = useRef(null);

    const { position, duration } = useProgress();

    const [state, setState] = useState('paused');
    const [track, setTrack] = useState({
        title: '...',
        artwork:
            'https://imagepng.org/wp-content/uploads/2017/10/quadrado-preto.png',
        artist: '...',
    });
    const [onSliding, setOnSliding] = useState(false);
    const [loading, setLoading] = useState(false);

    const sliderHeight = useRef(new Animated.Value(12)).current;

    const expand = async () => {
        Animated.timing(sliderHeight, {
            toValue: 22,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const retract = async () => {
        Animated.timing(sliderHeight, {
            toValue: 12,
            duration: 250,
            useNativeDriver: false
        }).start();
    };

    const getState = async () => {
        let state = await TrackPlayer.getState();

        setState(state);
    };

    const getTrack = async () => {
        setLoading(true);
        let index = await TrackPlayer.getCurrentTrack();
        let track = await TrackPlayer.getTrack(index);
        setTimeout(() => setLoading(false), 500);

        setTrack({ index, ...track });
    };

    const timeFormat = time => {
        const hrs = ~~(time / 3600);
        const mins = ~~((time % 3600) / 60);
        const secs = ~~time % 60;

        let ret = '';

        if (hrs > 0) {
            ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
        }

        ret += '' + mins + ':' + (secs < 10 ? '0' : '');
        ret += '' + secs;

        return ret;
    };

    useEffect(() => {
        getState();
        getTrack();
    }, []);

    useTrackPlayerEvents(events, event => {
        if (event.type === Event.PlaybackState) {
            getState();
        }

        if (event.type === Event.PlaybackTrackChanged) {
            getTrack();
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Vibration.vibrate(20);
                        navigation.goBack();
                    }}
                >
                    <IconBack width={20} />
                </TouchableOpacity>

                <Text style={styles.textPlaylist}>TOCANDO AGORA</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Vibration.vibrate(20);
                        modalizeRef.current.open();
                    }}
                >
                    <IconPlaylist width={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerImageCover}>
                <Image
                    style={styles.imageCover}
                    resizeMode="cover"
                    source={{ uri: track.artwork }}
                />
            </View>

            <View style={styles.musicInfos}>
                <View style={styles.titleAndArtist}>
                    <ContentLoader
                        title={true}
                        paragraph={false}
                        tWidth={260}
                        loading={loading}
                        containerStyles={{ paddingHorizontal: 0, bottom: -6.5 }}
                        primaryColor='#3B3F44'
                        secondaryColor='#41464B'
                    >
                        <Text style={styles.textTitle} numberOfLines={1}>{track.title}</Text>
                    </ContentLoader>

                    <ContentLoader
                        pRows={1}
                        title={false}
                        loading={loading}
                        containerStyles={{ paddingHorizontal: 0 }}
                        pWidth={120}
                        primaryColor='#3B3F44'
                        secondaryColor='#41464B'
                    >
                        <Text style={styles.textArtist}>{track.artist}</Text>
                    </ContentLoader>
                </View>

                <TouchableOpacity activeOpacity={0.8} />
            </View>

            <View style={styles.containerSlider}>
                <View
                    style={{
                        justifyContent: 'center',
                        height: 40
                    }}
                >
                    <Animated.View
                        style={{
                            height: sliderHeight,
                        }}
                    >
                        <Slider
                            value={onSliding != false ? onSliding : position}
                            onValueChange={(value) => {
                                if (onSliding != false) {
                                    setOnSliding(value);
                                }
                            }}
                            onSlidingStart={(value) => {
                                Vibration.vibrate(50);
                                expand();
                                setOnSliding(value);
                            }}
                            onSlidingComplete={async (value) => {
                                Vibration.vibrate(50);
                                retract();
                                await TrackPlayer.seekTo(value[0]);
                                setOnSliding(false);
                            }}
                            animationType="timing"
                            containerStyle={{
                                elevation: 2,
                                borderRadius: 50,
                                height: 'auto',
                                overflow: 'hidden',
                            }}
                            thumbStyle={{
                                width: 0,
                            }}
                            trackStyle={{
                                height: '100%',
                                borderRadius: 50,
                            }}
                            minimumTrackStyle={{
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                overflow: 'hidden',
                            }}
                            minimumTrackTintColor={Colors.blue}
                            maximumTrackTintColor={Colors.secondary}
                            maximumValue={duration}
                        />
                    </Animated.View>
                </View>
                <View style={styles.containerTimes}>
                    <Text style={styles.textCurrentTime}>{onSliding != false ? timeFormat(onSliding) : timeFormat(position)}</Text>
                    <Text style={styles.textFullTime}>{timeFormat(duration)}</Text>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonBack}
                    onPress={async () => {
                        Vibration.vibrate(20);
                        await TrackPlayer.skipToPrevious();
                        TrackPlayer.play();
                    }}>
                    <Rewind width={20} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonPlay}
                    onPress={() => {
                        console.log(state);
                        Vibration.vibrate(20);

                        if (state === 'playing') {
                            TrackPlayer.pause();
                        }

                        if (state === 'paused' || state === 'ready' || state === 'sopped') {
                            TrackPlayer.play();
                        }
                    }}>
                    {state === 'playing' ? (
                        <Pause width={20} />
                    ) : (
                        <Play width={20} style={{ left: 2 }} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonNext}
                    onPress={async () => {
                        Vibration.vibrate(20);
                        await TrackPlayer.skipToNext();
                        TrackPlayer.play();
                    }}>
                    <Forward width={20} />
                </TouchableOpacity>
            </View>

            <Queue
                modalizeRef={modalizeRef}
                currentIndex={track.index}
            />
        </View>
    );
}
