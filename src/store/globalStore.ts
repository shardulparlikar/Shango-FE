import { defineStore } from 'pinia'
interface globalState {
    selectedRole: string
}

export const useGlobalStore = defineStore('globalStore', {
    state: (): globalState => ({
        selectedRole: ""
    }),
    getters: {
        getSelectedRole: (state) => state.selectedRole,
        isTalent: (state) => state.selectedRole === 'talent',
        isRecruiter: (state) => state.selectedRole === 'recruteur',
    },
    actions: {
        setRole(role: string) {
            this.selectedRole = role
        }
    }
})