import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import {
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    StarIcon,
    PhotoIcon,
    FunnelIcon
} from '@heroicons/react/24/outline'
import { useCartStore } from '../store/useCartStore'

export default function Catalog() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('Tous')
    const [searchQuery, setSearchQuery] = useState('')
    const addToCart = useCartStore((state) => state.addToCart)


    // Catégories disponibles pour le filtre
    const categories = ['Tous', 'Fleurs Premium', 'Huiles & Extractions', 'Infusions', 'Résines']


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (error) throw error
                setProducts(data || [])
            } catch (error) {
                console.error('Erreur lors du chargement du catalogue :', error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const handleAddToCart = (product) => {
        addToCart(product)
        // Petit retour visuel rapide (tu pourras remplacer par un toast si tu veux)
    }

    // Filtrage des produits selon la catégorie et la barre de recherche
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })



    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

            {/* En-tête de la page */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
                    Notre Catalogue & <span className="text-brand-accent">Tarifs</span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base">
                    Explorez notre sélection rigoureuse de produits botaniques testés et certifiés. Qualité premium garantie.
                </p>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-brand-surface p-4 sm:p-6 rounded-2xl border border-slate-700">

                {/* Barre de recherche */}
                <div className="relative w-full md:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                        <MagnifyingGlassIcon className="w-5 h-5" />
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un produit..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                    />
                </div>

                {/* Filtres par catégorie */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                    <FunnelIcon className="w-5 h-5 text-slate-400 shrink-0 hidden sm:block" />
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === category
                                ? 'bg-brand-accent text-brand-dark shadow-lg shadow-brand-accent/20'
                                : 'bg-brand-dark text-slate-300 hover:bg-slate-800 border border-slate-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

            </div>

            {/* Grille des produits */}
            {loading ? (
                <div className="text-center py-20 text-slate-400">Chargement des pépites du catalogue...</div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-brand-surface rounded-2xl border border-slate-700 space-y-3">
                    <p className="text-slate-300 font-medium">Aucun produit ne correspond à votre recherche.</p>
                    <button
                        onClick={() => { setSelectedCategory('Tous'); setSearchQuery(''); }}
                        className="text-brand-accent text-sm font-semibold hover:underline"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-brand-surface/50 border border-slate-700/80 rounded-2xl overflow-hidden hover:border-brand-accent/50 transition-all flex flex-col group shadow-lg"
                        >
                            {/* Image & Badge */}
                            <div className="relative h-52 overflow-hidden bg-brand-dark">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                                        <PhotoIcon className="w-12 h-12" />
                                    </div>
                                )}
                                {product.badge && (
                                    <span className="absolute top-3 left-3 px-3 py-1 bg-brand-dark/80 backdrop-blur-md text-brand-accent text-xs font-bold rounded-full border border-slate-700">
                                        {product.badge}
                                    </span>
                                )}
                            </div>

                            {/* Contenu de la carte */}
                            <div className="p-6 flex flex-col flex-grow space-y-4">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{product.category}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                                        }`}>
                                        {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-100">{product.name}</h3>

                                {product.description && (
                                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/60">
                                    <span className="text-xl font-extrabold text-brand-accent">{product.price} €</span>
                                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                                        <StarIcon className="w-4 h-4 fill-amber-400" />
                                        <span>4.9</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.stock <= 0}
                                    className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-dark hover:bg-brand-accent hover:text-brand-dark text-slate-200 text-sm font-bold transition-all border border-slate-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    <ShoppingBagIcon className="w-5 h-5" />
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}