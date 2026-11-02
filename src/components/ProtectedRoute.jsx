import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShieldExclamationIcon } from '@heroicons/react/24/outline'

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user, profile, loading } = useAuth()

    // Pendant que le contexte vérifie la session
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-sm">
                Vérification des autorisations...
            </div>
        )
    }

    // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion (/profile)
    if (!user) {
        return <Navigate to="/profile" replace />
    }

    // Si la route est réservée aux admins et que l'utilisateur n'a pas le rôle admin
    if (adminOnly && profile?.role !== 'admin') {
        return (
            <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/30">
                    <ShieldExclamationIcon className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-slate-100">Accès Restreint</h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Vous n'avez pas les droits administrateur nécessaires pour accéder à cette page.
                    Connectez-vous avec un compte administrateur Supabase.
                </p>
            </div>
        )
    }

    // Si tout est bon, on affiche la page demandée
    return children
}