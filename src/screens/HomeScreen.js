import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetFlatList,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../store/productsSlice';
import StockCard from '../components/StockCard';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

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
  const renderItem = useCallback(
    ({item}) => <StockCard item={item} navigation={navigation} />,
    [],
  );

  //Pagination
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filterProducts?.length / ITEMS_PER_PAGE);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filterProducts.slice(startIndex, endIndex);
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={['60%', '100%']}>
        {showSearch && (
          <View style={styles.inputContainer}>
            <Icon
              name="search"
              size={20}
              color="#999999"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              value={searchText}
              placeholder="Search for stocks"
              onChangeText={text => setSearchText(text)}
              placeholderTextColor={'#999999'}
            />
          </View>
        )}
        {filterProducts && (
          <BottomSheetFlatList
            data={getPaginatedData()}
            keyExtractor={i => i.symbol}
            renderItem={renderItem}
          />
        )}
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
            <IonIcon
              name={'caret-back-sharp'}
              size={25}
              color={currentPage === 1 ? '#D9D9D9' : 'black'}
            />
          </TouchableOpacity>
          <Text style={styles.pageText}>
            {currentPage} ........... {totalPages}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}>
            <IonIcon
              name={'caret-forward-sharp'}
              size={25}
              color={currentPage === totalPages ? '#D9D9D9' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    marginBottom: 20,
  },
  pageText: {
    fontSize: 16,
    color: 'black',
  },
});

export default HomeScreen;
