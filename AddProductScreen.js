import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddProductScreen = ({ route }) => {
    const [newProduct, setNewProduct] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newStore, setNewStore] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const { addProduct } = route.params;
    const navigation = useNavigation();

    const handleAddProduct = () => {
        if (newProduct !== '') {
            addProduct({ name: newProduct, price: newPrice, store: newStore, description: newDescription, purchased: false });
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={newProduct}
                onChangeText={setNewProduct}
                placeholder="Nazwa Produktu"
            />
            <TextInput
                style={styles.input}
                value={newPrice}
                onChangeText={setNewPrice}
                placeholder="Cena"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={newStore}
                onChangeText={setNewStore}
                placeholder="Sklep"
            />
            <TextInput
                style={styles.input}
                value={newDescription}
                onChangeText={setNewDescription}
                placeholder="Opis"
            />
            <Button title="Dodaj Produkt" onPress={handleAddProduct} color={'#2f2f2f'} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
});

export default AddProductScreen;
