# React Native Phone Input

## Installation

```
yarn add @sesamsolutions/phone-input
```

or

```
npm install @sesamsolutions/phone-input
```

## Usage

```jsx
import PhoneInput from '@sesamsolutions/phone-input'
```

### Example

```jsx
import React from 'react'
import { Alert, View } from 'react-native'
import PhoneInput from '@sesamsolutions/phone-input'

const App = () => {

    const handleChange = (data) => {
        if (data.isValid) {
            Alert.alert(data.e164)
        } else {
            console.log(data.input + ' is not a valid phone number')
        }
    }

    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <PhoneInput
                initialCountry="US"
                onChange={handleChange}
                allowCustomDialCode={false}
                dismissKeyboard={true} />
        </View>
    )
    
}

export default App
```

## Props

#### `initialCountry`

Set the initial country and dial code. Defaults to `US`.

#### `onChange`

Returns an object containing information about the Phone Number every time the input or `value` changes.

* `countryCode`: currently selected country code. `null` if not selected.
* `dialCode`: current dial code. `null` if not selected.
* `e164`: e164 valid phone number. `null` if invalid.
* `input`: raw phone number input. Same as `onChangePhoneNumber`.
* `isValid`: `boolean` indicating if phone number is valid.

#### `onChangePhoneNumber`

Returns the current raw input `string`. It is recommended to use `onChange` instead to benefit from additional validations such as e164 ouput.

#### `value`

Changes the current input.
Be careful not to update this when the `onChange` event fires. This will cause an endless loop.

#### `allowCustomDialCode`

`boolean` indicating whether custom dial code input should be allowed or not. When set to false you can only select dial codes from the country picker. Defaults to `true`.

#### `dismissKeyboard`

`boolean` indicating if the keyboard should be dismissed automatically after the input is considered valid e164 format. Defaults to `true`.

#### `style`

Customize the phone number input.

#### `textStyle`

Customize text inside the phone number input.
