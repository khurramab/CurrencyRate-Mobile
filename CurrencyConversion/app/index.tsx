import { SingleComponent } from "@/components/main/SingleComponent";
import { message } from "@/constants/strings";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator, StatusBar, RefreshControl, Image, Pressable } from "react-native";
import axios from 'axios';
import { CURRENCY_URL } from "@/constants/url";
import useListStore from "@/store";
import { AppImages } from "@/constants/AppImages";
import { convertCurrenciesToArray, searchCurrencies, showAlert, sortCurrenciesByRateHighToLow, sortCurrenciesByRateLowToHigh } from "@/constants/helper";
import EmptyComponent from "@/components/EmptyComponent";
import { Currency } from "@/types";
import NetInfo from '@react-native-community/netinfo';
import { Colors } from "@/constants/Colors";
import { Dropdown } from "@/components/Dropdown";
import SearchBar from "@/components/SearchBar";

export default function Index() {

  const addOneTimeList = useListStore((state) => state.addAllCurrencyList);
  const list = useListStore((state) => state.getList());
  const [loader, setLoader] = useState<boolean>(false)
  const [data, setData] = useState<Array<Currency>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [search, setOnSearch] = useState<boolean>(false)
  const [searchList, setSearchList] = useState<Array<Currency>>([]);

  useEffect(() => {
    setData(list)
  }, [list])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null;
    
    if (isConnected) {
      fetchData(true);
      interval = setInterval(() => {

        if (isConnected) {
          fetchData(false);
        }
      }, 10000);

    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [isConnected]);

  const fetchData = async (loader: boolean) => {
    setLoader(loader);
    try {
      const response = await axios.get(CURRENCY_URL);
      addListToStore(response?.data);
    } catch (error) {
      showAlert(message.noNetwork, `${error}`)
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  const addListToStore = (data: any) => {
    let convertedArr: any = convertCurrenciesToArray(data)
    addOneTimeList(convertedArr);
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(false);
  };

  const onPressLowestTohigh = () => {
    try {
      setLoader(true)
      let sortedData: any = sortCurrenciesByRateLowToHigh(data)
      addOneTimeList(sortedData);
    } catch (error: any) {

    } finally {
      setLoader(false)
    }
  }

  const onPressHighToLow = () => {
    try {
      setLoader(true)
      let sortedData: any = sortCurrenciesByRateHighToLow(data);
      addOneTimeList(sortedData);
    } catch (error) {

    } finally {
      setLoader(false)
    }
  }

  const resetFilter = () => {
    setShowFilter(!showFilter)
  }

  const onSearch = (txt: string) => {
    try {
      setLoader(true)
      let result = searchCurrencies(txt, data)
      setSearchList(result)
    } catch (error) {
      console.log('error while search', error);
    } finally {
      setLoader(false)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.light.grey}
      />
      <View style={styles.imagesContianer}>

        {data && <View style={styles.advanceSearch}>
          <SearchBar
            onSearch={(searchTxt) => {
              onSearch(searchTxt);
              setOnSearch(true);
            }}
            onPressReset={() => {
              setSearchList([])
              setOnSearch(false)
            }} />
          <Pressable onPress={() => { resetFilter() }} style={styles.filterBack}>
            <Image source={AppImages.filter} style={styles.filterIcon} />
          </Pressable>
        </View>}

        {showFilter && <View style={styles.dropDown}>
          <Dropdown
            highToLow={() => {
              resetFilter()
              onPressHighToLow()
            }}
            lowToHigh={() => {
              resetFilter()
              onPressLowestTohigh()
            }}
          />
        </View>}

      </View>

      {search &&
        <Pressable onPress={() => {
          setOnSearch(false)
          setSearchList([])
        }}
          style={styles.resetBtn}>
          <Text style={styles.resetTxt}>Reset</Text>
        </Pressable>}

      <View style={styles.flatList}>
        {loader ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.loader.loaderColor} />
            <Text>{message?.loadingText}</Text>
          </View>
        ) : (
          <>
            {data && data?.length > 1 ? <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              data={search ? searchList : data}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item, index }) => {
                return (
                  <SingleComponent
                    list={item}
                  />
                )
              }}
            /> :
              <EmptyComponent title={message.noData} description={message.noDataDes} />
            }
          </>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flatList: {
    marginVertical: 10,
    flex: 1,

  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginHorizontal: 4
  },
  highestFilter: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginHorizontal: 4
  },
  lowestFilter: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginHorizontal: 3
  },
  imagesContianer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    marginTop: 10,
    zIndex: 10000
  },
  dropDown: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: Colors.light.white,
    position: 'absolute',
    top: 30,
    right: 10,
    zIndex: 1000,
    borderRadius: 10,
    shadowColor: Colors.dark.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterBack: {
    backgroundColor: Colors.light.white, paddingVertical: 15, marginLeft: 5,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    borderRadius: 8,
    shadowRadius: 1.5,
  },
  advanceSearch: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  resetBtn: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 5
  },
  resetTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.light.icon
  }

})
