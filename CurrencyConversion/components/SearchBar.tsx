import { AppImages } from '@/constants/AppImages';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Props {
    placeholder?: string;
    onSearch: (text: string) => void;
    onPressReset: () => void;
}

const SearchBar = (props: Props) => {
    const [searchText, setSearchText] = useState("");


    const handleChangeText = (text: string) => {
        const trimmedText = text.replace(/^[\s]+/, '');
        setSearchText(trimmedText);
    };

    const handleClear = () => {
        setSearchText("");
        props?.onPressReset();
    };

    const handleSearch = () => {
        const trimmedText = searchText.trim();
        if (trimmedText.length > 0) {
            props?.onSearch(trimmedText);
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={props?.placeholder}
                value={searchText}
                onChangeText={handleChangeText}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
            />

            {searchText.length > 0 && (
                <TouchableOpacity hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }} onPress={handleClear} style={styles.clearButton}>
                    <Image
                        source={AppImages.cross}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }} onPress={handleSearch} style={styles.searchButton}>
                <Image
                    source={AppImages.search}
                    style={styles.icon}
                />
            </TouchableOpacity>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '89%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    clearButton: {
        marginLeft: 8,
    },
    searchButton: {
        marginLeft: 8,
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default SearchBar;
