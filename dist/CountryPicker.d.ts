import { FC } from 'react';
import { DialCode } from './assets/dialCodes';
interface Props {
    children?: any;
    visible: boolean;
    onSelect(dialCode: DialCode): void;
    onRequestClose(): void;
}
declare const CountryPicker: FC<Props>;
export default CountryPicker;
