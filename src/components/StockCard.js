import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

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
              gap: 8,
            }}>
            <Text style={{color: '#090909', fontSize: 24, fontWeight: 600}}>
              ${item?.price}
            </Text>
            <View
              style={{flexDirection: 'row', alignItems: 'flex-end', gap: 5}}>
              <IonIcon name={'caret-up-sharp'} size={18} color={'#34C759'} />
              <Text style={{color: '#34C759', fontSize: 16, fontWeight: 600}}>
                {item?.change_percent}%
              </Text>
            </View>
          </View>
        </View>
        {showDetails && (
          <Pressable
            style={{width: '10%', marginTop: 10}}
            onPress={() => setShowDetails(false)}>
            <Icon name={'chevron-up'} size={35} color={'black'} />
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
