import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import {
    XMarkIcon,
    StarIcon,
    ShoppingBagIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
    const { user } = useAuth()
    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState(true)

    // Formulaire d'avis
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoadingReviews(true)
                const { data, error } = await supabase
                    .from('reviews')
                    .select(`
            *,
            profiles:client_id (full_name)
          `)
                    .eq('product_id', product.id)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setReviews(data || [])
            } catch (error) {
                console.error('Erreur lors du chargement des avis :', error.message)
            } finally {
                setLoadingReviews(false)
            }
        }

        fetchReviews()
    }, [product.id])

    // Soumettre un avis
    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        if (!user) return

        setSubmitting(true)
        setErrorMsg('')

        try {
            const { data, error } = await supabase
                .from('reviews')
                .insert([{
                    product_id: product.id,
                    client_id: user.id,
                    rating,
                    comment
                }])
                .select(`
          *,
          profiles:client_id (full_name)
        `)

            if (error) throw error

            setReviews([data[0], ...reviews])
            setComment('')
            setRating(5)
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'avis :', error.message)
            if (error.code === '23505') {
                setErrorMsg('Vous avez déjà posté un avis sur ce produit.')
            } else {
                setErrorMsg('Impossible de publier l\'avis.')
            }
        } finally {
            setSubmitting(false)
        }
    }

    // Calculer la moyenne des notes
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : '4.9'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-brand-surface border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">

                {/* Bouton fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-xl bg-brand-dark text-slate-400 hover:text-slate-100 transition-colors border border-slate-700"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>

                {/* En-tête produit */}
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div className="w-40 h-40 rounded-2xl bg-brand-dark overflow-hidden shrink-0 border border-slate-700">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <ShoppingBagIcon className="w-10 h-10" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-3 flex-grow text-center sm:text-left">
                        <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">{product.category}</span>
                        <h2 className="text-2xl font-bold text-slate-100">{product.name}</h2>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <StarSolidIcon key={i} className="w-4 h-4" />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-slate-200">{averageRating}</span>
                            <span className="text-xs text-slate-400">({reviews.length} avis)</span>
                        </div>
                        <div className="text-2xl font-extrabold text-brand-accent">{product.price} €</div>
                    </div>
                </div>

                {product.description && (
                    <div className="bg-brand-dark/50 p-4 rounded-2xl border border-slate-700/60 text-slate-300 text-sm leading-relaxed">
                        {product.description}
                    </div>
                )}

                <button
                    onClick={() => { onAddToCart(product); onClose(); }}
                    disabled={product.stock <= 0}
                    className="w-full py-3 rounded-xl bg-brand-accent text-brand-dark font-bold hover:bg-brand-accentHover transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 disabled:opacity-50 text-sm"
                >
                    <ShoppingBagIcon className="w-5 h-5" />
                    Ajouter au panier
                </button>

                {/* Section Avis */}
                <div className="border-t border-slate-700 pt-6 space-y-6">
                    <div className="flex items-center gap-2">
                        <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-brand-accent" />
                        <h3 className="text-lg font-bold text-slate-100">Avis clients</h3>
                    </div>

                    {/* Formulaire d'ajout d'avis */}
                    {user ? (
                        <form onSubmit={handleReviewSubmit} className="bg-brand-dark/60 p-4 sm:p-6 rounded-2xl border border-slate-700 space-y-4">
                            <h4 className="text-sm font-semibold text-slate-200">Laisser un commentaire et une note</h4>

                            {errorMsg && (
                                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-medium border border-rose-500/30">
                                    {errorMsg}
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 font-semibold">Note :</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="text-amber-400 focus:outline-none"
                                        >
                                            {star <= rating ? (
                                                <StarSolidIcon className="w-6 h-6" />
                                            ) : (
                                                <StarIcon className="w-6 h-6 text-slate-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <textarea
                                rows="3"
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Qu'avez-vous pensé de ce produit ?"
                                className="w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-slate-700 text-slate-100 focus:border-brand-accent outline-none text-sm resize-none"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2 rounded-xl bg-brand-surface hover:bg-brand-accent hover:text-brand-dark text-slate-200 font-bold text-xs transition-all border border-slate-700 disabled:opacity-50"
                            >
                                {submitting ? 'Publication...' : 'Publier mon avis'}
                            </button>
                        </form>
                    ) : (
                        <div className="p-4 rounded-2xl bg-brand-dark/40 border border-slate-700 text-center text-xs text-slate-400">
                            <span className="text-slate-200 font-semibold">Connectez-vous</span> dans votre espace profil pour laisser un avis sur ce produit.
                        </div>
                    )}

                    {/* Liste des avis */}
                    {loadingReviews ? (
                        <div className="text-center py-6 text-xs text-slate-400">Chargement des avis...</div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-400">Aucun avis pour l'instant. Soyez le premier à donner le vôtre !</div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-brand-dark/40 p-4 rounded-2xl border border-slate-700 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg bg-brand-surface flex items-center justify-center text-brand-accent text-xs font-bold border border-slate-700">
                                                <UserIcon className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-200">
                                                {review.profiles?.full_name || 'Client GreenVibe'}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-amber-400">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <StarSolidIcon key={i} className="w-3.5 h-3.5" />
                                            ))}
                                        </div>
                                    </div>
                                    {review.comment && (
                                        <p className="text-slate-300 text-xs leading-relaxed pl-9">
                                            {review.comment}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}