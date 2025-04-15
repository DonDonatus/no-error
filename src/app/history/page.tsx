// pages/order-history.js
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrderHistory } from '@/components/OrderHistoryContext';


export default function OrderHistory() {
  const [activeOrder, setActiveOrder] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  const orders = [
    {
      id: 'ABCD1294',
      date: '19/05/2023',
      status: 'In progress',
      price: '€489.00',
      product: {
        name: 'Army black suit',
        size: 'EU 52',
        description: 'Suit for Portuguese wedding',
        image: '/images/black-suit.jpg',
        materials: ['Wool', 'Polyester'],
        care: ['Dry clean only', 'Iron on low heat'],
        delivery: {
          tracking: 'DHL4587236598',
          estimatedDelivery: '26/05/2023',
          progress: 65
        }
      }
    },
    {
      id: 'EFGH5678',
      date: '12/04/2023',
      status: 'Completed',
      price: '€249.00',
      product: {
        name: 'Navy blue blazer',
        size: 'EU 50',
        description: 'Classic single-breasted blazer',
        image: '/images/navy-blazer.jpg',
        materials: ['Cotton', 'Elastane'],
        care: ['Dry clean only', 'Do not bleach'],
        delivery: {
          tracking: 'DHL3387236598',
          actualDelivery: '21/05/2023'
        }
      }
    },
    {
      id: 'IJKL9012',
      date: '05/03/2023',
      status: 'Completed',
      price: '€129.00',
      product: {
        name: 'White dress shirt',
        size: 'EU 40',
        description: 'Premium cotton formal shirt',
        image: '/images/white-shirt.jpg',
        materials: ['Cotton', 'Linen'],
        care: ['Machine wash cold', 'Tumble dry low'],
        delivery: {
          tracking: 'DHL2187236598',
          actualDelivery: '20/05/2023'
        }
      }
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredOrders = orders.filter(order => {
    // Filter by tab
    if (activeTab === 'in-progress' && order.status !== 'In progress') return false;
    if (activeTab === 'completed' && order.status !== 'Completed') return false;
    
    // Filter by search
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchTermLower) ||
        order.product.name.toLowerCase().includes(searchTermLower) ||
        order.product.description.toLowerCase().includes(searchTermLower)
      );
    }
    
    return true;
  });

  // Order status variants for animation
  const orderStatusVariants = {
    inProgress: {
      color: '#2563EB',
      backgroundColor: '#DBEAFE',
      border: '1px solid #93C5FD'
    },
    completed: {
      color: '#16A34A',
      backgroundColor: '#DCFCE7',
      border: '1px solid #86EFAC'
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const slideDown = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { 
        height: { duration: 0.3 },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Order History | Bespoke Fashion</title>
        <meta name="description" content="Track and manage your bespoke fashion orders" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <motion.div 
          className="relative h-64 bg-gray-900 overflow-hidden"
          initial={{ height: 48 }}
          animate={{ height: 200 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0">
            <div className="h-full w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-90"></div>
          </div>
          
          <motion.div 
            className="relative h-full flex flex-col justify-center items-center text-white px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight">Your Style Journey</h1>
            <p className="mt-4 max-w-lg text-center text-gray-200 text-lg">
              Track, manage and review your bespoke fashion collection
            </p>
            <div className="mt-6 flex space-x-2">
              <div className="flex items-center space-x-1 text-gray-300 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Premium Shipping</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-500 self-center"></div>
              <div className="flex items-center space-x-1 text-gray-300 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span>Crafted With Care</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-500 self-center"></div>
              <div className="flex items-center space-x-1 text-gray-300 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white shadow-md backdrop-filter backdrop-blur-lg bg-opacity-80">
          <div className="container mx-auto px-4 py-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
                <div className="ml-4 flex gap-2">
                  <motion.button 
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
                      activeTab === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    All Orders
                  </motion.button>
                  <motion.button 
                    onClick={() => setActiveTab('in-progress')}
                    className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
                      activeTab === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    In Progress
                  </motion.button>
                  <motion.button 
                    onClick={() => setActiveTab('completed')}
                    className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
                      activeTab === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Completed
                  </motion.button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full md:w-64 transition-all duration-300"
                  />
                  <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                
                <motion.button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center justify-center text-gray-700 p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    backgroundColor: filterOpen ? '#F3F4F6' : '#FFFFFF',
                    rotate: filterOpen ? 180 : 0 
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div 
              className="bg-gray-50 border-b border-gray-200 overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideDown}
            >
              <div className="container mx-auto px-4 py-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <div className="flex items-center gap-2">
                      <input type="date" className="rounded-md border border-gray-300 p-2 text-sm w-full focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                      <span className="text-gray-500">to</span>
                      <input type="date" className="rounded-md border border-gray-300 p-2 text-sm w-full focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                    <select className="rounded-md border border-gray-300 p-2 text-sm w-full focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                      <option value="">All Products</option>
                      <option value="suits">Suits</option>
                      <option value="shirts">Shirts</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex items-center gap-2">
                      <input type="number" placeholder="Min" className="rounded-md border border-gray-300 p-2 text-sm w-full focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                      <span className="text-gray-500">-</span>
                      <input type="number" placeholder="Max" className="rounded-md border border-gray-300 p-2 text-sm w-full focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <motion.button 
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 mr-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset
                  </motion.button>
                  <motion.button 
                    className="px-4 py-2 bg-gray-900 rounded-md text-sm text-white hover:bg-gray-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <motion.div
                className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>  
          ) : filteredOrders.length === 0 ? (
            <motion.div 
              className="text-center py-16 bg-white rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M21 5L2 5"></path>
                  <path d="M9 18H15"></path>
                  <path d="M3 5L8 20H16L21 5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">No orders found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-12 text-left py-4 px-6 bg-gray-50 border-b border-gray-200">
                <div className="col-span-5 font-medium text-gray-700">Product</div>
                <div className="col-span-2 font-medium text-gray-700">Order No.</div>
                <div className="col-span-2 font-medium text-gray-700">Date</div>
                <div className="col-span-2 font-medium text-gray-700">Status</div>
                <div className="col-span-1 text-right font-medium text-gray-700">Price</div>
              </div>
              
              {filteredOrders.map((order, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className={`grid grid-cols-12 items-center py-4 px-6 border-b border-gray-100 ${
                      activeOrder === index ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
                    onClick={() => setActiveOrder(activeOrder === index ? null : index)}
                  >
                    <div className="col-span-5">
                      <div className="flex items-center">
                        <div className="w-16 h-20 relative mr-4 overflow-hidden rounded-md shadow-sm flex-shrink-0">
                          <motion.div 
                            className="w-full h-full bg-gray-100 rounded flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Image 
                              src="/api/placeholder/64/80" 
                              alt={order.product.name}
                              width={64}
                              height={80}
                              className="object-cover"
                            />
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{order.product.name}</h3>
                          <p className="text-sm text-gray-600">Size: {order.product.size}</p>
                          <p className="text-sm text-gray-600">{order.product.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-gray-900 font-mono">{order.id}</div>
                    <div className="col-span-2 text-gray-900">{order.date}</div>
                    
                    <div className="col-span-2">
                      <motion.span 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        animate={order.status === 'Completed' ? 'completed' : 'inProgress'}
                        variants={orderStatusVariants}
                      >
                        <span 
                          className={`w-2 h-2 rounded-full mr-2 ${
                            order.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                        ></span>
                        {order.status}
                      </motion.span>
                    </div>
                    
                    <div className="col-span-1 text-right font-medium text-gray-900">
                      {order.price}
                    </div>
                  </div>
                  
                  {/* Expanded Order Details */}
                  <AnimatePresence>
                    {activeOrder === index && (
                      <motion.div 
                        className="col-span-12 bg-gray-50 p-6 border-b border-gray-200"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={slideDown}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Product Details</h4>
                            <dl className="grid grid-cols-1 gap-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <dt className="text-sm font-medium text-gray-500">Material</dt>
                                <dd className="text-sm text-gray-900 col-span-2">
                                  <div className="flex flex-wrap gap-2">
                                    {order.product.materials.map((material, i) => (
                                      <span key={i} className="px-2 py-1 bg-gray-100 rounded-md text-gray-800 text-xs">
                                        {material}
                                      </span>
                                    ))}
                                  </div>
                                </dd>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <dt className="text-sm font-medium text-gray-500">Care</dt>
                                <dd className="text-sm text-gray-900 col-span-2">
                                  <ul className="space-y-2">
                                    {order.product.care.map((item, i) => (
                                      <li key={i} className="flex items-start">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-600 mt-0.5">
                                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </dd>
                              </div>
                            </dl>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h4>
                            <dl className="grid grid-cols-1 gap-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <dt className="text-sm font-medium text-gray-500">Tracking</dt>
                                <dd className="text-sm text-gray-900 col-span-2">
                                  <div className="flex items-center">
                                    <span className="font-mono bg-gray-100 px-3 py-1 rounded-md">{order.product.delivery.tracking}</span>
                                    <motion.button 
                                      className="ml-2 text-blue-600 hover:text-blue-800"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                      </svg>
                                    </motion.button>
                                  </div>
                                </dd>
                              </div>
                              
                              {order.status === 'In progress' ? (
                                <>
                                  <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-sm font-medium text-gray-500">Est. Delivery</dt>
                                    <dd className="text-sm text-gray-900 col-span-2">
                                      <div className="flex items-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500">
                                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                          <line x1="16" y1="2" x2="16" y2="6"></line>
                                          <line x1="8" y1="2" x2="8" y2="6"></line>
                                          <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        {order.product.delivery.estimatedDelivery}
                                      </div>
                                    </dd>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-sm font-medium text-gray-500">Progress</dt>
                                    <dd className="text-sm text-gray-900 col-span-2">
                                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                        <motion.div 
                                          className="bg-blue-600 h-2.5 rounded-full" 
                                          initial={{ width: 0 }}
                                          animate={{ width: `${order.product.delivery.progress}%` }}
                                          transition={{ duration: 1, delay: 0.2 }}
                                        ></motion.div>
                                      </div>
                                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <div className="flex flex-col items-center">
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={order.product.delivery.progress >= 1 ? "#2563EB" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                          </svg>
                                          <span className={order.product.delivery.progress >= 1 ? "text-blue-600 font-medium" : ""}>Ordered</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={order.product.delivery.progress >= 40 ? "#2563EB" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                            <path d="M7 15h0M12 15h0M17 15h0"></path>
                                          </svg>
                                          <span className={order.product.delivery.progress >= 40 ? "text-blue-600 font-medium" : ""}>Processing</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={order.product.delivery.progress >= 70 ? "#2563EB" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                          </svg>
                                          <span className={order.product.delivery.progress >= 70 ? "text-blue-600 font-medium" : ""}>Shipped</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={order.product.delivery.progress >= 100 ? "#2563EB" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                          </svg>
                                          <span className={order.product.delivery.progress >= 100 ? "text-blue-600 font-medium" : ""}>Delivered</span>
                                        </div>
                                      </div>
                                    </dd>
                                  </div>
                                </>
                              ) : (
                                <div className="grid grid-cols-3 gap-4">
                                  <dt className="text-sm font-medium text-gray-500">Delivered On</dt>
                                  <dd className="text-sm text-gray-900 col-span-2">
                                    <div className="flex items-center">
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                      </svg>
                                      {order.product.delivery.actualDelivery}
                                    </div>
                                  </dd>
                                </div>
                              )}
                              
                              <div className="mt-6 flex gap-3">
                                {order.status === 'In progress' ? (
                                  <motion.button 
                                    className="px-4 py-2.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center shadow-md"
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    Track Order
                                  </motion.button>
                                ) : (
                                  <motion.button 
                                    className="px-4 py-2.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors duration-200 flex items-center shadow-md"
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                      <polyline points="7 10 12 15 17 10"></polyline>
                                      <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Download Invoice
                                  </motion.button>
                                )}
                                
                                <motion.button 
                                  className="px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center shadow-sm"
                                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                  </svg>
                                  Contact Support
                                </motion.button>
                                
                                <motion.button 
                                  className="px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center shadow-sm"
                                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                    <polyline points="16 6 12 2 8 6"></polyline>
                                    <line x1="12" y1="2" x2="12" y2="15"></line>
                                  </svg>
                                  Reorder
                                </motion.button>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              
              {/* Pagination */}
              {filteredOrders.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <motion.a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#"
                      aria-current="page"
                      className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      1
                    </motion.a>
                    <motion.a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      2
                    </motion.a>
                    <motion.a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      3
                    </motion.a>
                    <motion.span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </motion.span>
                    <motion.a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      8
                    </motion.a>
                    <motion.a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </nav>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Back to Top Button */}
          <motion.button
            className="fixed bottom-8 right-8 p-3 rounded-full bg-gray-900 text-white shadow-lg z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </motion.button>
        </div>
      </div>
    </>
  );
}