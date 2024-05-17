import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetail = ({ route }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.info}>Cena: {product.price}</Text>
            <Text style={styles.info}>Sklep: {product.store}</Text>
            <Text style={styles.info}>Kupione: {product.purchased ? 'Tak' : 'Nie'}</Text>
            <Text style={styles.info}>Opis: {product.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
});

export default ProductDetail;
