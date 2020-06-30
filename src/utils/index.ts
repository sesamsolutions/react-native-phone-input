import dialCodes from '../assets/dialCodes'

export function zeroZeroTo31(phoneNumber: string): string {
    if (phoneNumber.startsWith('00')) phoneNumber = '+' + phoneNumber.substring(2)
    return phoneNumber
}

export function removeLocalZero(phoneNumber: string): string {
    phoneNumber = phoneNumber.replace(/[()]/g, '') // removes "(" and ")"
    phoneNumber = phoneNumber.replace(/^0+/, '')
    const dialCode = findDialCode(phoneNumber)
    if (dialCode) {
        let x = phoneNumber.replace(dialCode.dialCode, '').replace(/^0+/, '')
        phoneNumber = dialCode.dialCode + x
    }
    return phoneNumber
}

export function findDialCode(phoneNumber: string): any {
    let dialCode = undefined
    dialCode = dialCodes.find(x => x.dialCode === phoneNumber.substr(0, 5))
    if (!dialCode) dialCode = dialCodes.find(x => x.dialCode === phoneNumber.substr(0, 4))
    if (!dialCode) dialCode = dialCodes.find(x => x.dialCode === phoneNumber.substr(0, 3))
    if (!dialCode) dialCode = dialCodes.find(x => x.dialCode === phoneNumber.substr(0, 2))
    return dialCode
}

/*export function isValidPhoneNumber(number: string, countryCode: string): boolean {
    const numberObj = phoneUtil.parse(number, countryCode)
    return phoneUtil.isValidNumber(numberObj)
}*/

