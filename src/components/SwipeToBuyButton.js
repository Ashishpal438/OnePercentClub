import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Alert} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import notifee from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../store/cartSlice';

const {width} = Dimensions.get('window');
const BUTTON_WIDTH = width - 40;
const SWIPEABLE_DIMENSIONS = 60;
const SWIPE_THRESHOLD = BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - 10;

const SwipeToBuyButton = () => {
  const translateX = useSharedValue(0);
  const [confirmed, setConfirmed] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const onDisplayNotification = async stock => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Congratulations!',
      body: `Your Purchase order for ${stock} is completed`,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handlePurchaseStock = async () => {
    cartItems?.map(item => {
      onDisplayNotification(item?.name);
      dispatch(clearCart());
    });
  };

  useEffect(() => {
    confirmed && handlePurchaseStock();
  }, [confirmed]);

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = Math.min(
        Math.max(0, event.translationX),
        SWIPE_THRESHOLD,
      );
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD - 20) {
        translateX.value = withTiming(
          SWIPE_THRESHOLD,
          {duration: 200, easing: Easing.linear},
          () => {
            runOnJS(setConfirmed)(true);
          },
        );
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <View style={styles.container}>
      {!confirmed ? (
        <>
          <View style={styles.button}>
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.swipeable, animatedStyle]}>
                <Text style={styles.swipeText}>{'>'}</Text>
              </Animated.View>
            </GestureDetector>
            <Text style={styles.text}>Swipe to Buy</Text>
          </View>
        </>
      ) : (
        <View style={styles.confirmedButton}>
          <Text style={styles.confirmedText}>Confirmed!</Text>
          <View style={styles.confirmedIcon}>
            <Text style={styles.confirmedIconText}>✔</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  button: {
    width: BUTTON_WIDTH,
    height: SWIPEABLE_DIMENSIONS + 20,
    backgroundColor: '#FFF8DC',
    borderRadius: (SWIPEABLE_DIMENSIONS + 20) / 2,
    justifyContent: 'center',
    padding: 5,
  },
  swipeable: {
    width: SWIPEABLE_DIMENSIONS,
    height: SWIPEABLE_DIMENSIONS,
    backgroundColor: '#FFF',
    margin: 10,
    borderRadius: SWIPEABLE_DIMENSIONS / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  swipeText: {
    fontSize: 24,
    color: '#000',
  },
  confirmedButton: {
    width: BUTTON_WIDTH,
    height: SWIPEABLE_DIMENSIONS + 20,
    backgroundColor: '#4CAF50',
    borderRadius: (SWIPEABLE_DIMENSIONS + 20) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  confirmedText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  confirmedIcon: {
    width: SWIPEABLE_DIMENSIONS,
    height: SWIPEABLE_DIMENSIONS,
    backgroundColor: '#fff',
    borderRadius: SWIPEABLE_DIMENSIONS / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    position: 'absolute',
    alignItems: 'center',
    right: 10,
  },
  confirmedIconText: {
    fontSize: 18,
    color: '#4CAF50',
  },
});

export default SwipeToBuyButton;
