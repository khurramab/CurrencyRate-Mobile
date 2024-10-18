
import moment from 'moment';
import { Alert } from 'react-native';


export function formatDate(date: Date): string {
    return moment(date).format("MMMM D, YYYY");
}



export function sortCurrenciesByRateHighToLow(currencies: any) {
    const currencyArray = Object.entries(currencies).map(([key, value]) => ({
        key,
        ...value,
    }));

    currencyArray.sort((a, b) => {
        const rateA = Number(a.rate);
        const rateB = Number(b.rate);
        return rateB - rateA;
    });

    return currencyArray;
}

export function convertCurrenciesToArray(currencies: any) {
    const currencyArray = Object.entries(currencies).map(([key, value]) => ({
        key,
        ...value,
    }));

    return currencyArray;
}

export function sortCurrenciesByRateLowToHigh(currencies: any) {
    const currencyArray = Object.entries(currencies).map(([key, value]) => ({
        key,
        ...value,
    }));

    currencyArray.sort((a, b) => {
        const rateA = Number(a.rate);
        const rateB = Number(b.rate);
        return rateA - rateB;
    });

    return currencyArray;
}

export const showAlert = (title: string, message: string) => {
    Alert.alert(
        title,
        message,
        [{ text: 'OK' }]
    );
}

export const searchCurrencies = (searchTerm: string, array : any) => {
    const lowercasedTerm = searchTerm.toLowerCase();

    return array.filter((currency: any) =>
        currency.code.toLowerCase().includes(lowercasedTerm) ||
        currency.name.toLowerCase().includes(lowercasedTerm)
    );
};