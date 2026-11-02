import { Link } from 'react-router-dom'
import { BuildingStorefrontIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Footer() {
    return (
        <footer className="bg-brand-dark border-t border-brand-surface text-slate-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Colonne 1 : À propos */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-bold text-slate-100">
                            <BuildingStorefrontIcon className="w-6 h-6 text-brand-accent" />
                            <span>GreenVibe Shop</span>
                        </div>
                        <p className="text-sm">
                            Votre référence bien-être et produits botaniques de qualité supérieure à La Rochelle. Qualité certifiée et service sur-mesure.
                        </p>
                    </div>

                    {/* Colonne 2 : Liens rapides */}
                    <div>
                        <h4 className="text-slate-200 font-semibold mb-4">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-brand-accent transition-colors">Accueil</Link></li>
                            <li><Link to="/catalog" className="hover:text-brand-accent transition-colors">Catalogue & Tarifs</Link></li>
                            <li><Link to="/cart" className="hover:text-brand-accent transition-colors">Mon Panier</Link></li>
                            <li><Link to="/profile" className="hover:text-brand-accent transition-colors">Mon Compte</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Contact */}
                    <div>
                        <h4 className="text-slate-200 font-semibold mb-4">Contact & Boutique</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-brand-accent shrink-0" />
                                <span>12 Rue du Palais, 17000 La Rochelle</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <PhoneIcon className="w-5 h-5 text-brand-accent shrink-0" />
                                <span>05 46 00 00 00</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <EnvelopeIcon className="w-5 h-5 text-brand-accent shrink-0" />
                                <span>contact@greenvibeshop.fr</span>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 : Mention Légale / Avertissement */}
                    <div>
                        <h4 className="text-slate-200 font-semibold mb-4">Informations</h4>
                        <p className="text-xs leading-relaxed">
                            Vente interdite aux mineurs. Les produits présentés respectent la législation en vigueur avec un taux de THC inférieur à 0,3%. Ne pas fumer.
                        </p>
                    </div>

                </div>

                <div className="border-t border-brand-surface pt-6 text-center text-xs text-slate-500">
                    <p>© 2026 GreenVibe Shop. Réalisé avec React, Tailwind CSS & Supabase dans le cadre d'un portfolio.</p>
                </div>
            </div>
        </footer>
    )
}