import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Percent, Truck, Shield, Headphones } from 'lucide-react';
import { productsApi, categoriesApi, adminApi } from '../lib/api';
import { Product, Category } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCardSkeleton } from '../components/common/LoadingSpinner';

// Normalize product for backward compat
function normalizeProduct(p: any): Product {
  return {
    ...p,
    discount_price: p.discountPrice ?? p.discount_price ?? null,
    reviews_count: p.reviewsCount ?? p.reviews_count ?? 0,
    is_active: p.isActive ?? p.is_active ?? true,
    category_id: p.categoryId ?? p.category_id,
    images: p.images || [],
    category: p.category ? {
      ...p.category,
      image_url: p.category.imageUrl || p.category.image_url,
    } : undefined,
  };
}

const defaultHeroImages = [
  'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/60639/gift-heart-box-valentine-60639.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>(defaultHeroImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, featuredRes, dealsRes, configRes] = await Promise.all([
          categoriesApi.getAll({ limit: '5' }),
          productsApi.getAll({ sort: 'rating', limit: '8' }),
          productsApi.getAll({ deals: 'true', limit: '8' }),
          adminApi.getConfig().catch(() => ({ data: null })),
        ]);

        if (categoriesRes.data) {
          setCategories(categoriesRes.data.map((c: any) => ({
            ...c,
            image_url: c.imageUrl || c.image_url,
          })));
        }
        if (featuredRes.data) setFeaturedProducts(featuredRes.data.map(normalizeProduct));
        if (dealsRes.data) setDealsProducts(dealsRes.data.map(normalizeProduct));
        if (configRes && configRes.data && configRes.data.bannerImages) {
          setHeroImages(configRes.data.bannerImages);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹500' },
    { icon: Shield, title: 'Secure Payment', desc: '100% secure transactions' },
    { icon: Headphones, title: '24/7 Support', desc: 'We are here to help' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages[0]}
            alt="Hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-lg">
            <span className="inline-block px-4 py-1 bg-blue-600 text-sm font-medium rounded-full mb-4">
              New Arrivals
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Shop the Best <br />
              <span className="text-blue-400">Quality Products</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Discover amazing deals on electronics, fashion, home appliances, and more.
              Fast delivery and secure payments guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Shop Now
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products?category=Electronics"
                className="px-8 py-3 bg-white/10 backdrop-blur text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(feature => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
              <p className="text-gray-500 mt-1">Browse our wide range of categories</p>
            </div>
            <Link
              to="/products"
              className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group relative rounded-xl overflow-hidden h-40 bg-gray-100"
              >
                {(category.image_url || category.imageUrl) && (
                  <img
                    src={category.image_url || category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Percent className="w-8 h-8 text-red-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hot Deals</h2>
                <p className="text-gray-500">Limited time offers just for you</p>
              </div>
            </div>
            <Link
              to="/products?deals=true"
              className="text-red-600 font-medium hover:text-red-700 flex items-center gap-1"
            >
              View All Deals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : dealsProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Top Rated Products</h2>
                <p className="text-gray-500">Most loved by our customers</p>
              </div>
            </div>
            <Link
              to="/products?sort=rating"
              className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Get updates on new arrivals, exclusive deals, and special offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
