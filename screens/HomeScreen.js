import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import Runda from '../components/runda';
import DataContext from '../DataContext';

const HomeScreen = () => {
    const navigation = useNavigation();


    const [miUkupno, setMiUkupno] = useState(0);
    const [viUkupno, setViUkupno] = useState(0);
    const [gotovo, setGotovo] = useState(false);
    const { runde, dodajRundu, setRunde } = useContext(DataContext);



    function zapocniUpis() {
        navigation.navigate('Upis');
        console.log('Započni upis');
    }

    const updateUkupno = () => {
        const miUkupnoNovo = runde.reduce((acc, runda) => {
            return acc + runda.miUkupnoRunda;
        }, 0);
        const viUkupnoNovo = runde.reduce((acc, runda) => {
            return acc + runda.viUkupnoRunda;
        }, 0);
        setMiUkupno(miUkupnoNovo);
        setViUkupno(viUkupnoNovo);


        if (miUkupnoNovo >= 1001 || viUkupnoNovo >= 1001) {
            Alert.alert('Pobjednik je ' + (miUkupnoNovo >= 1001 ? 'MI' : 'VI'));
            setGotovo(true);
        }
    };

    const ocisti = () => {
        setRunde([]);
        setMiUkupno(0);
        setViUkupno(0);
        setGotovo(false);
    };

    useEffect(() => {
        updateUkupno();
    }, [runde]);

    return (
        <View style={styles.appContainer}>
            <View style={styles.miViContainer}>
                <Text style={styles.miViText}>MI</Text>
                <Text style={styles.miViText}>VI</Text>
            </View>
            <View style={styles.rezultatContainer}>
                <Text style={styles.miViText}>{miUkupno}</Text>
                <Text style={styles.miViText}>{viUkupno}</Text>
            </View>

            <View style={styles.rundeContainer}>
                <FlatList
                    data={runde}
                    renderItem={(itemData) => {
                        return (
                            <Runda
                                id={itemData.item.id}
                                miBodoviRunda={itemData.item.miUkupnoRunda}
                                viBodoviRunda={itemData.item.viUkupnoRunda}
                            />
                        );
                    }}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                />
            </View>
            <View style={styles.gumbContainer}>
                <Pressable onPress={ocisti} style={{ marginHorizontal: 30 }}>
                    <FontAwesome name="trash" size={50} color="#b180f0" />
                </Pressable>
                {!gotovo ? (
                    <Pressable
                        onPress={zapocniUpis}
                        style={{ marginHorizontal: 30 }}>
                        <AntDesign
                            name="pluscircle"
                            size={50}
                            color="#b180f0"
                        />
                    </Pressable>
                ) : (
                    <View></View>
                )}
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#c8b6ff',
        paddingLeft: 10,
        paddingRight: 10,
    },
    miViContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        padding: 8,
    },
    miViText: {
        fontSize: 40,
        fontWeight: '800',
        color: 'white',
    },
    rundeContainer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    rundaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alighItems: 'center',
        margin: 8,
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    rundaText: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center',
    },

    rezultatContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    gumbContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
        marginBottom: 50,
    },
});
