import { Link } from 'react-router-dom'
import {
    ArrowRightIcon,
    ShieldCheckIcon,
    TruckIcon,
    SparklesIcon,
    StarIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline'

export default function Home() {
    // Données factices pour les produits phares (en attendant la BDD Supabase)
    const featuredProducts = [
        {
            id: 1,
            name: 'Fleur CBD OG Kush',
            category: 'Fleurs Premium',
            price: '9.90 € /g',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
            badge: 'Populaire'
        },
        {
            id: 2,
            name: 'Huile CBD Full Spectrum 15%',
            category: 'Huiles & Extractions',
            price: '49.00 €',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
            badge: 'Bio'
        },
        {
            id: 3,
            name: 'Infusion Botanique Zen & Sommeil',
            category: 'Infusions',
            price: '14.50 €',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
            badge: 'Nouveau'
        }
    ]

    return (
        <div className="space-y-16 pb-16">

            {/* --- HERO SECTION --- */}
            <section className="relative bg-gradient-to-b from-brand-surface to-brand-dark py-20 border-b border-brand-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-accent/30 text-brand-accent text-xs font-semibold uppercase tracking-wider">
                        <SparklesIcon className="w-4 h-4" />
                        Qualité Certifiée & Terroir Naturel
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
                        L'excellence du CBD & du Bien-Être <br />
                        <span className="text-brand-accent">à La Rochelle</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-slate-400">
                        Découvrez notre sélection rigoureuse de fleurs, huiles et infusions aux arômes uniques. Cultivées dans le respect de l'environnement et conformes aux normes européennes.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Link
                            to="/catalog"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold hover:bg-brand-accentHover transition-all shadow-lg shadow-brand-accent/20"
                        >
                            Explorer le catalogue
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/profile"
                            className="px-6 py-3 rounded-xl bg-brand-surface border border-slate-700 text-slate-200 font-medium hover:border-brand-accent transition-all"
                        >
                            Créer mon compte
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- AVANTAGES --- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-brand-surface/50 border border-brand-surface flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-brand-surface text-brand-accent">
                            <ShieldCheckIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-slate-100 font-semibold mb-1">100% Légal & Certifié</h3>
                            <p className="text-sm text-slate-400">Taux de THC inférieur à 0,3% contrôlé en laboratoire indépendant.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-brand-surface/50 border border-brand-surface flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-brand-surface text-brand-accent">
                            <TruckIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-slate-100 font-semibold mb-1">Livraison Discrète</h3>
                            <p className="text-sm text-slate-400">Expédition rapide et neutre directement chez vous ou en point relais.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-brand-surface/50 border border-brand-surface flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-brand-surface text-brand-accent">
                            <SparklesIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-slate-100 font-semibold mb-1">Conseil Sur-Mesure</h3>
                            <p className="text-sm text-slate-400">Une équipe passionnée à votre écoute pour vous guider selon vos besoins.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRODUITS PHARES --- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Nos Produits Phares</h2>
                        <p className="text-slate-400 mt-1">Les incontournables plébiscités par notre communauté.</p>
                    </div>
                    <Link to="/catalog" className="text-brand-accent hover:underline flex items-center gap-1 font-medium text-sm">
                        Voir tout le catalogue <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="bg-brand-surface/40 border border-brand-surface rounded-2xl overflow-hidden hover:border-brand-accent/50 transition-all flex flex-col group">
                            <div className="relative h-48 overflow-hidden bg-brand-surface">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-3 left-3 px-3 py-1 bg-brand-dark/80 backdrop-blur-md text-brand-accent text-xs font-bold rounded-full">
                                    {product.badge}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow space-y-4">
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{product.category}</div>
                                <h3 className="text-lg font-bold text-slate-100">{product.name}</h3>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-surface">
                                    <span className="text-lg font-bold text-brand-accent">{product.price}</span>
                                    <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                                        <StarIcon className="w-4 h-4 fill-amber-400" />
                                        <span>{product.rating}</span>
                                    </div>
                                </div>

                                <button className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-surface hover:bg-brand-accent hover:text-brand-dark text-slate-200 text-sm font-semibold transition-all">
                                    <ShoppingBagIcon className="w-5 h-5" />
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- BANNIÈRE SHOP PHYSIQUE --- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-gradient-to-r from-brand-surface to-slate-900 border border-brand-surface p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">Venez nous rendre visite</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Notre boutique physique à La Rochelle</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Située au cœur de La Rochelle, notre équipe vous accueille du mardi au samedi pour sentir, déguster et découvrir l'ensemble de nos références dans une ambiance chaleureuse.
                        </p>
                        <div className="text-slate-300 font-medium text-sm pt-2">
                            📍 12 Rue du Palais, 17000 La Rochelle
                        </div>
                    </div>
                    <Link
                        to="/catalog"
                        className="px-6 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold hover:bg-brand-accentHover transition-all shrink-0"
                    >
                        En savoir plus
                    </Link>
                </div>
            </section>

        </div>
    )
}