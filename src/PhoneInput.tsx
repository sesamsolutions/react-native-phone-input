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
            let number = props.value
            let dc = findDialCode(number)
            if (!dc) {
                dc = initialDialCode()
                number = dc.dialCode + number
            }
            setDialCode(dc)
            let obj = undefined
            try { obj = phoneUtil.parse(number, dc.countryCode) } catch { }
            if (obj) setPhoneNumber(phoneUtil.format(obj, PNF.E164), dc)
            else setPhoneNumber(number, dc)
        }
    }, [ props.value ])

    const setPhoneNumber = (number: string, dialCode: DialCode | undefined): void => {
        if (!props.allowCustomDialCode && dialCode)
            setPhoneNumberState(number.replace(dialCode.dialCode, ''))
        else setPhoneNumberState(number)
    }

    const initialDialCode = (): DialCode => {
        return dialCodes.find(x => props.initialCountry && x.countryCode === props.initialCountry.toUpperCase())
    }

    const isValidNumber = (number: string, country: string): boolean => {
        const obj = phoneUtil.parse(number, country)
        return phoneUtil.isValidNumber(obj)
    }

    const handleChangeText = (number: string): void => {
        number = removeLocalZero(zeroZeroTo31(number))
        let dc = findDialCode(number)
        if (!dc) {
            dc = initialDialCode()
            number = dc.dialCode + number
        }
        setDialCode(dc)
        setPhoneNumber(number, dc)
        // Handle input for response
        const input = props.allowCustomDialCode ? number : dc.dialCode + number
        if (props.onChangePhoneNumber) props.onChangePhoneNumber(input)
        if (props.onChange) {
            let event = {
                input, dialCode: null, countryCode: null, isValid: false, number: null
            }
            if (dc) {
                event.dialCode = dc.dialCode
                event.countryCode = dc.countryCode
                let obj = undefined
                try { obj = phoneUtil.parse(input, dc.countryCode) } catch { }
                if (obj) {
                    event.isValid = obj ? isValidNumber(input, dc.countryCode) : false
                    event.number = event.isValid ? phoneUtil.format(obj, PNF.E164) : null
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
