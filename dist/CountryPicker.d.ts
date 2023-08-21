/// <reference types="react" />
import { DialCode } from './assets/dialCodes';
interface CountryPickerProps {
    children?: any;
    visible: boolean;
    onSelect(dialCode: DialCode): void;
    onRequestClose(): void;
}
declare const CountryPicker: ({ visible, onSelect, onRequestClose }: CountryPickerProps) => JSX.Element;
export default CountryPicker;
