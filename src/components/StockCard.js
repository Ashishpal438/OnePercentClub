import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const StockCard = ({item, navigation}) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onLongPress={() => setShowDetails(true)}
        onPress={() =>
          navigation.navigate('stockDetails', {
            item: item,
          })
        }
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: showDetails ? 0 : 1,
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
          <Text style={{color: '#090909', fontSize: 24, fontWeight: 600}}>
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
            <Text style={{color: '#090909', fontSize: 24, fontWeight: 600}}>
              ${item?.price}
            </Text>
            <Text style={{color: '#34C759', fontSize: 16, fontWeight: 600}}>
              {item?.change_percent}%
            </Text>
          </View>
        </View>
        {showDetails && (
          <Pressable
            style={{width: '10%'}}
            onPress={() => setShowDetails(false)}>
            <Text>V</Text>
          </Pressable>
        )}
      </TouchableOpacity>
      {showDetails && (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#EBEBEB',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 24, fontWeight: 600, color: 'black'}}>
            Lorem ipsum dolor
          </Text>
          <Text style={{fontSize: 16, fontWeight: 600, color: 'black'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      )}
    </View>
  );
};

export default StockCard;
