import React from 'react';
import { StyleSheet } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
    interpolateColor,
    runOnJS,
} from 'react-native-reanimated';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { ChevronDoubleRightIcon } from 'react-native-heroicons/solid';
import styles from '../../styles';
const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width;
const BUTTON_HEIGHT = 48;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
class AnimatedChevronDoubleRightIcon extends React.Component {
    render() {
        return <ChevronDoubleRightIcon {...this.props} />;
    }
}

const ToggleSwipeable = ({ onToggle, primaryColor, secondaryColor, tertiaryColor, title, style }) => {
    // // Animated value for X translation
    // const X = useSharedValue(0);
    // // Toggled State
    // const [toggled, setToggled] = useState(false);

    // // Fires when animation ends
    // const handleComplete = (isToggled) => {
    //     if (isToggled !== toggled) {
    //         setToggled(isToggled);
    //         onToggle(isToggled);
    //     }
    // };
    // // Gesture Handler Events
    // const animatedGestureHandler = useAnimatedGestureHandler({
    //     onStart: (_, ctx) => {
    //         ctx.completed = toggled;
    //     },
    //     onActive: (e, ctx) => {
    //         let newValue;
    //         if (ctx.completed) {
    //             newValue = H_SWIPE_RANGE + e.translationX;
    //         } else {
    //             newValue = e.translationX - 80;
    //         }

    //         if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
    //             X.value = newValue;
    //         }
    //     },
    //     onEnd: () => {
    //         if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
    //             X.value = withSpring(0);
    //             runOnJS(handleComplete)(false);

    //         } else {
    //             X.value = withSpring(H_SWIPE_RANGE - 80);
    //             runOnJS(handleComplete)(true);
    //         }
    //     },
    // });

    // const InterpolateXInput = [0, H_SWIPE_RANGE];
    // const AnimatedStyles = {
    //     swipeCont: useAnimatedStyle(() => {
    //         return {};
    //     }),
    //     chevronIcon: useAnimatedStyle(() => {
    //         return {
    //             position: 'absolute',
    //             left: 40,
    //             transform: [{ translateX: X.value }],
    //             opacity: interpolate(X.value, InterpolateXInput, [0.7, 0], Extrapolate.CLAMP),
    //         };
    //     }),
    //     colorWave: useAnimatedStyle(() => {
    //         return {
    //             width: H_WAVE_RANGE + X.value,

    //             opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
    //         };
    //     }),
    //     swipeable: useAnimatedStyle(() => {
    //         return {
    //             backgroundColor: interpolateColor(
    //                 X.value,
    //                 [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
    //                 [primaryColor, tertiaryColor]
    //             ),
    //             transform: [{ translateX: X.value }],
    //         };
    //     }),
    //     swipeText: useAnimatedStyle(() => {
    //         return {
    //             opacity: interpolate(X.value, InterpolateXInput, [1, 0], Extrapolate.CLAMP),
    //             transform: [
    //                 {
    //                     translateX: interpolate(
    //                         X.value,
    //                         InterpolateXInput,
    //                         [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
    //                         Extrapolate.CLAMP
    //                     ),
    //                 },
    //             ],
    //         };
    //     }),
    // };

    // return (
    //     <GestureHandlerRootView>
    //         <Animated.View style={[stylesSwitch.swipeCont, AnimatedStyles.swipeCont, style]}>
    //             <AnimatedLinearGradient
    //                 style={[AnimatedStyles.colorWave, stylesSwitch.colorWave]}
    //                 colors={[primaryColor, secondaryColor]}
    //                 start={{ x: 0.0, y: 0.5 }}
    //                 end={{ x: 1, y: 0.5 }}
    //             />
    //             <PanGestureHandler onGestureEvent={animatedGestureHandler}>
    //                 <Animated.View style={[stylesSwitch.swipeable, AnimatedStyles.swipeable]} />
    //             </PanGestureHandler>
    //             <Animated.View style={[stylesSwitch.chevronIcon, AnimatedStyles.chevronIcon]}>
    //                 <AnimatedChevronDoubleRightIcon size={20} color={'gray'} />
    //             </Animated.View>
    //             <Animated.Text style={[stylesSwitch.swipeText, AnimatedStyles.swipeText]}>
    //                 {title}
    //             </Animated.Text>
    //         </Animated.View>
    //     </GestureHandlerRootView>
    // );
};
const stylesSwitch = StyleSheet.create({
    swipeCont: {
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH - 80,
        backgroundColor: '#161E28',
        borderRadius: BUTTON_HEIGHT,
        padding: BUTTON_PADDING,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    colorWave: {
        position: 'absolute',
        left: 0,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_HEIGHT,
    },
    swipeable: {
        position: 'absolute',
        left: BUTTON_PADDING,
        height: SWIPEABLE_DIMENSIONS,
        width: SWIPEABLE_DIMENSIONS,
        borderRadius: SWIPEABLE_DIMENSIONS,
        zIndex: 3,
    },
    swipeText: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'normal',
        zIndex: 2,
        color: '#fff',
    },
    mr50: {
        marginRight: 50,
    },
});
export default ToggleSwipeable;
