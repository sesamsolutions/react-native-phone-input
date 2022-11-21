"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CountryFlag = (props) => (react_1.default.createElement(react_native_1.View, { style: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        marginRight: 12,
        width: 28
    } }, props.dialCode && props.dialCode.icon && (react_1.default.createElement(react_native_1.Image, { style: {
        aspectRatio: 1,
        height: undefined,
        width: 28
    }, source: props.dialCode.icon }))));
exports.default = CountryFlag;
