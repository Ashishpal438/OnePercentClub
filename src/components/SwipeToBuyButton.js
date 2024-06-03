import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Alert} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const BUTTON_WIDTH = width - 40;
const SWIPEABLE_DIMENSIONS = 40;
const SWIPE_THRESHOLD = BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - 10;

const SwipeToBuyButton = () => {
  const translateX = useSharedValue(0);
  const [confirmed, setConfirmed] = useState(false);

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
          <Text style={styles.text}>Swipe to Buy</Text>
          <View style={styles.button}>
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.swipeable, animatedStyle]}>
                <Text style={styles.swipeText}>{'>'}</Text>
              </Animated.View>
            </GestureDetector>
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
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
    backgroundColor: '#FFF8DC',
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
    fontSize: 18,
    color: '#fff',
  },
  confirmedIcon: {
    width: SWIPEABLE_DIMENSIONS,
    height: SWIPEABLE_DIMENSIONS,
    backgroundColor: '#fff',
    borderRadius: SWIPEABLE_DIMENSIONS / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  confirmedIconText: {
    fontSize: 18,
    color: '#4CAF50',
  },
});

export default SwipeToBuyButton;
