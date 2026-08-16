import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { SCTextInput } from '@/utils/CustomInputStore';
import { deviceWidth } from '@/utils/AllContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { FlatList } from 'react-native-gesture-handler';

export const codePointToEmoji = (codepoint: string) => {
    return String.fromCodePoint(parseInt(codepoint, 16));
};

const EMOJI_CACHE_KEY = 'noto_emojis_cache';

let inMemoryEmojiCache: any[] | null = null;

const EMOJI_ITEM_SIZE = 44;

const EmojiPicker = ({ show, close, onSelect }: {
    show: boolean, close: () => void, onSelect: (emoji: any) => void
}) => {
    const [emojis, setEmojis] = useState<any[]>(inMemoryEmojiCache ?? []);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const isSheetOpen = useRef(false);

    const loadEmoji = useCallback(async () => {
        if (inMemoryEmojiCache) {
            setEmojis(inMemoryEmojiCache)
            return;
        }

        try {
            const cached = await AsyncStorage.getItem(EMOJI_CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                inMemoryEmojiCache = parsed;
                setEmojis(parsed);
                return;
            }
        } catch (error) {
            console.warn("Emoji cache read error", error);
        }

        // network fetch
        try {
            setIsLoading(true);
            const response = await fetch(
                'https://googlefonts.github.io/noto-emoji-animation/data/api.json'
            );
            const data = await response.json();
            const icons: any[] = data.icons;

            inMemoryEmojiCache = icons;
            setEmojis(icons);
            await AsyncStorage.setItem(EMOJI_CACHE_KEY, JSON.stringify(icons));
        } catch (e) {
            console.warn('Emoji fetch error:', e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEmoji();
    }, [loadEmoji]);


    useEffect(() => {
        if (show && !isSheetOpen.current) {
            setSearch('');
            actionSheetRef.current?.show();
            isSheetOpen.current = true;
        } else if (!show && isSheetOpen.current) {
            actionSheetRef.current?.hide();
            isSheetOpen.current = false;
        }
    }, [show]);


    const handleSheetClose = useCallback(() => {
        isSheetOpen.current = false;
        close();
    }, [close]);

    const filteredEmojis = useMemo(() => {
        if (!search.trim()) return emojis;
        const lowerSearch = search.toLowerCase();
        return emojis.filter(e => e.name?.toLowerCase().includes(lowerSearch));
    }, [emojis, search]);

    const handleEmojiPress = useCallback((codepoint: string) => {
        onSelect(codepoint);
    }, [onSelect]);

    const renderItem = useCallback(({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => handleEmojiPress(item.codepoint)}
            style={styles.emojiItem}
        >
            <Text style={styles.emoji}>
                {codePointToEmoji(item.codepoint)}
            </Text>
        </TouchableOpacity>
    ), [handleEmojiPress]);

    const keyExtractor = useCallback((item: any) => item.codepoint, []);

    const getItemLayout = useCallback((_: any, index: number) => ({
        length: EMOJI_ITEM_SIZE,
        offset: EMOJI_ITEM_SIZE * Math.floor(index / 9),
        index,
    }), []);

    return (
        <ActionSheet
            ref={actionSheetRef}
            gestureEnabled
            onClose={handleSheetClose}
            containerStyle={styles.sheetContainer}
        >
            <View style={styles.contentWrapper}>
                <SCTextInput
                    wrapperStyle={{ width: deviceWidth - 40 }}
                    placeholder='Search Emoji'
                    value={search}
                    onChangeText={setSearch}
                />

                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" />
                        <Text style={styles.loadingText}>Loading emojis...</Text>
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={filteredEmojis}
                        numColumns={9}
                        keyExtractor={keyExtractor}
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        renderItem={renderItem}
                        getItemLayout={getItemLayout}
                        removeClippedSubviews
                        maxToRenderPerBatch={36}
                        windowSize={5}
                        initialNumToRender={36}
                    />
                )}
            </View>
        </ActionSheet>
    )
}

export default EmojiPicker

const styles = StyleSheet.create({
    sheetContainer: {
        // height: '60%',
        backgroundColor: '#12051F',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    contentWrapper: {
        height: 400,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        paddingTop: 20,
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        paddingHorizontal: 8,
        // paddingTop: 8,
    },
    emojiItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // height: EMOJI_ITEM_SIZE,
    },
    emoji: {
        fontSize: 32,
    },
    loaderContainer: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    loadingText: {
        color: '#6B7280',
        fontSize: 14,
    },
});