// 'use client'
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// // import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/splide/dist/css/splide.min.css';
// import styles from '../styles/comics.module.css';

// const ImageGallery: React.FC = () => {
//   const [imageUrls, setImageUrls] = useState<string[]>([]);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch the panelImageUrls from the backend
//     const fetchPanelImageUrls = async () => {
//       try {
//         const response = await fetch('/api/get-comics'); // Adjust the endpoint as necessary
//         const data = await response.json();
//         setImageUrls(data.panels.panelImageUrls);
//       } catch (error) {
//         console.error('Error fetching panel images:', error);
//       }
//     };

//     fetchPanelImageUrls();
//   }, []);

//   const handleDownload = (imageUrl: string) => {
//     window.open(imageUrl, '_blank');
//   };

//   const handleImageClick = (imageUrl: string) => {
//     setSelectedImage(imageUrl);
//   };

//   const handleCloseImage = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[url('/background.png')] bg-bottom bg-repeat-x">
//       <header className="flex items-center justify-between px-6 h-14 bg-[#1E0018]">
//         <a href="#" className="text-white font-bold text-xl">VCOMICS</a>
//         <a href="#" className="text-white hover:underline">
//           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 3.65 9.12 8.4 9.88V15.8h-2.5v-2.8h2.5V10c0-2.54 1.54-3.94 3.8-3.94 1.1 0 2.05.08 2.33.12v2.71h-1.6c-1.26 0-1.5.6-1.5 1.47v1.93h2.92l-.38 2.8h-2.54V22C18.35 21.12 22 16.99 22 12c0-5.52-4.48-10-10-10z" />
//           </svg>
//         </a>
//       </header>

//       <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-adventure uppercase text-[#1E0018]">
//           Image Gallery
//         </h1>
//         <Splide
//           options={{
//             type: 'loop',
//             perPage: 1,
//             autoplay: true,
//             arrows: true,
//             pagination: false,
//           }}
//           className="mt-8 w-full max-w-3xl"
//         >
//           {imageUrls.map((url, index) => (
//             <SplideSlide key={index}>
//               <div className="relative">
//                 <img
//                   src={url}
//                   alt={`Image ${index}`}
//                   className="w-full max-h-80 object-contain rounded-lg cursor-pointer"
//                   onClick={() => handleImageClick(url)}
//                 />
//                 <button
//                   className="absolute top-2 right-2 bg-white text-[#1E0018] px-3 py-1 rounded-lg shadow-md hover:bg-gray-200"
//                   onClick={() => handleDownload(url)}
//                 >
//                   Download
//                 </button>
//               </div>
//             </SplideSlide>
//           ))}
//         </Splide>

//         {/* Modal for displaying selected image */}
//         {selectedImage && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="max-w-screen-lg w-full mx-auto rounded-lg overflow-hidden shadow-lg relative">
//               <img src={selectedImage} alt="Selected Image" className="w-full max-h-[80vh] object-contain" />
//               <button
//                 className="absolute top-4 right-4 bg-white text-[#1E0018] px-3 py-1 rounded-lg shadow-md hover:bg-gray-200"
//                 onClick={handleCloseImage}
//               >
//                 Close
//               </button>
//               <button
//                 className="absolute bottom-4 right-4 bg-white text-[#1E0018] px-3 py-1 rounded-lg shadow-md hover:bg-gray-200"
//                 onClick={() => handleDownload(selectedImage)}
//               >
//                 Download
//               </button>
//             </div>
//           </div>
//         )}

//         <Link href="/loading" passHref>
//           <button className="mt-8 text-[#1E0018]">
//             Back to Upload Page
//           </button>
//         </Link>
//       </main>
//     </div>
//   );
// };

// export default ImageGallery;
