import React from 'react'
import { Image } from 'react-native'
import { DialCode } from './assets/dialCodes'

interface CountryFlagProps {
    children?: any
    dialCode?: DialCode
}

const CountryFlag = ({ dialCode }: CountryFlagProps) => {
    if (dialCode && dialCode.icon) {
        return (
            <Image
                style={{
                    aspectRatio: 1,
                    height: undefined,
                    marginRight: 12,
                    marginVertical: 6,
                    width: 28
                }}
                source={dialCode.icon} />
        )
    }
    return null
}

export default CountryFlag
