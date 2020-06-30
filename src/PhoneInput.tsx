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
            let obj = undefined
            try { obj = phoneUtil.parse(number, dc.countryCode) } catch { }
            if (obj) setPhoneNumber(phoneUtil.format(obj, PNF.E164), dc)
            else setPhoneNumber(number, dc)
        }
    }, [ props.value ])

    const setPhoneNumber = (number: string, dialCode: DialCode): void => {
        if (props.allowCustomDialCode)
            setPhoneNumberState(number)
        else
            setPhoneNumberState(number.replace(dialCode.dialCode, ''))
    }

    const initialDialCode = (): DialCode => {
        return dialCodes.find(x => props.initialCountry && x.countryCode === props.initialCountry.toUpperCase())
    }

    const isValidNumber = (number: string, country: string): boolean => {
        const obj = phoneUtil.parse(number, country)
        return phoneUtil.isValidNumber(obj)
    }

    const handleChangeText = (phoneNumber: string): void => {
        phoneNumber = removeLocalZero(zeroZeroTo31(phoneNumber))
        const newDialCode = findDialCode(phoneNumber)
        setPhoneNumber(phoneNumber, newDialCode)
        if (phoneNumber.length >= 1) {
            if (newDialCode) {
                setDialCode(newDialCode)
                setPhoneNumber(phoneNumber, newDialCode)
            }
        }
        // Handle input for response
        const input = props.allowCustomDialCode ? phoneNumber : dialCode?.dialCode + phoneNumber
        if (props.onChangePhoneNumber) props.onChangePhoneNumber(input)
        if (props.onChange && dialCode) {
            let obj = undefined
            try { obj = phoneUtil.parse(input, newDialCode?.countryCode) } catch { }
            const isValid = obj ? isValidNumber(input, newDialCode?.countryCode) : false
            const number = isValid ? phoneUtil.format(obj, PNF.E164) : null
            props.onChange({
                dialCode: dialCode.dialCode,
                countryCode: dialCode.countryCode,
                input,
                isValid,
                number
            })
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
