import React, { FC, useState, useEffect, useRef } from 'react'
import { Animated, Dimensions, FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native'
import CountryFlag from './CountryFlag'
import dialCodes, { DialCode } from './assets/dialCodes'

const { width, height } = Dimensions.get('window')

interface Props {
    children?: any
    visible: boolean
    onSelect(dialCode: DialCode): any
    onRequestClose(): any
}

const CountryPicker: FC<Props> = ({
    visible = false,
    onSelect = (dialCode: DialCode) => {},
    onRequestClose = () => {}
}) => {

    const pickerHeight = useRef(height - 285).current
    const showAnimation = useRef(new Animated.Value(0)).current
    const [ _visible, _setVisible ] = useState(visible)
    const colorScheme = useColorScheme()

    useEffect(() => {
        if (visible) _setVisible(true)
        else {
            Animated.spring(showAnimation, {
                toValue: visible ? 1 : 0,
                stiffness: 1000,
                damping: 500,
                mass: 1.5,
                useNativeDriver: true
            }).start(() => _setVisible(false))
        }
    }, [ visible ])

    useEffect(() => {
        if (_visible) {
            Animated.spring(showAnimation, {
                toValue: visible ? 1 : 0,
                stiffness: 500,
                damping: 100,
                mass: 1.5,
                useNativeDriver: true
            }).start()
        }
    }, [ _visible ])

    const translateY = showAnimation.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ pickerHeight, 0 ]
    })

    return (
        <Modal visible={_visible} transparent>
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={{ flex: 1 }}>
                    <Animated.View style={{
                        backgroundColor: 'rgba(0, 0, 0, .3)',
                        height,
                        opacity: showAnimation,
                        position: 'absolute',
                        width
                    }} />
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <Animated.View style={{
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
                        }}>
                            <FlatList
                                data={dialCodes}
                                style={{ paddingTop: 10 }}
                                contentContainerStyle={{ paddingBottom: 16 }}
                                keyExtractor={(item) => item.countryCode}
                                keyboardShouldPersistTaps="always"
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => onSelect(item)}>
                                        <View style={{
                                            alignItems: 'center',
                                            borderColor: colorScheme === 'light' ? '#eff2f5' : '#29292b',
                                            borderBottomWidth: 1,
                                            height: 48,
                                            flexDirection: 'row',
                                            paddingLeft: 24,
                                            paddingRight: 24
                                        }}>
                                            <CountryFlag dialCode={item} />
                                            <View style={{ marginLeft: 4 }}>
                                                <Text style={{
                                                    color: colorScheme === 'light' ? '#111111' : '#ffffff'
                                                }}>{item.name}</Text>
                                            </View>
                                            <View style={{
                                                marginLeft: 'auto',
                                                width: 50
                                            }}>
                                                <Text style={{
                                                    color: '#999999',
                                                    textAlign: 'right'
                                                }}>{item.dialCode}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )

}

export default CountryPicker
