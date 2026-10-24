import { ScrollView, StyleSheet, TouchableOpacity, View, Animated, TextInput, Keyboard, Pressable, ActivityIndicator, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons } from '@expo/vector-icons';
import { Divider } from '@/components/Divider';
import GradientWrapper from '@/components/GradientWrapper';
import SCText from '@/components/CustomText';
import { COLORS } from '@/constants/colors';
import { useDebounce } from 'use-debounce';
import { SearchUser, } from '@/services/SearchService';
import { deviceWidth } from '@/utils/AllContext';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSearchUsers } from '@/services/ChatService';

type TabType = 'All' | 'Accounts' | 'Posts';
const TABS: TabType[] = ['All', 'Accounts', 'Posts'];

const SearchScreen = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [activeTab, setActiveTab] = useState<TabType>('All');
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<TextInput>(null);
    const cancelAnim = useRef(new Animated.Value(0)).current;

    const { data: searchResults, isLoading: isSearchLoading } = useSearchUsers(debouncedSearch);
    // const { data: recentSearches = [], isLoading: isRecentLoading } = useRecentSearches();
    // const { mutate: clearHistory, isPending: isClearing } = useClearSearchHistory();

    console.log("The Search Results is: ", searchResults);
    // console.log("The recent Results is: ", recentSearches);




    const showCancel = useCallback(() => {
        setIsFocused(true);
        Animated.spring(cancelAnim, {
            toValue: 1,
            useNativeDriver: false,
            friction: 8,
        }).start();
    }, [cancelAnim]);

    const hideCancel = useCallback(() => {
        setIsFocused(false);
        Keyboard.dismiss();
        Animated.spring(cancelAnim, {
            toValue: 0,
            useNativeDriver: false,
            friction: 8,
        }).start();
    }, [cancelAnim]);

    const handleCancel = useCallback(() => {
        setSearch('');
        hideCancel();
    }, [hideCancel]);

    const handleClear = useCallback(() => {
        setSearch('');
        inputRef.current?.focus();
    }, []);

    const cancelWidth = cancelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 70],
    });

    const cancelOpacity = cancelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const navigateToUser = (username: string) => {
        router.push({
            pathname: '/profile-details',
            params: { username, source: "post" }
        });
    };

    const renderUserItem = (user: SearchUser) => (
        <TouchableOpacity
            key={user._id}
            style={styles.userResultItem}
            onPress={() => navigateToUser(user.username)}
        >
            <Image
                source={user.profilePicture ? { uri: user.profilePicture } : require('@/assets/images/hamper_logo.png')}
                style={styles.avatar}
                contentFit="cover"
            />
            <View style={styles.userInfo}>
                <SCText color='white' varient='semibold' size={14}>{user.username}</SCText>
                <SCText color={COLORS.gray400} varient='regular' size={12}>{user.firstName} {user.lastName}</SCText>
            </View>
        </TouchableOpacity>
    );

    const renderPostItem = (post: any) => (
        <TouchableOpacity
            key={post._id}
            style={styles.postResultItem}
        >
            <View style={styles.postHeader}>
                <Image
                    source={post.user?.profilePicture ? { uri: post.user.profilePicture } : require('@/assets/images/hamper_logo.png')}
                    style={styles.postAvatar}
                    contentFit="cover"
                />
                <SCText color='white' varient='semibold' size={14}>{post.user?.username}</SCText>
            </View>
            <SCText color='white' varient='regular' size={13} style={{ marginTop: 8 }} numberOfLines={2}>
                {post.content}
            </SCText>
        </TouchableOpacity>
    );

    return (
        <GradientWrapper>
            <SafeAreaView style={styles.container}>

                <View style={styles.searchRow}>
                    <Animated.View style={[styles.searchInputContainer, { flex: 1 }]}>
                        <Feather name="search" size={18} color="#657786" style={styles.searchIcon} />
                        <TextInput
                            ref={inputRef}
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#657786"
                            value={search}
                            onChangeText={setSearch}
                            onFocus={showCancel}
                            returnKeyType="search"
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={handleClear} style={styles.clearButton} hitSlop={8}>
                                <View style={styles.clearCircle}>
                                    <Text style={styles.clearIcon}>✕</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </Animated.View>

                    <Animated.View style={[styles.cancelContainer, { width: cancelWidth, opacity: cancelOpacity }]}>
                        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                            <SCText color='white' size={15}>Cancel</SCText>
                        </TouchableOpacity>
                    </Animated.View>
                </View>


                {debouncedSearch.trim().length > 0 && (
                    <View style={styles.tabsContainer}>
                        {TABS.map(tab => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, activeTab === tab && styles.activeTab]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <SCText
                                    color={activeTab === tab ? 'white' : COLORS.gray400}
                                    varient={activeTab === tab ? 'bold' : 'medium'}
                                >
                                    {tab}
                                </SCText>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* {!debouncedSearch.trim() ? (

                        <View style={styles.recentSection}>
                            <View style={styles.recentHeader}>
                                <SCText color='white' size={16} varient='bold'>Recent</SCText>
                                {searchResults.length > 0 && (
                                    <TouchableOpacity onPress={() => { }} disabled={false}>
                                        <SCText color={COLORS.lightBlue} size={14} varient='medium'>Clear all</SCText>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {isSearchLoading ? (
                                <ActivityIndicator size="small" color={COLORS.gray400} style={{ marginTop: 20 }} />
                            ) : searchResults.length > 0 ? (
                                searchResults.map(item => (
                                    <TouchableOpacity
                                        key={item._id}
                                        style={styles.recentItem}
                                        onPress={() => setSearch(item.query || item.searchedUser?.username || '')}
                                    >
                                        <View style={styles.recentItemLeft}>
                                            <Ionicons name="time-outline" size={20} color={COLORS.gray400} />
                                            {item.searchedUser ? (
                                                <View style={styles.recentUserContainer}>
                                                    <Image
                                                        source={item.searchedUser.profilePicture ? { uri: item.searchedUser.profilePicture } : require('@/assets/images/hamper_logo.png')}
                                                        style={styles.recentAvatar}
                                                        contentFit="cover"
                                                    />
                                                    <View>
                                                        <SCText color='white' size={14}>{item.searchedUser.username}</SCText>
                                                        <SCText color={COLORS.gray400} size={12}>{item.searchedUser.firstName}</SCText>
                                                    </View>
                                                </View>
                                            ) : (
                                                <SCText color='white' size={15} style={{ marginLeft: 12 }}>{item.query}</SCText>
                                            )}
                                        </View>
                                        <TouchableOpacity>
                                            <Ionicons name="close" size={20} color={COLORS.gray400} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <View style={styles.emptyRecent}>
                                    <SCText color={COLORS.gray400} size={14} style={{ textAlign: 'center' }}>No recent searches.</SCText>
                                </View>
                            )}
                        </View>
                    ) : isSearchLoading ? (

                        <ActivityIndicator size="large" color="white" style={{ marginTop: 40 }} />
                    ) : (
                        
                        <View style={styles.resultsContainer}>
                            {activeTab === 'All' && (
                                <>
                                    {searchResults?.users.map(renderUserItem)}
                                    {searchResults?.posts.map(renderPostItem)}

                                    {searchResults?.users.length === 0 && searchResults?.posts.length === 0 && (
                                        <SCText color={COLORS.gray400} style={styles.noResults}>No results found for "{debouncedSearch}"</SCText>
                                    )}
                                </>
                            )}

                            {activeTab === 'Accounts' && (
                                <>
                                    {searchResults?.users.map(renderUserItem)}
                                    {searchResults?.users.length === 0 && (
                                        <SCText color={COLORS.gray400} style={styles.noResults}>No accounts found.</SCText>
                                    )}
                                </>
                            )}

                            {activeTab === 'Posts' && (
                                <>
                                    {searchResults?.posts.map(renderPostItem)}
                                    {searchResults?.posts.length === 0 && (
                                        <SCText color={COLORS.gray400} style={styles.noResults}>No posts found.</SCText>
                                    )}
                                </>
                            )}
                        </View>
                    )} */}
                </ScrollView>
            </SafeAreaView>
        </GradientWrapper>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Search Bar
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: 'white',
        padding: 0,
        margin: 0,
    },
    clearButton: {
        marginLeft: 8,
    },
    clearCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#657786',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearIcon: {
        fontSize: 10,
        color: 'white',
        fontWeight: '700',
    },
    cancelContainer: {
        overflow: 'hidden',
        alignItems: 'flex-end',
    },
    cancelButton: {
        paddingLeft: 12,
        justifyContent: 'center',
        height: 40,
    },

    // Tabs
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        marginBottom: 10,
    },
    tab: {
        marginRight: 24,
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: 'white',
    },

    scrollContent: {
        flex: 1,
    },

    // Recent Searches
    recentSection: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    recentItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    recentUserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    recentAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    emptyRecent: {
        paddingVertical: 40,
    },

    // Results
    resultsContainer: {
        paddingHorizontal: 16,
    },
    userResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    postResultItem: {
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        marginBottom: 12,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 40,
    }
});