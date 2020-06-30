import React, { FC, useEffect } from 'react'
import {
    Dimensions,
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import CountryFlag from './CountryFlag'
import dialCodes, { DialCode } from './assets/dialCodes'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

interface Props {
    children?: any
    dialCode: DialCode | undefined
    visible: boolean
    onSelect(dialCode: DialCode): any
    onRequestClose(): any
}

const CountryPicker: FC<Props> = (props) => {

    useEffect(() => {

    }, [])

    return (
        <Modal visible={props.visible} transparent>
            <TouchableWithoutFeedback onPress={props.onRequestClose}>
                <View style={{
                    backgroundColor: 'rgba(0, 0, 0, .3)',
                    flex: 1
                }}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={{
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 14,
                            borderTopRightRadius: 14,
                            bottom: 0,
                            height: screenHeight - 284,
                            overflow: 'hidden',
                            paddingTop: 10,
                            position: 'absolute',
                            width: screenWidth
                        }}>
                            <FlatList
                                data={dialCodes}
                                style={{ paddingTop: 10 }}
                                contentContainerStyle={{ paddingBottom: 16 }}
                                keyExtractor={(item) => item.countryCode}
                                keyboardShouldPersistTaps="always"
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => props.onSelect(item)}>
                                        <View style={{
                                            alignItems: 'center',
                                            borderColor: '#eff2f5',
                                            borderBottomWidth: 1,
                                            height: 48,
                                            flexDirection: 'row',
                                            paddingLeft: 24,
                                            paddingRight: 24
                                        }}>
                                            <CountryFlag dialCode={item} />
                                            <View style={{ marginLeft: 4 }}>
                                                <Text>{item.name}</Text>
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
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )

}

export default CountryPicker
