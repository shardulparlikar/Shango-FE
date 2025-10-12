import { defineStore } from 'pinia'
interface globalState {
    selectedRole: string,
    userRegion: string,
    userCountry: string
    
}

export const useGlobalStore = defineStore('globalStore', {
    state: (): globalState => ({
        selectedRole: "",
        userRegion: "",
        userCountry: ""
    }),
    getters: {
        getSelectedRole: (state) => state.selectedRole,
        isTalent: (state) => state.selectedRole === 'talent',
        isRecruiter: (state) => state.selectedRole === 'recruteur',
        getUserCountry: (state) => state.userCountry,
        getUserRegion: (state) => state.userRegion
    },
    actions: {
        setRole(role: string) {
            this.selectedRole = role
        },
        setLocation(country: string, region: string) {
            this.userRegion = region,
            this.userCountry = country
        }
    }
})