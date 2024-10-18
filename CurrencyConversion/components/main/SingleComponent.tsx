import { Colors } from "@/constants/Colors";
import { formatDate } from "@/constants/helper";
import { StyleSheet, View, Text, Image } from "react-native";
import { DynamicFlag } from "@/constants/Flags";

interface Props {
    list?: any;
    onPressItem?: () => {};
}


export const SingleComponent = (props: Props) => {

    const getFirstTwoCharacters = (str) => {
        return `${str.slice(0, 2)}`;
    };

    const checkCountryFlag = (key: string) => {
        let result = getFirstTwoCharacters(key)
        return result;
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <DynamicFlag type={checkCountryFlag(props?.list?.key)} />

                <View style={styles.flagRow}>
                    <View>
                        <View style={styles.nameContaineer}>
                            <Text style={styles.nameStyle}>{props?.list?.name}</Text>
                            <Text style={styles.inverseRate}> ({props?.list?.code})</Text>
                        </View>

                        <View style={styles.conversionContainer}>
                            <Text style={styles.conversionTxt}>Conversion Rate</Text>
                            <Text style={styles.inverseRate}>{props?.list?.rate}</Text>
                        </View>
                    </View>

                </View>


                <View style={styles.dateContaioner}>
                    <Text style={styles.timeDate}>{formatDate(props?.list?.date)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6,
        paddingHorizontal: 10
    },
    card: {
        borderRadius: 10,
        padding: 12,
        backgroundColor: Colors.light.white,
        shadowColor: Colors.dark.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row'
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flagRow: {
        flexDirection: 'row',
        flex: 1,
        marginVertical: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        marginVertical: 2,
        alignItems: 'center'
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.dark.black
    },
    nameStyle: {
        fontSize: 14,
        fontWeight: '900',
        color: Colors.dark.black,
    },
    numericCode: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.dark.grey
    },
    code: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.dark.grey
    },
    inverseRate: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.dark.grey
    },
    conversionTxt: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.dark.black,
        marginRight: 10
    },
    timeDate: {
        fontSize: 10,
        fontWeight: '500',
        color: Colors.dark.grey,
    },
    flag: {
        width: 64,
        height: 64,
        marginBottom: 10,
        borderWidth: 1,
    },
    conversionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContaineer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateContaioner: {

    }
})