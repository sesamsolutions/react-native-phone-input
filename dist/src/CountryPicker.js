"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const CountryFlag_1 = __importDefault(require("./CountryFlag"));
const dialCodes_1 = __importDefault(require("./assets/dialCodes"));
const { width, height } = react_native_1.Dimensions.get('window');
const CountryPicker = ({ visible = false, onSelect = (dialCode) => { }, onRequestClose = () => { } }) => {
    const pickerHeight = (0, react_1.useRef)(height - 285).current;
    const showAnimation = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const [_visible, _setVisible] = (0, react_1.useState)(visible);
    const colorScheme = (0, react_native_1.useColorScheme)();
    (0, react_1.useEffect)(() => {
        if (visible)
            _setVisible(true);
        else {
            react_native_1.Animated.spring(showAnimation, {
                toValue: visible ? 1 : 0,
                stiffness: 1000,
                damping: 500,
                mass: 1.5,
                useNativeDriver: true
            }).start(() => _setVisible(false));
        }
    }, [visible]);
    (0, react_1.useEffect)(() => {
        if (_visible) {
            react_native_1.Animated.spring(showAnimation, {
                toValue: visible ? 1 : 0,
                stiffness: 500,
                damping: 100,
                mass: 1.5,
                useNativeDriver: true
            }).start();
        }
    }, [_visible]);
    const translateY = showAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [pickerHeight, 0]
    });
    return (react_1.default.createElement(react_native_1.Modal, { visible: _visible, transparent: true },
        react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: onRequestClose },
            react_1.default.createElement(react_native_1.View, { style: { flex: 1 } },
                react_1.default.createElement(react_native_1.Animated.View, { style: {
                        backgroundColor: 'rgba(0, 0, 0, .3)',
                        height,
                        opacity: showAnimation,
                        position: 'absolute',
                        width
                    } }),
                react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: () => { } },
                    react_1.default.createElement(react_native_1.Animated.View, { style: {
                            backgroundColor: colorScheme === 'light' ? '#ffffff' : '#1c1c1e',
                            borderTopLeftRadius: 14,
                            borderTopRightRadius: 14,
                            bottom: 0,
                            height: pickerHeight,
                            overflow: 'hidden',
                            paddingTop: 10,
                            position: 'absolute',
                            transform: [{ translateY }],
                            width: width
                        } },
                        react_1.default.createElement(react_native_1.FlatList, { data: dialCodes_1.default, style: { paddingTop: 10 }, contentContainerStyle: { paddingBottom: 16 }, keyExtractor: (item) => item.countryCode, keyboardShouldPersistTaps: "always", renderItem: ({ item }) => (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => onSelect(item) },
                                react_1.default.createElement(react_native_1.View, { style: {
                                        alignItems: 'center',
                                        borderColor: colorScheme === 'light' ? '#eff2f5' : '#29292b',
                                        borderBottomWidth: 1,
                                        height: 48,
                                        flexDirection: 'row',
                                        paddingLeft: 24,
                                        paddingRight: 24
                                    } },
                                    react_1.default.createElement(CountryFlag_1.default, { dialCode: item }),
                                    react_1.default.createElement(react_native_1.View, { style: { marginLeft: 4 } },
                                        react_1.default.createElement(react_native_1.Text, { style: {
                                                color: colorScheme === 'light' ? '#111111' : '#ffffff'
                                            } }, item.name)),
                                    react_1.default.createElement(react_native_1.View, { style: {
                                            marginLeft: 'auto',
                                            width: 50
                                        } },
                                        react_1.default.createElement(react_native_1.Text, { style: {
                                                color: '#999999',
                                                textAlign: 'right'
                                            } }, item.dialCode))))) })))))));
};
exports.default = CountryPicker;
