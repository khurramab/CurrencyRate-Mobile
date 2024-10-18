import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    title: String,
    description: String,
}
const EmptyComponent = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props?.title}</Text>
            <Text style={styles.description}>{props?.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: Colors.dark.grey,
        textAlign: 'center',
    },
});

export default EmptyComponent;
