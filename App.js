/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Main from './Main';
function App() {
    return (
        <>
            <StatusBar backgroundColor={'#000'} />
            <SafeAreaView>
                <Main />
            </SafeAreaView>
        </>
    );
}

export default App;
