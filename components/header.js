import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const Header = () => {
    return (
        <Image
            source={require('../assets/zelje.png')}
            style={{ width: 40, height: 45 }}
        />
    );
};

export default Header;
