import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Picker,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    Modal,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {colors} from './Colors';
import MyKeyboard from './Components/MyKeyboard';
import CurrencySelector from './Components/CurrencySelector.js';
import {currency_symbols} from './currency';

function MyHeader() {
    return (
        <View style={headerStyles.container}>
            <Image
                source={require('./res/logoText.png')}
                style={headerStyles.image}
                resizeMode={'contain'}
            />
            {/* <Text style={headerStyles.text}>€$</Text> */}
        </View>
    );
}

function calculateOutput(input, rates, baseCurrency, toCurrency) {
    const output =
        (input / rates.rates[baseCurrency]) * rates.rates[toCurrency];
    if (input !== '') {
        return output.toFixed(2);
    } else {
        return '';
    }
}

export default function Main() {
    const [rates, setRates] = useState(null);
    const [loadingRates, setLoadingRates] = useState(true);

    const [baseCurrency, setBaseCurrency] = useState('EUR');
    const [baseModal, setBaseModal] = useState(false);

    const [toCurrency, setToCurrency] = useState('USD');
    const [toModal, setToModal] = useState(false);

    const [input, setInput] = useState('1');

    const [noInternet, setNoInternet] = useState(false);

    async function storeData(value, key) {
        const jsonValue = JSON.stringify(value);
        try {
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
            console.log('Error saving data to device');
            console.log(e);
        }
    }

    async function checkSavedData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                setRates(JSON.parse(value));
                console.log('There is data saved');
            } else {
                setNoInternet(true);
                console.log('There is no data saved');
            }
        } catch (e) {
            console.log('Error reading data');
        }
    }

    function fetchData() {
        setNoInternet(false);
        setLoadingRates(true);
        // var myHeaders = new Headers();
        // myHeaders.append(
        //     'Cookie',
        //     '__cfduid=dcd035e1e99b46cea88611426946dc62b1598377507',
        // );

        var requestOptions = {
            method: 'GET',
            // headers: myHeaders,
            redirect: 'follow',
        };

        fetch('https://api.ratesapi.io/api/latest', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // setLoadingRates(false);

                result.rates.EUR = 1;
                setRates(result);
                storeData(result, 'rates');
                console.log('Data fetched and saved to device');

                // console.log(Object.keys(rates.rates));

                setLoadingRates(false);
            })
            .catch((error) => {
                checkSavedData('rates');
                console.log('error fetching rates', error);
            });
    }

    function changeBetween() {
        const aux = baseCurrency;
        setBaseCurrency(toCurrency);
        setToCurrency(aux);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={mainContainerStyles.container}>
            <MyHeader />
            {noInternet ? (
                <View style={contentStyles.container}>
                    <Text style={loadingStyles.text}>
                        No Internet Connection{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={fetchData}
                        style={loadingStyles.tryAgainButton}>
                        <Text style={loadingStyles.tryAgainText}>
                            Try Again
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : loadingRates ? (
                <View style={contentStyles.container}>
                    <Text style={loadingStyles.text}>...</Text>
                </View>
            ) : (
                <View style={contentStyles.container}>
                    <View style={contentStyles.middleContainer}>
                        <View style={contentStyles.selectorContainer}>
                            {CurrencySelector(
                                rates,
                                baseCurrency,
                                setBaseCurrency,
                                baseModal,
                                setBaseModal,
                                "",
                            )}
                            <TouchableOpacity
                                style={contentStyles.changeContainer}
                                onPress={changeBetween}>
                                <Image
                                    style={contentStyles.change}
                                    source={require('./res/change.png')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                            {CurrencySelector(
                                rates,
                                toCurrency,
                                setToCurrency,
                                toModal,
                                setToModal,
                                baseCurrency,
                            )}
                        </View>
                        <View style={contentStyles.outputContainer}>
                            <View style={contentStyles.singleOutputContainer}>
                                <Text style={outputStyles.text}>
                                    {input} {currency_symbols[baseCurrency]}
                                </Text>
                            </View>
                            <View style={contentStyles.singleOutputContainer}>
                                <Text style={outputStyles.text}>
                                    {calculateOutput(
                                        input,
                                        rates,
                                        baseCurrency,
                                        toCurrency,
                                    )}{' '}
                                    {currency_symbols[toCurrency]}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <MyKeyboard
                        // customKeyboardType="price"
                        input={input}
                        setInput={setInput}
                    />
                </View>
            )}
        </View>
    );
}

const mainContainerStyles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#000',
        // justifyContent: 'center',
    },
});

const headerStyles = StyleSheet.create({
    container: {
        height: '10%',
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 30,

        color: '#fff',
    },
    image: {
        height: '60%',
        // width: '20%',
    },
});

const contentStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: '90%',
        width: '100%',
        padding: 0,
        backgroundColor: colors[4],
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    topContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 60,
        width: '100%',
        borderWidth: 1,
    },
    middleContainer: {
        elevation: 30,
        marginTop: 10,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        height: 150,
        width: '90%',
        borderWidth: 0,
    },
    bottomContainer: {
        flexWrap: 'wrap',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        width: '100%',
        borderWidth: 0,
        textAlign: 'center',
    },

    selectorContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%',
        height: '70%',
        borderWidth: 0,
    },
    outputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        flexDirection: 'row',
        width: '100%',
        height: '30%',
    },
    singleOutputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        flexDirection: 'row',
        width: '50%',
        height: '100%',
    },
    change: {
        width: '100%',
        height: '100%',
        // height: '20%',
    },
    changeContainer: {
        borderWidth: 0,
        width: '7%',
        height: '50%',
        // height: '20%',
    },
});

const inputStyles = StyleSheet.create({
    container: {
        padding: 3,
        paddingLeft: 30,
        height: '100%',
        minWidth: '80%',
        backgroundColor: '#DCDCDC',
        borderRadius: 10,
        borderWidth: 0,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
    },
});

const outputStyles = StyleSheet.create({
    container: {
        borderWidth: 0,
        width: '100%',
    },

    text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,
        textAlign: 'center',
        color: colors[4],
        fontWeight: 'bold',
    },
});

const loadingStyles = StyleSheet.create({
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,
        textAlign: 'center',
        color: colors[1],
    },

    tryAgainText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,
        textAlign: 'center',
        color: colors[4],
    },

    tryAgainButton: {
        height: 50,
        width: 100,
        borderRadius: 100,
        backgroundColor: colors[1],
        elevation: 20,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
