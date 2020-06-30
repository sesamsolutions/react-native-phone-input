import React, { FC, useState, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CountryFlag from './CountryFlag'
import CountryPicker from './CountryPicker'
import dialCodes, { DialCode } from './assets/dialCodes'
import {
    findDialCode,
    removeLocalZero,
    zeroZeroTo31
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
}

const PhoneInput: FC<Props> = (props) => {

    const [ dialCode, setDialCode ] = useState<DialCode | undefined>(undefined)
    const [ phoneNumber, setPhoneNumberState ] = useState('')
    const [ countryPickerVisible, setCountryPickerVisible ] = useState(false)

    useEffect(() => {
        const dialCode = initialDialCode()
        if (dialCode) {
            setDialCode(dialCode)
            setPhoneNumber('', dialCode)
        }
    }, [])

    useEffect(() => {
        if (props.value && props.value.length) {
            handleChangeText(props.value)
        }
    }, [ props.value ])

    const setPhoneNumber = (number: string, dialCode: DialCode | undefined): void => {
        if (!props.allowCustomDialCode && dialCode)
            setPhoneNumberState(number.split(dialCode.dialCode).join(''))
        else setPhoneNumberState(number)
    }

    const initialDialCode = (): DialCode => {
        return dialCodes.find(x => props.initialCountry && x.countryCode === props.initialCountry.toUpperCase())
    }

    const isValidNumber = (number: string, country: string): boolean => {
        const obj = phoneUtil.parse(number, country)
        return phoneUtil.isValidNumber(obj)
    }

    const handleChangeText = (input: string): void => {
        input = removeLocalZero(zeroZeroTo31(input))
        let dc = findDialCode(input)
        if (!dc) dc = initialDialCode()
        setDialCode(dc)
        setPhoneNumber(dc.dialCode + input, dc)
        // Handle input for response
        const number = dc.dialCode + input.split(dc.dialCode).join('')
        if (props.onChangePhoneNumber) props.onChangePhoneNumber(number)
        if (props.onChange) {
            let event = {
                input: number, dialCode: null, countryCode: null, isValid: false, e164: null
            }
            if (dc) {
                event.dialCode = dc.dialCode
                event.countryCode = dc.countryCode
                let obj = undefined
                try { obj = phoneUtil.parse(number, dc.countryCode) } catch { }
                if (obj) {
                    event.isValid = obj ? isValidNumber(number, dc.countryCode) : false
                    event.e164 = event.isValid ? phoneUtil.format(obj, PNF.E164) : null
                }
            }
            console.warn(event)
            props.onChange(event)
        }
    }

    const handleSelect = (newDialCode: DialCode): void => {
        setDialCode(newDialCode)
        setPhoneNumber(phoneNumber, newDialCode)
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
                <TouchableOpacity onPress={() => setCountryPickerVisible(true)} style={{ flexDirection: 'row' }}>
                    <CountryFlag dialCode={dialCode} />
                    {!props.allowCustomDialCode && (
                        <View style={{
                            borderColor: '#eeeeee',
                            borderRightWidth: 1,
                            justifyContent: 'center',
                            paddingRight: 14,
                            ...props.dialCodeStyle
                        }}>
                            <Text style={{ ...props.dialCodeTextStyle }}>{dialCode?.dialCode}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TextInput
                    dataDetectorTypes={[ 'phoneNumber' ]}
                    keyboardType={props.allowCustomDialCode ? 'phone-pad' : 'number-pad'}
                    onChangeText={handleChangeText}
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
    allowCustomDialCode: true
}

export default PhoneInput
