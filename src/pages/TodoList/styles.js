import {StyleSheet}     from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 30
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    listItem: {
        justifyContent: 'space-between'
    },

    checkTextBox: {
        flexDirection: 'row'
    },
    
    checkBox: {
        marginRight: 10
    },

    itemText: {
        flex: 0.7,
        marginLeft: 10,
        marginRight: 10
    },

    label: {
        margin: 10
    }

});