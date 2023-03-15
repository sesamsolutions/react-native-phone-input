/// <reference types="react" />
import { DialCode } from './assets/dialCodes';
interface CountryFlagProps {
    children?: any;
    dialCode?: DialCode;
}
declare const CountryFlag: ({ dialCode }: CountryFlagProps) => JSX.Element | null;
export default CountryFlag;
