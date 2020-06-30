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
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ countryPickerVisible, setCountryPickerVisible ] = useState(false)

    useEffect(() => {
        const dialCode = dialCodes.find(x => props.initialCountry && x.countryCode === props.initialCountry.toUpperCase())
        if (dialCode) {
            setDialCode(dialCode)
            if (props.allowCustomDialCode) setPhoneNumber(dialCode.dialCode)
        }
    }, [])

    useEffect(() => {
        if (props.value && props.value.length)
            handleChangeText(props.value)
    }, [ props.value ])

    const isValidNumber = (number: string, country: string): boolean => {
        const obj = phoneUtil.parse(number, country)
        return phoneUtil.isValidNumber(obj)
    }

    const handleChangeText = (phoneNumber: string): void => {
        phoneNumber = removeLocalZero(zeroZeroTo31(phoneNumber))
        const newDialCode = findDialCode(phoneNumber)
        setPhoneNumber(phoneNumber)
        if (phoneNumber.length >= 1) {
            if (newDialCode) {
                setDialCode(newDialCode)
                if (!props.allowCustomDialCode)
                    setPhoneNumber(phoneNumber.replace(newDialCode.dialCode, ''))
                else
                    setPhoneNumber(phoneNumber)
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
        if (props.allowCustomDialCode) {
            // Update country code while leaving number intact
            // Update number string only if custom dial code input is allowed
            if (dialCode) setPhoneNumber(newDialCode.dialCode + phoneNumber.replace(dialCode.dialCode, ''))
            else setPhoneNumber(newDialCode.dialCode)
        }
        setDialCode(newDialCode)
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
