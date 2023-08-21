import dialCodes from '../assets/dialCodes'

export function normalize(phoneNumber: string): string {
    phoneNumber = phoneNumber.replace(/[()]/g, '').trim() // removes "(" and ")" and spaces
    if (phoneNumber.length >= 2) {
        const number = phoneNumber.replace(/^00/, '+')
        const dialCode = findDialCode(number)
        if (dialCode) {
            let x = number.replace(dialCode.dialCode, '').replace(/^0+/, '')
            phoneNumber = dialCode.dialCode + x
        }
    }
    return phoneNumber
}

export function findDialCode(phoneNumber: string): any {
    let dialCode = null
    for (let i = 5; i >= 2; i--) {
        dialCode = dialCodes.find(dc => dc.dialCode === phoneNumber.substring(0, i))
        if (dialCode) break
    }
    return dialCode
}

