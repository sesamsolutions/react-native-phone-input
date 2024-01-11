import React from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
export interface PhoneInputProps {
    ref?: any;
    children?: any;
    initialCountry?: string;
    value?: string;
    style?: object;
    textStyle?: object;
    dismissKeyboard?: boolean;
    autoFocus?: boolean;
    onChange?(data: PhoneInputChangeEvent): void;
    onChangePhoneNumber?(phoneNumber: string): void;
    onFocus?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
    onBlur?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
}
export interface PhoneInputChangeEvent {
    input: string;
    dialCode: string | null;
    countryCode: string | null;
    isValid: boolean;
    e164: string | null;
}
declare const PhoneInput: React.ForwardRefExoticComponent<Pick<PhoneInputProps, "children" | "style" | "onBlur" | "onFocus" | "initialCountry" | "value" | "textStyle" | "dismissKeyboard" | "autoFocus" | "onChange" | "onChangePhoneNumber"> & React.RefAttributes<unknown>>;
export default PhoneInput;
