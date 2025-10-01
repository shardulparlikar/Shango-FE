import { commonApiMethod } from "../axios/commonApiMethod"


export const authService = {
    login(payload: any) {
        return commonApiMethod('/auth/pre-register', 'POST', payload)
    }
}