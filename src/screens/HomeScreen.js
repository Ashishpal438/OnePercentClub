import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import SwipeToBuyButton from '../components/SwipeToBuyButton';

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  console.log('showSearch', showSearch);
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
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={['60%', '100%']}>
        <BottomSheetView style={styles.contentContainer}>
          {showSearch && <Text>Awesome 🎉</Text>}
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
});

export default HomeScreen;
