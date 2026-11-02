import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import {
    PlusIcon,
    TrashIcon,
    ShieldCheckIcon,
    PhotoIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // État du formulaire d'ajout de produit
    const [formData, setFormData] = useState({
        name: '',
        category: 'Fleurs Premium',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        badge: 'Nouveau'
    })

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
            console.error('Erreur lors du chargement des produits :', error.message)
        } finally {
            setLoading(false)
        }
    }

    // Récupérer les produits depuis Supabase au chargement
    useEffect(() => {
        fetchProducts()
    }, [])



    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Ajouter un produit dans Supabase
    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([{
                    name: formData.name,
                    category: formData.category,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock, 10),
                    image_url: formData.image_url,
                    badge: formData.badge
                }])
                .select()

            if (error) throw error

            // Réinitialiser et fermer le modal
            setProducts([data[0], ...products])
            setFormData({
                name: '',
                category: 'Fleurs Premium',
                description: '',
                price: '',
                stock: '',
                image_url: '',
                badge: 'Nouveau'
            })
            setIsModalOpen(false)
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit :', error.message)
            alert('Erreur lors de l\'ajout du produit.')
        }
    }

    // Supprimer un produit de Supabase
    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)

            if (error) throw error

            setProducts(products.filter(p => p.id !== id))
        } catch (error) {
            console.error('Erreur lors de la suppression :', error.message)
            alert('Impossible de supprimer le produit.')
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

            {/* En-tête du Dashboard */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-surface p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand-dark rounded-xl text-brand-accent">
                        <ShieldCheckIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-100">Dashboard Administrateur</h1>
                        <p className="text-slate-400 text-sm">Gérez les stocks, ajoutez et supprimez vos références CBD.</p>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-accent text-brand-dark font-bold hover:bg-brand-accentHover transition-all shadow-lg shadow-brand-accent/20"
                >
                    <PlusIcon className="w-5 h-5" />
                    Ajouter un produit
                </button>
            </div>

            {/* Modal d'ajout de produit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-brand-surface border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                            <h3 className="text-xl font-bold text-slate-100">Ajouter un nouveau produit</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-100 font-bold text-lg"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Nom du produit</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="ex: Fleur CBD Amnesia Haze"
                                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Catégorie</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                                    >
                                        <option value="Fleurs Premium">Fleurs Premium</option>
                                        <option value="Huiles & Extractions">Huiles & Extractions</option>
                                        <option value="Infusions">Infusions</option>
                                        <option value="Résines">Résines</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Badge</label>
                                    <input
                                        type="text"
                                        name="badge"
                                        value={formData.badge}
                                        onChange={handleChange}
                                        placeholder="ex: Populaire, Bio, Promo"
                                        className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Prix (€)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        required
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="9.90"
                                        className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        required
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="50"
                                        className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">URL de l'image</label>
                                <input
                                    type="url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description détaillée du produit..."
                                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-brand-dark text-slate-300 font-medium hover:text-slate-100 text-sm"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-brand-accent text-brand-dark font-bold hover:bg-brand-accentHover text-sm"
                                >
                                    Enregistrer le produit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Liste des produits existants */}
            <div className="bg-brand-surface border border-slate-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-100">Inventaire des produits ({products.length})</h2>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-slate-400">Chargement des produits...</div>
                ) : products.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">Aucun produit dans la base de données. Ajoute ton premier produit !</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400 bg-brand-dark/50">
                                    <th className="p-4">Produit</th>
                                    <th className="p-4">Catégorie</th>
                                    <th className="p-4">Prix</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50 text-sm">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-brand-dark overflow-hidden shrink-0 border border-slate-700">
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                                                        <PhotoIcon className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-100">{product.name}</div>
                                                <div className="text-xs text-slate-400">{product.badge || 'Standard'}</div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-300">{product.category}</td>
                                        <td className="p-4 font-semibold text-brand-accent">{product.price} €</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                                }`}>
                                                {product.stock} en stock
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                                                title="Supprimer le produit"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}