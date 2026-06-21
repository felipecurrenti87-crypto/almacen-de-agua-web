"use client";

import { getReviewsByProduct, getAverageRating, getRelativeTime } from "@/data/reviews";
import { motion } from "framer-motion";

export default function ProductReviews({ productId }: { productId: string }) {
  const reviews = getReviewsByProduct(productId);
  const avg = getAverageRating(productId);

  if (reviews.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="font-heading font-bold text-azul text-lg">Opiniones de clientes</h3>
        <div className="flex items-center gap-1.5 bg-[#EEF5F8] px-3 py-1 rounded-full border border-[#BBD6E1]/60">
          <span className="text-yellow-400 text-sm">&#9733;</span>
          <span className="text-azul font-heading font-bold text-sm">{avg.toFixed(1)}</span>
          <span className="text-[#52647A] text-xs">({reviews.length})</span>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-4 border border-[#BBD6E1]/50 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-celeste-neon/15 flex items-center justify-center text-celeste-neon font-heading font-bold text-xs">
                  {review.autor[0]}
                </div>
                <span className="font-heading font-semibold text-azul text-sm">{review.autor}</span>
              </div>
              <span className="text-[#52647A] text-xs">{getRelativeTime(review.fecha)}</span>
            </div>
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className={`text-xs ${j < review.rating ? "text-yellow-400" : "text-[#BBD6E1]"}`}>
                  &#9733;
                </span>
              ))}
            </div>
            <p className="text-[#52647A] text-sm leading-relaxed">
              {review.texto}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Compact star rating for product cards */
export function ProductRatingBadge({ productId }: { productId: string }) {
  const reviews = getReviewsByProduct(productId);
  const avg = getAverageRating(productId);

  if (reviews.length === 0) return null;

  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="text-yellow-400">&#9733;</span>
      <span className="text-azul font-semibold">{avg.toFixed(1)}</span>
      <span className="text-gris-suave">({reviews.length})</span>
    </div>
  );
}
