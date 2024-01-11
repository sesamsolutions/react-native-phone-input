import React from 'react';
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
}
export interface PhoneInputChangeEvent {
    input: string;
    dialCode: string | null;
    countryCode: string | null;
    isValid: boolean;
    e164: string | null;
}
declare const PhoneInput: React.ForwardRefExoticComponent<Pick<PhoneInputProps, "children" | "style" | "initialCountry" | "value" | "textStyle" | "dismissKeyboard" | "autoFocus" | "onChange" | "onChangePhoneNumber"> & React.RefAttributes<unknown>>;
export default PhoneInput;
