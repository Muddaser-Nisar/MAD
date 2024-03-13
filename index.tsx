import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  LongPressGestureHandler,
  PanGestureHandler,
  State,
  Swipeable,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../utils/constants/colors';
import {fonts} from '../../utils/constants/fonts';
const App = () => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const boxSize = 150;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const fligPosition = useSharedValue(0);
  const scalePoint = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const handlePanGesture = ({nativeEvent}) => {
    const {translationX, translationY} = nativeEvent;

    // Calculate the new position
    const newPosition = {
      x: position.x + translationX,
      y: position.y + translationY,
    };

    // Ensure the component stays within the visible area
    if (
      newPosition.x >= 0 &&
      newPosition.x + boxSize <= screenWidth &&
      newPosition.y >= 0 &&
      newPosition.y + boxSize <= screenHeight
    ) {
      setPosition(newPosition);
    }
  };

  const flingGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(e => {
      fligPosition.value = withTiming(fligPosition.value + e.x, {
        duration: 100,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: fligPosition.value}],
  }));
  const pinchHandler = Gesture.Pinch()
    .onUpdate(e => {
      scalePoint.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scalePoint.value;
    });

  const animatedStylePinch = useAnimatedStyle(() => ({
    transform: [{scale: scalePoint.value}],
  }));
  return (
    <View style={styles.container}>
      <GestureHandlerRootView
        style={{
          flex: 1,
          width: '100%',
        }}>
        {/* we can assign an area of PAN responder in horizontal and vertical manner */}
        <PanGestureHandler
          onGestureEvent={handlePanGesture}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.END) {
              // Perform any action on PanEnd if needed
            }
          }}>
          <View
            style={[
              styles.box,
              {transform: [{translateX: position.x}, {translateY: position.y}]},
            ]}>
            <Text style={styles.textColor}>Pan Me</Text>
          </View>
        </PanGestureHandler>
        {/* It is called on a long press respective to time duration or distance props */}
        <LongPressGestureHandler
          minDurationMs={1000}
          onGestureEvent={() => console.log('Now I have been clicked')}>
          <View style={styles.box}>
            <Text style={styles.textColor}>Long Press</Text>
          </View>
        </LongPressGestureHandler>
        {/* It swips the content to left/right */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Swipeable
            renderLeftActions={() => (
              <View style={styles.leftAction}>
                <Text style={styles.textColor}>Swipe Me Left</Text>
              </View>
            )}
            renderRightActions={() => (
              <View style={styles.rightAction}>
                <Text style={styles.textColor}>Swipe Me Right</Text>
              </View>
            )}>
            <View style={styles.swipeableContent}>
              <Text style={styles.textColor}>Swipe Me</Text>
            </View>
          </Swipeable>
        </View>
        {/* use to detect quick flip or swip */}
        <View style={{width: '100%'}}>
          <GestureDetector gesture={flingGesture}>
            <Animated.Image
              source={{uri: 'https://image.pngaaa.com/46/2182046-middle.png'}}
              style={[styles.fligBox, animatedStyle]}
              width={100}
              height={50}
            />
          </GestureDetector>
        </View>
        {/* //it recognizes the pinch, can use for zooming */}
        <View style={{borderWidth: 1}}>
          <GestureDetector gesture={pinchHandler}>
            <Animated.Image
              source={{
                uri: 'https://images.unsplash.com/photo-1670184900611-434255d918ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80',
              }}
              style={[styles.pinchSquare, animatedStylePinch]}
            />
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: colors.orange,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    fontFamily: fonts['Inter-Bold'],
    color: colors.white,
    alignSelf: 'center',
  },
  swipeableContent: {
    height: 100,
    width: 200,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leftAction: {
    height: 100,
    width: 200,
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  rightAction: {
    height: 100,
    width: 200,
    flex: 1,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  square: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  fligBox: {
    height: 100,
    width: 100,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  textColorStyle: {
    fontFamily: fonts['Inter-Bold'],
    color: colors.black,
    alignSelf: 'center',
  },
  pinchSquare: {
    width: 400,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 50,
    objectFit: 'cover',
  },
});

export default App;
