import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {addItem} from '../store/cartSlice';
import IonIcon from 'react-native-vector-icons/Ionicons';

const StockDetailsScreen = ({navigation, route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = product => {
    dispatch(addItem(product));
    navigation.navigate('cartScreen');
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/apple-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.ticker}>{item?.symbol}</Text>
        <Text style={styles.company}>{item?.name}</Text>
        <Text style={styles.price}>${item?.price}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 5,
            marginBottom: 20,
          }}>
          <IonIcon name={'caret-up-sharp'} size={25} color={'#34C759'} />
          <Text style={styles.priceChange}>{item?.change_percent}%</Text>
        </View>
        <Text style={styles.title}>Lorem ipsum dolor</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Text style={styles.title}>Lorem ipsum dolor</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Add to order</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  ticker: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  company: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  priceChange: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34C759',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#ECD996',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default StockDetailsScreen;
