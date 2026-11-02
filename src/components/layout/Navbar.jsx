import { Link } from 'react-router-dom'
import {
    HomeIcon,
    BuildingStorefrontIcon,
    ShoppingBagIcon,
    UserIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { useCartStore } from '../../store/useCartStore'

export default function Navbar() {
    const totalItems = useCartStore((state) => state.getTotalItems())

    return (
        <header className="bg-brand-dark border-b border-brand-surface sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-100">
                        <span className="p-2 bg-brand-surface rounded-lg text-brand-accent">
                            <BuildingStorefrontIcon className="w-6 h-6" />
                        </span>
                        <span>GreenVibe <span className="text-brand-accent">Shop</span></span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                        <Link to="/" className="flex items-center gap-1.5 hover:text-brand-accent transition-colors">
                            <HomeIcon className="w-5 h-5" />
                            Accueil
                        </Link>
                        <Link to="/catalog" className="flex items-center gap-1.5 hover:text-brand-accent transition-colors">
                            <BuildingStorefrontIcon className="w-5 h-5" />
                            Catalogue
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/cart"
                            className="relative p-2 rounded-lg bg-brand-surface text-slate-200 hover:text-brand-accent transition-colors"
                            title="Mon panier"
                        >
                            <ShoppingBagIcon className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/profile"
                            className="p-2 rounded-lg bg-brand-surface text-slate-200 hover:text-brand-accent transition-colors"
                            title="Mon profil"
                        >
                            <UserIcon className="w-6 h-6" />
                        </Link>

                        <Link
                            to="/admin"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-surface border border-brand-accent/30 text-brand-accent text-sm font-medium hover:bg-brand-accent hover:text-brand-dark transition-all"
                            title="Administration"
                        >
                            <ShieldCheckIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Admin</span>
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    )
}