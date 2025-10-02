import { commonApiMethod } from "../axios/commonApiMethod"

interface sendOtpType {
    contact: string;
}

interface authserviceType {
    data: { message: string }
}
export interface otpPayloadType {
    contact: string
    otp: string
}
export interface registerUserType {
    email: string
    password: string
    userType: string
}

export const authService = {
    sendOtp(payload: sendOtpType): Promise<authserviceType> {
        if (!payload || !payload.contact) {
            throw new Error("Contact information is required");
        }
        return commonApiMethod('/auth/pre-register', 'POST', payload)
    },
    verifyOtp(payload: otpPayloadType): Promise<authserviceType> {
        if (!payload || !payload.contact || !payload.otp) {
            throw new Error("Contact and OTP are required");
        }
        return commonApiMethod('/auth/verify-otp', 'POST', payload)
    },
    resendOtp(payload: sendOtpType): Promise<authserviceType> {
        if (!payload || !payload.contact) {
            throw new Error("Contact information is required");
        }
        return commonApiMethod('/auth/resend-otp', 'POST', payload)
    },
    registerUser(payload: registerUserType): Promise<authserviceType> {
        if (!payload) {
            throw new Error("User data is required");
        }
        return commonApiMethod('/auth/register', 'POST', payload)
    }
}
