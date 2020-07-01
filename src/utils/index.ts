import dialCodes from '../assets/dialCodes'

export function normalize(phoneNumber: string): string {
    phoneNumber = phoneNumber.replace(/[()]/g, '').trim() // removes "(" and ")" and spaces
    if (phoneNumber.length >= 2) {
        let number = phoneNumber.replace(/^00/, '+')
        const dialCode = findDialCode(number)
        if (dialCode) {
            let x = number.replace(dialCode.dialCode, '').replace(/^0+/, '')
            phoneNumber = dialCode.dialCode + x
        }
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

