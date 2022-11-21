export interface DialCode {
    name: string;
    dialCode: string;
    countryCode: string;
    icon?: any;
    latitude: number;
    longitude: number;
}
declare const dialCodes: DialCode[];
export default dialCodes;
