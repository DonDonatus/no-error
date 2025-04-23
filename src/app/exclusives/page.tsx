'use client';
// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './exclusive.module.css';
import Header from '@/components/Header';


// Define proper types for our gallery images
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  details: string[];
}


export default function Home() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);


  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "/images/greee.png",
      alt: "Fashion model",
      title: "Neon Collection",
      description: "Bold colors for the fashion-forward",
      details: [
        "Premium Italian fabric",
        "Hand-stitched details",
        "Limited edition",
        "Available in 3 colorways"
      ]
    },
    {
      id: 2,
      src: "/images/blue.jpg",
      alt: "Fashion model",
      title: "Blue Elegance",
      description: "Classic tones for everyday wear",
      details: [
        "100% organic cotton",
        "Tailored fit",
        "Wrinkle-resistant",
        "Machine washable"
      ]
    },
    {
      id: 3,
      src: "/images/hgray.jpg",
      alt: "Fashion model",
      title: "Urban Chic",
      description: "Modern styles for city living",
      details: [
        "Technical fabric blend",
        "Water-resistant finish",
        "Hidden pockets",
        "All-season wear"
      ]
    },
    {
      id: 4,
      src: "/images/pink.png",
      alt: "Fashion model",
      title: "Pastel Dreams",
      description: "Soft tones for delicate looks",
      details: [
        "Silk-cotton blend",
        "Hand-dyed fabric",
        "Delicate embroidery",
        "Dry clean only"
      ]
    },
    {
      id: 5,
      src: "/images/muh.jpg",
      alt: "Fashion model",
      title: "Monochrome",
      description: "Timeless black and white styles",
      details: [
        "Premium wool blend",
        "Structured shoulders",
        "Contrast stitching",
        "Professional finish"
      ]
    },
    {
      id: 6,
      src: "/images/cbrown.jpg",
      alt: "Fashion model",
      title: "Earth Tones",
      description: "Natural colors for organic style",
      details: [
        "Sustainable materials",
        "Vegetable-tanned leather accents",
        "Relaxed fit",
        "Biodegradable packaging"
      ]
    },
    {
      id: 7,
      src: "/images/live.png",
      alt: "Fashion model",
      title: "Casual Collection",
      description: "Looking bright and alive",
      details: [
        "Velvet and silk options",
        "Gold-accented details",
        "Evening wear",
        "Made-to-measure available"
      ]
    },
    {
      id: 8,
      src: "/images/menn.png",
      alt: "Fashion model",
      title: "Group Style",
      description: "Coordinated looks for any occasion",
      details: [
        "Matching sets available",
        "Group discounts",
        "Custom color palettes",
        "Bulk ordering"
      ]
    },
    {
      id: 9,
      src: "/images/tux2.png",
      alt: "Fashion model",
      title: "Formal Wear",
      description: "Sharp looks for special events",
      details: [
        "Black tie collection",
        "Satin lapel options",
        "Adjustable waist",
        "Complimentary alterations"
      ]
    },
    {
      id: 10,
      src: "/images/clean.jpg",
      alt: "Fashion model",
      title: "Minimalist",
      description: "Clean lines for refined taste",
      details: [
        "Japanese raw denim",
        "Hidden fastenings",
        "Unstructured shoulders",
        "Ethically sourced"
      ]
    }
  ];


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter submission
    alert(`Thank you for subscribing with ${email}`);
    setEmail('');
  };


  return (
    <>
      <Header />
      <div className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <Head>
          <title>Fashion Gallery</title>
          <meta name="description" content="Fashion gallery layout" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>


        {/* Main Container */}
        <div className="flex flex-col w-full">
          {/* Gallery Section */}
          <div className={styles.container}>
            <div className={styles.gallery}>
              {/* Top row */}
              {galleryImages.slice(0, 3).map((image, index) => (
                <div
                  key={image.id}
                  className={`${styles.box} ${index === 0 ? styles.neonGreen : index === 1 ? styles.pink : `${styles.neonGreen} ${styles.wideBox}`} group relative overflow-hidden`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-light tracking-wider mb-1 text-white">{image.title}</h3>
                    <p className="text-xs opacity-80 text-white">{image.description}</p>
                  </div>
                </div>
              ))}
             
              {/* Middle row */}
              {galleryImages.slice(3, 7).map((image, index) => (
                <div
                  key={image.id}
                  className={`${styles.box} ${
                    index === 0 ? `${styles.white} ${styles.tallBox}` :
                    index === 1 ? `${styles.pink} ${styles.tallBox}` :
                    index === 2 ? `${styles.white} ${styles.largeBox} ${styles.six}` :
                    `${styles.pink} ${styles.largeBox}`
                  } group relative overflow-hidden`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-light tracking-wider mb-1 text-white">{image.title}</h3>
                    <p className="text-xs opacity-80 text-white">{image.description}</p>
                  </div>
                </div>
              ))}
             
              {/* Bottom row */}
              {galleryImages.slice(7, 10).map((image, index) => (
                <div
                  key={image.id}
                  className={`${styles.box} ${
                    index === 0 ? `${styles.neonGreen} ${styles.wideBox}` :
                    index === 1 ? `${styles.neonGreen} ${styles.smallBox}` :
                    `${styles.pink} ${styles.smallBox}`
                  } group relative overflow-hidden`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-light tracking-wider mb-1 text-white">{image.title}</h3>
                    <p className="text-xs opacity-80 text-white">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


         
          {/* Newsletter Section */}
          <section className='pt-16'>
          <section className="py-24 px-4 bg-white text-center w-full">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-6 text-black">JOIN OUR WORLD</h2>
              <p className="text-gray-600 mb-10">
                Subscribe to receive exclusive previews, styling tips, and special offers
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent border border-gray-300 px-4 py-3 focus:outline-none focus:border-black text-black transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#08106c] text-white px-8 py-3 hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </section>
          </section>
        </div>
       
        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 z-10 text-black hover:text-gray-600"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
             
              <div className="grid md:grid-cols-2 gap-8 bg-white p-8">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-light tracking-wider mb-4 text-black">{selectedImage.title}</h2>
                  <p className="text-gray-600 mb-6 text-lg">{selectedImage.description}</p>
                  <div className="mb-8">
                    <h4 className="text-sm tracking-wider opacity-70 mb-2 text-black">DETAILS</h4>
                    <ul className="space-y-2 text-gray-600">
                      {selectedImage.details.map((detail, index) => (
                        <li key={index}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="border border-black px-8 py-3 tracking-wider text-sm hover:bg-black hover:text-white transition-colors duration-300 w-full md:w-auto text-black">
                    VIEW COLLECTION
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

