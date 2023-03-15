/// <reference types="react" />
export interface PhoneInputProps {
    ref?: any;
    children?: any;
    initialCountry?: string;
    value?: string;
    style?: any;
    textStyle?: any;
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
declare const PhoneInput: ({ initialCountry, value, style, textStyle, dismissKeyboard, autoFocus, onChange, onChangePhoneNumber }: PhoneInputProps) => JSX.Element;
export default PhoneInput;
