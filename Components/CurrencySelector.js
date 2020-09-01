import React, {useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Picker,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    FlatList,
    Modal,
    TouchableOpacity,
    Image,
} from 'react-native';

import {currency_photos} from '../currency';
import {currency_symbols} from '../currency';

import {colors} from '../Colors';

function CurrencyList(rates, curr, setCurr, modal, setModal, other) {
    const sortedArray = Object.keys(rates.rates)
        .sort()
        .filter(function (e) {
            return e !== other;
        });

    const renderItem = ({item}) => {
        const handleClick = () => {
            setCurr(item);
            setModal(!modal);

            // console.log(item, ' Clicked');
        };

        return (
            <TouchableOpacity
                style={modalItemStyles.container}
                onPress={handleClick}>
                <Image
                    style={modalItemStyles.image}
                    source={currency_photos[item]}
                    resizeMode={'contain'}
                />
                <View style={modalItemStyles.textContainer}>
                    <Text
                        style={[
                            item === curr
                                ? modalItemStyles.selectedText
                                : modalItemStyles.text,
                        ]}>
                        {item}
                    </Text>
                    <Text
                        style={[
                            item === curr
                                ? modalItemStyles.selectedSymbolText
                                : modalItemStyles.symbolText,
                        ]}>
                        {currency_symbols[item]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={modalStyles.FlatListContainer}>
            <FlatList
                showsVerticalScrollIndicator={false}
                //decelerationRate={'fast'}
                // data={Object.keys(rates.rates)}
                data={sortedArray}
                keyExtractor={(item) => item}
                // extraData={selectedId}
                renderItem={renderItem}
            />
        </View>
    );
}

export default function CurrencySelector(
    rates,
    curr,
    setCurr,
    modal,
    setModal,
    other,
) {
    function handleCLick() {
        setModal(!modal);
    }

    return (
        <TouchableOpacity
            style={baseSelectorStyles.container}
            onPress={handleCLick}>
            <Image
                style={baseSelectorStyles.image}
                source={currency_photos[curr]}
            />
            {/* <Text>{currency_photos[curr]}</Text> */}
            {/* <Text>{path2Photos.cWoncat(currency_photos[curr])}</Text> */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modal}
                onRequestClose={handleCLick}>
                <View style={modalStyles.container}>
                    <View style={modalStyles.content}>
                        {CurrencyList(
                            rates,
                            curr,
                            setCurr,
                            modal,
                            setModal,
                            other,
                        )}
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
}
const modalStyles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    content: {
        height: '90%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    FlatListContainer: {
        width: '100%',
        height: '100%',
        flex: 1,

        padding: 0,

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    item: {
        borderWidth: 0,
        borderColor: '#153',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: 60,
        width: '100%',
        marginTop: 10,
    },
    itemSelected: {
        backgroundColor: '#123',
    },
});

const modalItemStyles = StyleSheet.create({
    image: {
        height: 60,
        width: 60,
        margin: 20,
    },
    container: {
        borderWidth: 0,
        borderColor: '#153',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 0,
        height: 80,
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        // backgroundColor: colors[3],
    },
    textContainer: {
        flex: 1,
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    text: {
        fontSize: 35,
        color: colors[4],
    },
    selectedText: {
        fontSize: 35,
        color: colors[0],
    },
    symbolText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors[4],
    },
    selectedSymbolText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors[0],
    },
});

const baseSelectorStyles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },

    container: {
        // borderRadius: 100,

        borderWidth: 0,
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
