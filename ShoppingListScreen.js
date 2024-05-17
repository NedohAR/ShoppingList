import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ShoppingListScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [filterByPrice, setFilterByPrice] = useState('');
    const [filterByStore, setFilterByStore] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const storedProducts = await AsyncStorage.getItem('shoppingList');
                if (storedProducts!== null) {
                    setProducts(JSON.parse(storedProducts));
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        const saveProducts = async () => {
            try {
                await AsyncStorage.setItem('shoppingList', JSON.stringify(products));
            } catch (error) {
                console.error("Error:", error);
            }
        };
        saveProducts();
    }, [products]);


    const removeProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const togglePurchased = (index) => {
        const updatedProducts = [...products];
        const item = updatedProducts.splice(index, 1)[0];
        item.purchased = !item.purchased;
        if (item.purchased) {
            updatedProducts.push(item);
        } else {
            updatedProducts.unshift(item);
        }
        setProducts(updatedProducts);
    };

    const filteredProducts = products.filter((item) => {
        if (filterByPrice && item.price !== filterByPrice) {
            return false;
        }
        return !(filterByStore && item.store.toLowerCase().indexOf(filterByStore.toLowerCase()) === -1);
    });

    const addProduct = (product) => {
        setProducts([product, ...products]);
    };

    const navigateToProductDetail = (product) => {
        navigation.navigate('ProductDetail', { product });
    };


    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => togglePurchased(index)}>
            <View style={styles.item}>
                <Text style={item.purchased ? styles.itemPurchased : styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemStore}>{item.store}</Text>
                <Button title={item.purchased ? "Nie kupione" : "Kupione"} color={'green'} onPress={() => togglePurchased(index)} />
                <Button title="Usuń" color={'red'} onPress={() => removeProduct(index)} />
                <Button title="Więcej" onPress={() => navigateToProductDetail(item)} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <TextInput
                    style={styles.filterInput}
                    value={filterByPrice}
                    onChangeText={setFilterByPrice}
                    placeholder="Filtruj po cenie"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.filterInput}
                    value={filterByStore}
                    onChangeText={setFilterByStore}
                    placeholder="Filtruj po sklepie"
                />
            </View>
            <SectionList
                sections={[{ title: 'Lista Zakupów', data: filteredProducts }]}
                keyExtractor={(item, index) => item.name + index}
                renderItem={renderItem}
            />
            <View style={styles.addProductButton}>
                <Button
                    title="Dodaj Produkt"
                    onPress={() => navigation.navigate('AddProduct', { addProduct })}
                    color={'#2f2f2f'}
                />
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    filterInput: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        fontSize: 16,
        flex: 1,
    },
    itemPrice: {
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
    },
    itemStore: {
        fontSize: 16,
        marginRight: 10,
    },
    itemPurchased: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: '#888',
        flex: 1,
    },
    addProductButton: {
        marginBottom: 50,
    },
});

export default ShoppingListScreen;