import React, { FC } from 'react'
import { Image, View } from 'react-native'
import { DialCode } from './assets/dialCodes'

interface Props {
    children?: any
    dialCode: DialCode | undefined
}

const CountryFlag: FC<Props> = (props) => {
    return (
        <View style={{
            alignItems: 'center',
            height: 40,
            justifyContent: 'center',
            marginRight: 12,
            width: 28
        }}>
            {props.dialCode && props.dialCode.icon && (
                <Image
                    style={{
                        aspectRatio: 1,
                        height: undefined,
                        width: 28
                    }}
                    source={props.dialCode.icon} />
            )}
        </View>
    )
}

export default CountryFlag
