'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, Share2, ShoppingBag } from 'lucide-react'
import { getProductById } from '@/lib/products'
import { useCart } from '@/hooks/useCart'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  rating: number
  reviews: number
  sizes: string[]
  colors: string[]
}

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
      <div className="container-custom py-12">
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-200 aspect-square rounded" />
            <div className="space-y-4">
              <div className="bg-primary-200 h-8 rounded w-3/4" />
              <div className="bg-primary-200 h-6 rounded w-1/2" />
              <div className="bg-primary-200 h-4 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-primary-600 text-lg">Sản phẩm không tìm thấy</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-primary-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-primary-500 mb-2">{product.category.toUpperCase()}</p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < product.rating ? 'text-yellow-500 text-xl' : 'text-gray-300 text-xl'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-primary-600">({product.reviews} đánh giá)</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-primary-900">
            {product.price.toLocaleString('vi-VN')} VND
          </div>

          {/* Description */}
          <p className="text-primary-600 leading-relaxed">{product.description}</p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-3">Màu Sắc:</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedColor === color
                        ? 'bg-primary-700 text-white'
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
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
              <label className="block text-sm font-semibold mb-3">Kích Cỡ:</label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedSize === size
                        ? 'bg-primary-700 text-white'
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
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
            <label className="block text-sm font-semibold mb-3">Số Lượng:</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border border-primary-200 rounded hover:bg-primary-50"
              >
                −
              </button>
              <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 border border-primary-200 rounded hover:bg-primary-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Thêm Vào Giỏ
            </button>
            <button className="p-3 border border-primary-200 rounded-lg hover:bg-primary-50 transition">
              <Heart size={20} />
            </button>
            <button className="p-3 border border-primary-200 rounded-lg hover:bg-primary-50 transition">
              <Share2 size={20} />
            </button>
          </div>

          {/* Info */}
          <div className="border-t border-primary-200 pt-6 space-y-3 text-sm text-primary-600">
            <p>✓ Chất lượng cao cấp, 100% chính hãng</p>
            <p>✓ Giao hàng miễn phí cho đơn từ 2,000,000 VND</p>
            <p>✓ Hoàn tiền 100% nếu không hài lòng</p>
            <p>✓ Hỗ trợ khách hàng 24/7</p>
          </div>
        </div>
      </div>
    </div>
  )
}
