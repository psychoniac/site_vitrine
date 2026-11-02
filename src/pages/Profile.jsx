import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ShoppingBagIcon,
    ArrowRightOnRectangleIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function Profile() {
    const { user, profile, login, signup, logout } = useAuth()
    const [isRegistering, setIsRegistering] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    // Gérer la soumission du formulaire (Connexion ou Inscription)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        setLoading(true)

        try {
            if (isRegistering) {
                const { error } = await signup(email, password, fullName)
                if (error) throw error
                alert('Inscription réussie ! Vérifiez vos emails si la confirmation est activée.')
            } else {
                const { error } = await login(email, password)
                if (error) throw error
            }
        } catch (error) {
            setErrorMsg(error.message)
        } finally {
            setLoading(false)
        }
    }

    // --- SI L'UTILISATEUR EST CONNECTÉ ---
    if (user) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

                {/* En-tête du profil */}
                <div className="bg-brand-surface p-6 sm:p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-brand-dark flex items-center justify-center text-brand-accent border border-slate-700">
                            <UserIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-100">
                                {profile?.full_name || 'Mon Compte'}
                            </h1>
                            <p className="text-slate-400 text-sm">{user.email}</p>
                            <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-wider">
                                <ShieldCheckIcon className="w-4 h-4" />
                                Rôle : {profile?.role || 'client'}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 font-semibold hover:bg-rose-500 hover:text-white transition-all text-sm"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        Se déconnecter
                    </button>
                </div>

                {/* Historique des commandes (Squelette interactif) */}
                <div className="bg-brand-surface p-6 sm:p-8 rounded-2xl border border-slate-700 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
                        <ShoppingBagIcon className="w-6 h-6 text-brand-accent" />
                        <h2 className="text-xl font-bold text-slate-100">Historique de mes commandes</h2>
                    </div>

                    <div className="text-center py-8 text-slate-400 text-sm">
                        Vous n'avez pas encore passé de commande. Rendez-vous dans le catalogue pour faire vos premiers achats !
                    </div>
                </div>

            </div>
        )
    }

    // --- SI L'UTILISATEUR N'EST PAS CONNECTÉ (Formulaire Auth) ---
    return (
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="bg-brand-surface border border-slate-700 rounded-2xl p-8 space-y-6 shadow-2xl">

                <div className="text-center space-y-2">
                    <div className="inline-flex p-3 rounded-2xl bg-brand-dark text-brand-accent border border-slate-700 mb-2">
                        <UserIcon className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100">
                        {isRegistering ? 'Créer un compte' : 'Connexion à votre espace'}
                    </h1>
                    <p className="text-slate-400 text-sm">
                        {isRegistering ? 'Rejoignez GreenVibe Shop pour commander' : 'Accédez à votre panier et vos commandes'}
                    </p>
                </div>

                {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Nom complet</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Jean Dupont"
                                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Adresse email</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                                <EnvelopeIcon className="w-5 h-5" />
                            </span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="vous@exemple.fr"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Mot de passe</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                                <LockClosedIcon className="w-5 h-5" />
                            </span>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-brand-accent text-brand-dark font-bold hover:bg-brand-accentHover transition-all shadow-lg shadow-brand-accent/20 text-sm mt-2 disabled:opacity-50"
                    >
                        {loading ? 'Chargement...' : (isRegistering ? "S'inscrire" : 'Se connecter')}
                    </button>
                </form>

                <div className="text-center pt-4 border-t border-slate-700 text-sm text-slate-400">
                    {isRegistering ? 'Déjà un compte ?' : "Pas encore de compte ?"} {' '}
                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-brand-accent font-semibold hover:underline"
                    >
                        {isRegistering ? 'Se connecter' : "S'inscrire"}
                    </button>
                </div>

            </div>
        </div>
    )
}