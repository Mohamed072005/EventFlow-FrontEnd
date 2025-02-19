import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";
import {jwtDecode} from "jwt-decode";
import {AuthState} from "@/types/user";

interface JWTPayload {
    exp: number;
    iat: number;
    id: string;
    role: string;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            checkAuth: async () => {
                try{
                    set({ isLoading: true });
                    const token = localStorage.getItem("authToken");
                    if(!token) {
                        set({isAuthenticated: false, user: null, isLoading: false});
                        return;
                    }

                    const decodedToken = jwtDecode<JWTPayload>(token);
                    const currentDate = Date.now() / 1000;
                    if(decodedToken.exp < currentDate) {
                        localStorage.removeItem("authToken");
                        set({isAuthenticated: false, user: null, isLoading: false});
                        return;
                    }
                    set({
                        isAuthenticated: true,
                        isLoading: false,
                        user: {
                            id: decodedToken.id,
                            role: decodedToken.role
                        }})
                }catch(err: any){
                    set({isAuthenticated: false, user: null, isLoading: false});
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user }),
        }
    )
)

export default useAuthStore;