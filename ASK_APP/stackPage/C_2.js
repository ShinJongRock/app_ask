import { Table, Row, Rows } from 'react-native-table-component';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    Image,
    Style,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
const C_2 = () => {
    const header = ['heading 1', 'heading 2', 'heading 3']
    const data = [
        ['gfg1', 'gfg2', 'gfg3'],
        ['gfg4', 'gfg5', 'gfg6'],
        ['gfg7', 'gfg8', 'gfg9']
  
    ]

    return (
        <View style={{ marginTop: 200 }}>
            <Text style={{ fontSize: 18 }}>
                GeeksforGeeks React Native Table</Text>
            <Table borderStyle={{ borderWidth: 2, 
                borderColor: '#c8e1ff' }}>
                <Row data={header} />
                <Rows data={data} />
            </Table>
        </View>
    );
};

export default C_2;