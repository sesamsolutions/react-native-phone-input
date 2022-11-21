import { FC } from 'react';
import { DialCode } from './assets/dialCodes';
interface CountryFlagProps {
    children?: any;
    dialCode?: DialCode;
}
declare const CountryFlag: FC<CountryFlagProps>;
export default CountryFlag;
