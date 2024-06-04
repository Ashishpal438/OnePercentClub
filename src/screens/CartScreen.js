import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeItem, updateQuantity, clearCart} from '../store/cartSlice';
import {FlatList} from 'react-native-gesture-handler';
import SwipeToBuyButton from '../components/SwipeToBuyButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleRemoveFromCart = id => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({id, quantity}));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <>
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 24, fontWeight: 600, color: 'black'}}>
            Open Orders
          </Text>
        </View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item?.symbol}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EBEBEB',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    width: '20%',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../../assets/apple-logo.png')} />
                </View>
                <View
                  style={{
                    width: '70%',
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#090909',
                      fontSize: 24,
                      fontWeight: 600,
                    }}>
                    {item?.symbol}
                  </Text>
                  <Text
                    style={{
                      color: '#999999',
                      fontSize: 16,
                      fontWeight: 500,
                      paddingVertical: 8,
                    }}>
                    {item?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      gap: 10,
                    }}>
                    <Text
                      style={{
                        color: '#090909',
                        fontSize: 24,
                        fontWeight: 600,
                      }}>
                      ${item?.price}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        gap: 5,
                      }}>
                      <IonIcon
                        name={'caret-up-sharp'}
                        size={18}
                        color={'#34C759'}
                      />
                      <Text
                        style={{
                          color: '#34C759',
                          fontSize: 16,
                          fontWeight: 600,
                        }}>
                        {item?.change_percent}%
                      </Text>
                    </View>
                  </View>
                </View>

                <Pressable
                  style={{width: '10%'}}
                  onPress={() => handleRemoveFromCart(item?.symbol)}>
                  <Icon name={'delete-outline'} size={25} color={'black'} />
                </Pressable>
              </View>
            );
          }}
        />
      </View>
      <View style={{paddingBottom: 20, backgroundColor: 'white'}}>
        <SwipeToBuyButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  orderContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  ticker: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  company: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 18,
    color: '#34C759',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
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

export default CartScreen;
