'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, Share2, ShoppingBag } from 'lucide-react'
import { getProductById } from '@/lib/products'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types/product'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(params.id)
        setProduct(data || null)
        if (data) {
          if (data.sizes.length > 0) setSelectedSize(data.sizes[0])
          setSelectedColor(data.colors[0])
        }
      } catch (error) {
        console.error('Failed to load product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        size: selectedSize || undefined,
        color: selectedColor || 'Default',
      })
      alert('Đã thêm vào giỏ hàng!')
    }
  }

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-noir-800 aspect-[3/4]" />
          <div className="space-y-4">
            <div className="bg-noir-800 h-8 w-3/4" />
            <div className="bg-noir-800 h-6 w-1/2" />
            <div className="bg-noir-800 h-4" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-noir-400 text-lg">Sản phẩm không tìm thấy</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-noir-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <p className="eyebrow mb-3">{product.subcategory || product.category}</p>
            <h1 className="text-4xl mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < product.rating ? 'text-gold' : 'text-noir-700'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-noir-400 text-sm">({product.reviews} đánh giá)</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-2xl font-medium text-white">
            {product.price.toLocaleString('vi-VN')} ₫
          </div>

          {/* Description */}
          <p className="text-noir-300 leading-relaxed">{product.description}</p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <h4 className="mb-4 text-noir-400">Màu Sắc</h4>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm border transition ${
                      selectedColor === color
                        ? 'bg-gold text-noir-950 border-gold'
                        : 'border-white/20 text-white hover:border-gold hover:text-gold'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div>
              <h4 className="mb-4 text-noir-400">Kích Cỡ</h4>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm border transition ${
                      selectedSize === size
                        ? 'bg-gold text-noir-950 border-gold'
                        : 'border-white/20 text-white hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h4 className="mb-4 text-noir-400">Số Lượng</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-white/20 text-white hover:border-gold hover:text-gold transition"
              >
                −
              </button>
              <span className="text-lg w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-white/20 text-white hover:border-gold hover:text-gold transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              Thêm Vào Giỏ
            </button>
            <button className="p-3 border border-white/20 text-white hover:border-gold hover:text-gold transition">
              <Heart size={18} strokeWidth={1.5} />
            </button>
            <button className="p-3 border border-white/20 text-white hover:border-gold hover:text-gold transition">
              <Share2 size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Info */}
          <div className="border-t border-white/10 pt-6 space-y-2 text-sm text-noir-400">
            <p>— Chất lượng cao cấp, 100% chính hãng</p>
            <p>— Giao hàng miễn phí cho đơn từ 2.000.000 ₫</p>
            <p>— Hoàn tiền 100% nếu không hài lòng</p>
            <p>— Hỗ trợ khách hàng 24/7</p>
          </div>
        </div>
      </div>
    </div>
  )
}
