import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddUploadComponent from '@/components/AddUploadComponent';
import { deviceHeight, deviceWidth } from '@/utils/AllContext';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useGetAllVideos } from '@/services/VideoService';
import GradientWrapper from '@/components/GradientWrapper';


interface Props {
    uri: string;
    active: boolean;
}

function ReelVideo({
    uri,
    active,
}: Props) {
    const player = useVideoPlayer(uri, (player) => {
        player.loop = true;
        player.muted = false;
    });

    useEffect(() => {
        if (active) {
            player.play();
        } else {
            player.pause();
        }
    }, [active]);

    return (
        <VideoView
            style={StyleSheet.absoluteFill}
            player={player}
            contentFit="cover"
            allowsFullscreen={false}
            allowsPictureInPicture={false}
        />
    );
}

const AddVideo = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [addModal, setModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    // const [videos, setVideos] = useState<any[]>([]);


    // const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    //     if (viewableItems.length > 0) {
    //         setCurrentIndex(viewableItems[0].index);
    //     }
    // }).current;

    // const viewabilityConfig = {
    //     itemVisiblePercentThreshold: 80,
    // };

    // const fetchVideos = async () => {
    //     try {
    //         setLoading(true);
    //         const res = await fetch('http://10.0.2.2:8000/api/videos');
    //         const data = await res.json();
    //         console.log("The Resposne is: ", data);

    //         setVideos(data);
    //     } catch (err) {
    //         console.error('Error fetching videos', err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchVideos();
    // }, []);


    const { data, isLoading, refetch } = useGetAllVideos();

    const videos = data ?? [];

    console.log("The Data is: ", videos);



    const renderItem = ({ item, index }: any) => {
        return (
            <View
                style={{
                    width: deviceWidth,
                    height: deviceHeight,
                }}
            >
                <ReelVideo
                    uri={item.videoUrl}
                    active={currentIndex === index}
                />

                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    onPress={() => {
                        if (currentIndex === index) {
                            setCurrentIndex(-1);
                        } else {
                            setCurrentIndex(index);
                        }
                    }}
                >
                    {currentIndex !== index && (
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: "rgba(0,0,0,0.6)",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                marginTop: "80%",
                            }}
                        >
                            <MaterialIcons
                                name="play-arrow"
                                size={64}
                                color="white"
                            />
                        </View>
                    )}

                    <View
                        style={{
                            position: "absolute",
                            bottom: 80,
                            left: 15,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "600",
                            }}
                        >
                            {item.caption}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={videos}
                keyExtractor={(item: any) => item._id || item.id}
                renderItem={renderItem}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={deviceHeight}
                snapToAlignment="start"
                onScroll={(e: any) => {
                    setCurrentIndex(
                        Math.round(e.nativeEvent.contentOffset.y / deviceHeight)
                    );
                }}
            />

            <AddUploadComponent show={addModal} close={() => setModal(false)}
                onUploadSuccess={() => refetch()}
            />
        </View>
    )
}

export default AddVideo

const styles = StyleSheet.create({})