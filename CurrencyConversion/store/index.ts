import { Currency } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ListStoreState {
    currencyList: any;                      
    addToCurrentList: (item: Currency) => void;    
    addAllCurrencyList: (item: Currency) => void;  
    getList: () => Currency[];              
}

const useListStore = create<ListStoreState>()(
    persist(
        (set, get) => ({
            currencyList: {},

            addToCurrentList: (item: Currency) => {
                set((state) => ({
                    currencyList: [...state.currencyList, item],
                }));
            },

            addAllCurrencyList: (item: any) => {
                set({
                    currencyList: item,
                });
            },

            getList: () => get().currencyList,
        }),
        {
            name: 'currency-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useListStore;
