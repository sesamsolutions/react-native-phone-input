"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CountryFlag = ({ dialCode }) => {
    if (dialCode && dialCode.icon) {
        return (react_1.default.createElement(react_native_1.Image, { style: {
                aspectRatio: 1,
                height: undefined,
                marginRight: 12,
                marginVertical: 6,
                width: 28
            }, source: dialCode.icon }));
    }
    return null;
};
exports.default = CountryFlag;
