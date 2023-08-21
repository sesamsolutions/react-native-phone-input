/// <reference types="react" />
import { DialCode } from './assets/dialCodes';
interface CountryFlagProps {
    children?: any;
    dialCode?: DialCode;
}
declare const CountryFlag: (props: CountryFlagProps) => JSX.Element;
export default CountryFlag;
