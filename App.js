import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import Upis from './screens/Upis';
import Header from './components/header';

import { DataProvider } from './DataContext';

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <DataProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Main"
                        component={HomeScreen}
                        options={{
                            headerTitle: () => <Header />,
                            headerStyle: {
                                backgroundColor: '#c8b6ff',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Upis"
                        component={Upis}
                        options={{
                            headerTitle: () => <Header />,
                            headerStyle: {
                                backgroundColor: '#c8b6ff',
                            },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DataProvider>
    );
};

const styles = StyleSheet.create({});

export default App;
