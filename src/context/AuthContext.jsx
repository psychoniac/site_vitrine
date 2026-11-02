import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    // Récupérer le profil et le rôle depuis la table 'profiles'
    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) throw error
            setProfile(data)
        } catch (error) {
            console.error('Erreur lors du chargement du profil :', error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Récupérer la session active au chargement
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchProfile(session.user.id)
            } else {
                setLoading(false)
            }
        })

        // Écouter les changements d'auth (connexion, déconnexion)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                await fetchProfile(session.user.id)
            } else {
                setProfile(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])



    // Fonction de connexion
    const login = (email, password) => {
        return supabase.auth.signInWithPassword({ email, password })
    }

    // Fonction d'inscription
    const signup = (email, password, fullName) => {
        return supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName }
            }
        })
    }

    // Fonction de déconnexion
    const logout = () => {
        return supabase.auth.signOut()
    }

    const value = {
        user,
        profile,
        loading,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)