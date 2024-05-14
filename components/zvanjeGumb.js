import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const ZvanjeGumb = (props) => {

    function handleZvanje(){
        props.onPress(props.title);
    }
    return (
        <View style={{ backgroundColor: '#e0e0e0', padding:10 }}>
            <Pressable onPress={handleZvanje}>
                <Text style={{fontSize:24, fontWeight:'600'}}>{props.title}</Text>
            </Pressable>
        </View>
    );
};

export default ZvanjeGumb;

const styles = StyleSheet.create({});
