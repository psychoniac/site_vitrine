import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import {
    ShoppingBagIcon,
    TrashIcon,
    PlusIcon,
    MinusIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCartStore()
    const totalPrice = getTotalPrice()

    const handleCheckout = () => {
        alert('Commande simulée avec succès ! (Fonctionnalité de paiement à connecter selon tes besoins)')
        clearCart()
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-surface flex items-center justify-center text-slate-500 border border-slate-700">
                    <ShoppingBagIcon className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-100">Votre panier est vide</h1>
                    <p className="text-slate-400 text-sm">Découvrez nos références dans le catalogue et commencez vos achats.</p>
                </div>
                <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold hover:bg-brand-accentHover transition-all shadow-lg shadow-brand-accent/20 text-sm"
                >
                    Explorer le catalogue
                    <ArrowRightIcon className="w-5 h-5" />
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

            <div className="flex justify-between items-center border-b border-slate-700 pb-6">
                <h1 className="text-3xl font-bold text-slate-100">Mon Panier ({cart.length} articles)</h1>
                <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-rose-400 hover:underline flex items-center gap-1"
                >
                    <TrashIcon className="w-4 h-4" /> Vider le panier
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Liste des articles */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-brand-surface border border-slate-700 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md"
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="w-16 h-16 rounded-xl bg-brand-dark overflow-hidden shrink-0 border border-slate-700">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                                            <ShoppingBagIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-100">{item.name}</h3>
                                    <p className="text-xs text-slate-400">{item.category}</p>
                                    <div className="text-brand-accent font-bold mt-1 sm:hidden">{item.price} €</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                                <div className="hidden sm:block text-brand-accent font-extrabold">{item.price} €</div>

                                {/* Contrôles de quantité */}
                                <div className="flex items-center gap-2 bg-brand-dark px-3 py-1.5 rounded-xl border border-slate-700">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="text-slate-400 hover:text-slate-100 transition-colors"
                                    >
                                        <MinusIcon className="w-4 h-4" />
                                    </button>
                                    <span className="text-slate-100 font-bold px-2 text-sm">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="text-slate-400 hover:text-slate-100 transition-colors"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                                    title="Supprimer l'article"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Résumé de la commande */}
                <div className="bg-brand-surface border border-slate-700 rounded-2xl p-6 space-y-6 h-fit">
                    <h3 className="text-lg font-bold text-slate-100 border-b border-slate-700 pb-4">Résumé de la commande</h3>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-slate-400">
                            <span>Sous-total</span>
                            <span className="text-slate-100 font-semibold">{totalPrice.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Frais de livraison</span>
                            <span className="text-emerald-400 font-semibold">Gratuit</span>
                        </div>
                        <div className="border-t border-slate-700 pt-3 flex justify-between text-base font-bold text-slate-100">
                            <span>Total</span>
                            <span className="text-brand-accent text-xl">{totalPrice.toFixed(2)} €</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full py-3 rounded-xl bg-brand-accent text-brand-dark font-bold hover:bg-brand-accentHover transition-all shadow-lg shadow-brand-accent/20 text-sm flex items-center justify-center gap-2"
                    >
                        Passer la commande
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>

            </div>

        </div>
    )
}