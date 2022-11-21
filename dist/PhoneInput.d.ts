import { FC } from 'react';
export interface PhoneInputProps {
    ref?: any;
    children?: any;
    initialCountry?: string;
    value?: string;
    style?: object;
    textStyle?: object;
    dismissKeyboard?: boolean;
    autoFocus?: boolean;
    allowCustomDialCode?: boolean;
    dialCodeStyle?: object;
    dialCodeTextStyle?: object;
    onChange?(data: PhoneInputChangeEvent): void;
    onChangePhoneNumber?(phoneNumber: string): void;
}
export interface PhoneInputChangeEvent {
    input: string;
    dialCode: string | null;
    countryCode: string | null;
    isValid: boolean;
    e164: string | null;
}
declare const PhoneInput: FC<PhoneInputProps>;
export default PhoneInput;
