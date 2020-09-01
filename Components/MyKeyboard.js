import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../Colors';

export default function MyKeyboard(props) {
    const onPress1 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('1'));
        }
    };

    const onPress2 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('2'));
        }
    };
    const onPress3 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('3'));
        }
    };

    const onPress4 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('4'));
        }
    };

    const onPress5 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('5'));
        }
    };

    const onPress6 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('6'));
        }
    };

    const onPress7 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('7'));
        }
    };

    const onPress8 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('8'));
        }
    };

    const onPress9 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('9'));
        }
    };

    const onPressBackSpace = () => {
        if (props.input.length > 0) {
            props.setInput(props.input.slice(0, -1));
        }
    };

    const onPress0 = () => {
        if (props.input.length < 10) {
            props.setInput(props.input.concat('0'));
        }
    };

    const onPressDot = () => {
        if (props.input.length < 9 && props.input.length > 0) {
            if (!props.input.includes('.')) {
                props.setInput(props.input.concat('.'));
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress1}>
                        <Text style={styles.buttonLabel}>1</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress2}>
                        <Text style={styles.buttonLabel}>2</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress3}>
                        <Text style={styles.buttonLabel}>3</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress4}>
                        <Text style={styles.buttonLabel}>4</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress5}>
                        <Text style={styles.buttonLabel}>5</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress6}>
                        <Text style={styles.buttonLabel}>6</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress7}>
                        <Text style={styles.buttonLabel}>7</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress8}>
                        <Text style={styles.buttonLabel}>8</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress9}>
                        <Text style={styles.buttonLabel}>9</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPressBackSpace}>
                        <Text style={styles.buttonLabel}>&larr;</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress0}>
                        <Text style={styles.buttonLabel}>0</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPressDot}>
                        <Text style={styles.buttonLabel}>.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',

        alignSelf: 'flex-end',
        borderWidth: 0,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderColor: 'grey',
        width: 270,
    },
    buttonLabel: {
        color: '#fff',
        borderWidth: 0,
        borderColor: '#d6d7da',
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 13,
        paddingBottom: 13,
        fontSize: 40,
        fontWeight: 'normal',
    },
    button: {
        width: '33.333333333%',
    },
});
