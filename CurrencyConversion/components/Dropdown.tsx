import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface Props {
    highToLow: any;
    lowToHigh: any;
}
export const Dropdown = (props: Props) => {
    return (
        <View style={styles.container}>
            <Pressable hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }} onPress={props?.highToLow}>
                <Text style={styles.txt} >Rate high to Low</Text>
            </Pressable>
            <Pressable hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }} onPress={props?.lowToHigh}>
                <Text style={styles.txt} >Rate low to High</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 8,
        color: Colors.dark.black
    }
})