import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddUploadComponent from '@/components/AddUploadComponent';
import { deviceHeight, deviceWidth } from '@/utils/AllContext';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useGetAllVideos } from '@/services/VideoService';
import GradientWrapper from '@/components/GradientWrapper';
import SCText from '@/components/CustomText';


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


                </TouchableOpacity>
                <View
                    style={{
                        position: "absolute",
                        bottom: 90,
                        left: 15,
                    }}
                >

                    <SCText
                        size={18}
                        ellipsizeMode='tail'
                        color='white'
                        varient='bold'
                    >
                        {item.title}
                    </SCText>

                    <SCText
                        style={{
                            color: "white",

                            fontWeight: "600",
                        }}
                    >
                        {item.caption}
                    </SCText>
                </View>

                <TouchableOpacity onPress={() => setModal(true)} style={{
                    position: "absolute",
                    bottom: 20,
                    left: deviceWidth / 2.4,
                }}>

                    <View style={{ padding: 10, }}>
                        <MaterialIcons size={50} name='add-circle' color={'red'} />
                    </View>

                </TouchableOpacity>
            </View>
        );
    };

    if (!isLoading && videos?.length === 0) {
        return (
            <GradientWrapper>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MaterialIcons
                        name="video-library"
                        size={100}
                        color="white"
                    />

                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            marginTop: 12,
                        }}
                    >
                        No Videos Yet
                    </Text>

                    <Text
                        style={{
                            color: "gray",
                            marginTop: 5,
                        }}
                    >
                        Be the first to upload
                    </Text>

                    <TouchableOpacity
                        onPress={() => setModal(true)}
                        style={{
                            marginTop: 20,
                            backgroundColor: "#8B5CF6",
                            paddingHorizontal: 24,
                            paddingVertical: 14,
                            borderRadius: 30,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            Upload Video
                        </Text>
                    </TouchableOpacity>
                </View>

                <AddUploadComponent
                    show={addModal}
                    close={() => setModal(false)}
                    onUploadSuccess={() => refetch()}
                />
            </GradientWrapper>
        );
    }

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={videos ?? []}
                keyExtractor={(item: any) => item._id || item.id}
                renderItem={renderItem}
                pagingEnabled
                decelerationRate="fast"
                snapToInterval={deviceHeight}
                snapToAlignment="start"
                onScroll={(e) => {
                    setCurrentIndex(
                        Math.round(e.nativeEvent.contentOffset.y / deviceHeight)
                    );
                }}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            flex: 1,
                            height: deviceHeight,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MaterialIcons
                            name="video-library"
                            size={80}
                            color="gray"
                        />

                        <Text
                            style={{
                                color: "gray",
                                fontSize: 18,
                                marginTop: 10,
                            }}
                        >
                            No videos uploaded yet
                        </Text>

                        <TouchableOpacity
                            onPress={() => setModal(true)}
                            style={{
                                marginTop: 20,
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                backgroundColor: "#6C5CE7",
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ color: "#fff" }}>
                                Upload First Video
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <AddUploadComponent show={addModal} close={() => setModal(false)}
                onUploadSuccess={() => refetch()}
            />
        </View>
    )
}

export default AddVideo

const styles = StyleSheet.create({})