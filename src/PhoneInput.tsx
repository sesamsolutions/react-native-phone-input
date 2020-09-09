import React, { FC, useState, useEffect } from 'react'
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CountryFlag from './CountryFlag'
import CountryPicker from './CountryPicker'
import dialCodes, { DialCode } from './assets/dialCodes'
import {
    findDialCode,
    normalize
} from './utils'

const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

interface Props {
    ref?: any
    children?: any
    initialCountry?: string
    value?: string
    allowCustomDialCode?: boolean
    onChange?(data: any): any
    onChangePhoneNumber?(phoneNumber: string): any
    style?: object
    dialCodeStyle?: object
    dialCodeTextStyle?: object
    textStyle?: object
    dismissKeyboard?: boolean
    autoFocus?: boolean
}

const PhoneInput: FC<Props> = (props) => {

    const [ dialCode, setDialCode ] = useState<DialCode | undefined>(undefined)
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ countryPickerVisible, setCountryPickerVisible ] = useState(false)

    useEffect(() => {
        const dialCode = initialDialCode()
        if (dialCode) {
            setDialCode(dialCode)
            if (props.allowCustomDialCode) setPhoneNumber(dialCode.dialCode)
        }
    }, [])

    useEffect(() => {
        if (props.value && props.value.length) {
            handleChangeText(props.value)
        }
    }, [ props.value ])

    const initialDialCode = (): DialCode => {
        return dialCodes.find(x => props.initialCountry && x.countryCode === props.initialCountry.toUpperCase())
    }

    const isValidNumber = (number: string, country: string): boolean => {
        const obj = phoneUtil.parse(number, country)
        return phoneUtil.isValidNumber(obj)
    }

    const handleChangeText = (input: string): void => {
        input = normalize(input)
        let dc = findDialCode(input)
        if (!dc && !input.startsWith('+') && !input.startsWith('00')) {
            dc = initialDialCode()
            if (input.length >= 2)
                input = dc.dialCode + input.replace(/^0+/, '')
        }
        if (dc && !props.allowCustomDialCode)
            input = input.split(dc.dialCode).join('')
        setDialCode(dc) // update flag icon
        setPhoneNumber(input)
        const number = dc ? dc.dialCode + input.split(dc.dialCode).join('') : input
        if (props.onChangePhoneNumber) props.onChangePhoneNumber(number)
        emitChange(number, dc)
    }

    const emitChange = (number: string, dialCode: DialCode): void => {
        if (props.onChange) {
            let event = {
                input: number, dialCode: null, countryCode: null, isValid: false, e164: null
            }
            if (dialCode) {
                event.dialCode = dialCode.dialCode
                event.countryCode = dialCode.countryCode
                let obj = undefined
                try { obj = phoneUtil.parse(number, dialCode.countryCode) } catch { }
                if (obj) {
                    event.isValid = obj ? isValidNumber(number, dialCode.countryCode) : false
                    event.e164 = event.isValid ? phoneUtil.format(obj, PNF.E164) : null
                }
            }
            if (event.isValid && props.dismissKeyboard) Keyboard.dismiss()
            props.onChange(event)
        }
    }

    const openCountryPicker = (): void => {
        Keyboard.dismiss()
        setCountryPickerVisible(true)
    }

    const handleSelect = (newDialCode: DialCode): void => {
        let number = phoneNumber
        if (dialCode) number = number.split(dialCode.dialCode).join('')
        setDialCode(newDialCode)
        handleChangeText(newDialCode.dialCode + number)
        setCountryPickerVisible(false)
    }

    return (
        <>
            <View style={{
                borderColor: '#eeeeee',
                borderBottomWidth: 1,
                flexDirection: 'row',
                ...props.style
            }}>
                <TouchableOpacity onPress={openCountryPicker} style={{ flexDirection: 'row' }}>
                    <CountryFlag dialCode={dialCode} />
                    {!props.allowCustomDialCode && (
                        <View style={{
                            borderColor: '#eeeeee',
                            borderRightWidth: 1,
                            justifyContent: 'center',
                            paddingRight: 14,
                            ...props.dialCodeStyle
                        }}>
                            <Text style={{
                                ...props.textStyle,
                                ...props.dialCodeTextStyle
                            }}>{dialCode?.dialCode}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TextInput
                    dataDetectorTypes={[ 'phoneNumber' ]}
                    keyboardType={props.allowCustomDialCode ? 'phone-pad' : 'number-pad'}
                    onChangeText={handleChangeText}
                    autoFocus={props.autoFocus}
                    value={phoneNumber}
                    style={{
                        borderWidth: 0,
                        flexGrow: 1,
                        height: 40,
                        paddingLeft: props.allowCustomDialCode ? 0 : 14,
                        ...props.textStyle
                    }} />
            </View>
            <CountryPicker
                visible={countryPickerVisible}
                dialCode={dialCode}
                onSelect={handleSelect}
                onRequestClose={() => setCountryPickerVisible(false)} />
        </>
    )

}

PhoneInput.defaultProps = {
    initialCountry: 'US',
    allowCustomDialCode: false,
    dismissKeyboard: true
}

export default PhoneInput
