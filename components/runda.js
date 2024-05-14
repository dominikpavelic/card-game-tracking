import { View, Text, StyleSheet, Pressable } from 'react-native';

function Runda(props) {
    return (
        <Pressable key={props.id}>
            <View style={styles.rundaContainer}>
                <Text style={styles.rundaText}>{props.miBodoviRunda}</Text>
                <Text style={styles.rundaText}>{props.viBodoviRunda}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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
});

export default Runda;
