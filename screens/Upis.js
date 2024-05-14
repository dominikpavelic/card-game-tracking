import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Alert,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ZvanjeGumb from '../components/zvanjeGumb';
import DataContext from '../DataContext';
import { RadioButton } from 'react-native-paper';


const Upis = () => {
    const navigation = useNavigation();


    const [miZvanja, setMiZvanja] = useState(0);
    const [viZvanja, setViZvanja] = useState(0);
    const [miBodovi, setMiBodovi] = useState(0);
    const [viBodovi, setViBodovi] = useState(0);
    const [zvali, setZvali] = useState('');

    const { runde, dodajRundu } = useContext(DataContext);

    const handleMizvanja = (zvanje) => {
        setMiZvanja(miZvanja + Number(zvanje));
    };

    const handleVizvanja = (zvanje) => {
        setViZvanja(viZvanja + Number(zvanje));
    };

    const handleMiBodovi = (bodovi) => {
        if (bodovi === '') {
            setMiBodovi(0);
            setViBodovi(0);
        } else if (Number(bodovi) > 162) {
            return;
        } else {
            setMiBodovi(Number(bodovi));
            setViBodovi(162 - Number(bodovi));
        }
    };

    const handleViBodovi = (bodovi) => {
        if (bodovi === '') {
            setMiBodovi(0);
            setViBodovi(0);
        } else if (Number(bodovi) > 162) {
            return;
        } else {
            setViBodovi(Number(bodovi));
            setMiBodovi(162 - Number(bodovi));
        }
    };

    const provjeriPad = () => {
        if (
            zvali === 'Mi' &&
            miBodovi + miZvanja <= (162 + miZvanja + viZvanja) / 2
        ) {
            console.log('Mi zvali i manje od pola');
            return { miBodovi: 0, viBodovi: 162, miZvanja: 0, viZvanja };
        } else if (
            zvali === 'Vi' &&
            viBodovi + viZvanja <= (162 + miZvanja + viZvanja) / 2
        ) {
            console.log('Vi zvali i manje od pola');
            return { miBodovi: 162, viBodovi: 0, miZvanja, viZvanja: 0 };
        }

        return { miBodovi, viBodovi, miZvanja, viZvanja };
    };

    const handleUpisi = () => {
        const zadnjaRunda = runde[runde.length - 1];
        var id = 0;
        if (zadnjaRunda) {
            id = zadnjaRunda.id + 1;
        }
        if (miBodovi === 0 && viBodovi === 0) {
            Alert.alert('A di su bodovi?');
            return;
        }
        if (zvali === '') {
            Alert.alert('Ko je zvao?');
            return;
        }
        if (miZvanja === 0 && viZvanja === 0) {
            Alert.alert('Nikakva zvanja?!? jadnooooo 💀');
        }

        const {
            miBodovi: miBodoviNovi,
            viBodovi: viBodoviNovi,
            miZvanja: miZvanjaNova,
            viZvanja: viZvanjaNova,
        } = provjeriPad();

        const novaRunda = {
            id: id,
            miBodovi: miBodoviNovi,
            viBodovi: viBodoviNovi,
            miZvanja: miZvanjaNova,
            viZvanja: viZvanjaNova,
            miUkupnoRunda: miBodoviNovi + miZvanjaNova,
            viUkupnoRunda: viBodoviNovi + viZvanjaNova,
            zvali: zvali,
        };
        dodajRundu(novaRunda);

        navigation.navigate('Main');
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'red',
                }}>
                <View
                    style={{
                        backgroundColor: '#e0e0e0',
                        padding: 10,
                        borderRadius: 8,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10,
                    }}>
                    <TextInput
                        value={String(miBodovi)}
                        onChangeText={handleMiBodovi}
                        textAlign="center"
                        keyboardType="numeric"
                        style={{ fontSize: 36, fontWeight: '400' }}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: '#e0e0e0',
                        padding: 10,
                        borderRadius: 8,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10,
                    }}>
                    <TextInput
                        value={String(viBodovi)}
                        onChangeText={handleViBodovi}
                        textAlign="center"
                        keyboardType="numeric"
                        style={{ fontSize: 36, fontWeight: '400' }}
                    />
                </View>
            </View>
            {/*zvanja bodovi container */}
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'orange',
                }}>
                <Text style={{ fontSize: 18 }}>Zvanja: {miZvanja}</Text>
                <Button
                    title="Obriši"
                    onPress={() => {
                        setMiZvanja(0);
                        setViZvanja(0);
                    }}
                />
                <Text style={{ fontSize: 18 }}>Zvanja: {viZvanja}</Text>
            </View>
            {/*zvanja gumbi container */}
            <View
                style={{
                    flex: 8,
                    justifyContent: 'space-evenly',
                    backgroundColor: 'yellow',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                    <ZvanjeGumb title="20" onPress={handleMizvanja} />
                    <ZvanjeGumb title="20" onPress={handleVizvanja} />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                    <ZvanjeGumb title="50" onPress={handleMizvanja} />
                    <ZvanjeGumb title="50" onPress={handleVizvanja} />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                    <ZvanjeGumb title="100" onPress={handleMizvanja} />
                    <ZvanjeGumb title="100" onPress={handleVizvanja} />
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton.Android
                            value="Mi"
                            status={zvali === 'Mi' ? 'checked' : 'unchecked'}
                            onPress={() => setZvali('Mi')}
                        />
                        <Text>Mi zvali</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton.Android
                            value="Vi"
                            status={zvali === 'Vi' ? 'checked' : 'unchecked'}
                            onPress={() => setZvali('Vi')}
                        />
                        <Text>Vi zvali</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Button title="Upiši" onPress={handleUpisi} />
            </View>
        </View>
    );
};

export default Upis;

const styles = StyleSheet.create({});
