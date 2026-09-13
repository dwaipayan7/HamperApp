import { ScrollView, StyleSheet, TouchableOpacity, View, Animated, TextInput, Keyboard, ActivityIndicator } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons } from '@expo/vector-icons';
import GradientWrapper from '@/components/GradientWrapper';
import SCText from '@/components/CustomText';
import { COLORS } from '@/constants/colors';
import { useDebounce } from 'use-debounce';
import { SearchUser, userSearchUsers, } from '@/services/SearchService';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';


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

    // const { data: searchResults, isLoading: isSearchLoading } = useSearchUsers(debouncedSearch);

    const { data: searchResults, isLoading: isSearchLoading } = userSearchUsers(debouncedSearch)

    console.log("The Search Results is: ", searchResults);

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
            {post.image ? (
                <Image
                    source={{ uri: post.image }}
                    style={styles.postImage}
                    contentFit="cover"
                />
            ) : null}
            <View style={styles.postFooter}>
                <View style={styles.postStat}>
                    <Ionicons name="heart-outline" size={14} color={COLORS.gray400} />
                    <SCText color={COLORS.gray400} size={12} style={{ marginLeft: 4 }}>{post.likes?.length ?? 0}</SCText>
                </View>
                <View style={styles.postStat}>
                    <Ionicons name="chatbubble-outline" size={14} color={COLORS.gray400} />
                    <SCText color={COLORS.gray400} size={12} style={{ marginLeft: 4 }}>{post.comments?.length ?? 0}</SCText>
                </View>
            </View>
        </TouchableOpacity>
    );

    const users = searchResults?.users ?? [];
    const posts = searchResults?.posts ?? [];
    const hasQuery = debouncedSearch.trim().length > 0;
    const hasNoResults = users.length === 0 && posts.length === 0;

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


                {hasQuery && (
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
                    {!hasQuery ? (
                        <View style={styles.emptyState}>
                            <Feather name="search" size={48} color={COLORS.gray400} />
                            <SCText color={COLORS.gray400} size={16} style={{ marginTop: 16, textAlign: 'center' }}>
                                Search for people and posts
                            </SCText>
                        </View>
                    ) : isSearchLoading ? (
                        <ActivityIndicator size="large" color="white" style={{ marginTop: 40 }} />
                    ) : (
                        <View style={styles.resultsContainer}>
                            {activeTab === 'All' && (
                                <>
                                    {users.length > 0 && (
                                        <View style={styles.sectionContainer}>
                                            <SCText color={COLORS.gray400} varient='bold' size={13} style={styles.sectionTitle}>
                                                ACCOUNTS
                                            </SCText>
                                            {users.map(renderUserItem)}
                                        </View>
                                    )}

                                    {posts.length > 0 && (
                                        <View style={styles.sectionContainer}>
                                            <SCText color={COLORS.gray400} varient='bold' size={13} style={styles.sectionTitle}>
                                                POSTS
                                            </SCText>
                                            {posts.map(renderPostItem)}
                                        </View>
                                    )}

                                    {hasNoResults && (
                                        <SCText color={COLORS.gray400} style={styles.noResults}>No results found for "{debouncedSearch}"</SCText>
                                    )}
                                </>
                            )}

                            {activeTab === 'Accounts' && (
                                <>
                                    {users.map(renderUserItem)}
                                    {users.length === 0 && (
                                        <SCText color={COLORS.gray400} style={styles.noResults}>No accounts found.</SCText>
                                    )}
                                </>
                            )}

                            {activeTab === 'Posts' && (
                                <>
                                    {posts.map(renderPostItem)}
                                    {posts.length === 0 && (
                                        <SCText color={COLORS.gray400} style={styles.noResults}>No posts found.</SCText>
                                    )}
                                </>
                            )}
                        </View>
                    )}
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

    // Empty state
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },

    // Results
    resultsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    sectionContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        marginBottom: 8,
        letterSpacing: 1,
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
    postImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginTop: 10,
    },
    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 16,
    },
    postStat: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    noResults: {
        textAlign: 'center',
        marginTop: 40,
    },

    // Recent Searches (kept for future use)
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
});