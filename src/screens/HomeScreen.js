import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../store/productsSlice';
import StockCard from '../components/StockCard';
import {TextInput} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  // const [filterProducts, setFilterProducts] = useState([]);

  // ref
  const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    if (index == 0) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, []);

  const products = useSelector(state => state.products.products);
  const status = useSelector(state => state.products.status);
  const user = useSelector(state => state.auth.user);

  // filter the data according to the search text;
  const filterProducts = products?.filter(item =>
    item?.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // render
  const renderItem = useCallback(item => <StockCard item={item} />, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={['60%', '100%']}>
        <BottomSheetView style={styles.contentContainer}>
          {showSearch && (
            <TextInput
              style={styles.input}
              value={searchText}
              placeholder="Search for stocks"
              onChangeText={text => setSearchText(text)}
            />
          )}
          {products && (
            <FlatList
              data={filterProducts}
              renderItem={({item}) => (
                <StockCard item={item} navigation={navigation} />
              )}
              keyExtractor={item => item.symbol}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});

export default HomeScreen;
