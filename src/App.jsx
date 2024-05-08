import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { fetchPhotosByQuery } from "./service/api";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (newQuery) => {
    if (!newQuery.trim()) {
      toast.error("Enter a search query");
      return;
    }
    setIsLoading(true);
    setError("");
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getImages() {
      if (!query) return;

      setIsLoading(true);
      setError("");

      try {
        const data = await fetchPhotosByQuery(query, page);

        if (data.length === 0) {
          toast.error("No images were found for your request");
        } else {
          if (page === 1) {
            setImages(data);
          } else {
            setImages((prevImages) => [...prevImages, ...data]);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery items={images} openModal={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && images.length > 9 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={modalClose}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
}
// function App() {
//   const [images, setImages] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedImages = await fetchPhotosByQuery(searchValue);
//         const imagesWithUrls = fetchedImages.map((image) => ({
//           ...image,
//           imageUrl: image.urls.regular, // Додали поле imageUrl
//         }));
//         setImages(imagesWithUrls);
//         if (fetchedImages.length === 0) {
//           toast.error(`No images found for "${searchValue}"`);
//         }
//       } catch (error) {
//         console.error("Error fetching images:", error);
//         toast.error("Error fetching images. Please try again later.");
//       }
//     };

//     if (searchValue.trim() !== "") {
//       fetchData();
//     }
//   }, [searchValue]);

//   const handleSearch = (searchValue) => {
//     setSearchValue(searchValue);
//   };
// const [photos, setPhotos] = useState([]);
// const [page, setPage] = useState(0);
// const [error, setError] = useState(false);
// const [loading, setLoading] = useState(false);
// const [total, setTotal] = useState(0);
// const [query, setQuery] = useState("");
// const [modalData, setModalData] = useState(null);
// const [isModalOpen, setIsModalOpen] = useState(false);

// useEffect(() => {
//   if (!query) {
//     return;
//   }
//   const getData = async () => {
//     try {
//       setLoading(true);
//       const { results, total } = await fetchPhotosByQuery({
//         query,
//         page,
//       });

//       setPhotos((prev) => [...prev, ...results]);
//       setTotal(total);
//     } catch (error) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };
//   getData();
// }, [query, page]);

// const handleSearch = (search) => {
//   setQuery(search);
//   setPhotos([]);
//   setPage(0);
// };

// const onLoad = () => {
//   setPage((prev) => prev + 1);
//   console.log("click");
// };

// const openModal = (data) => {
//   setModalData(data);
//   setIsModalOpen(true);
// };

// const closeModal = () => {
//   setIsModalOpen(false);
//   setModalData(null);
// };

// return (
//   <>
//     <SearchBar onSearch={handleSearch} />
//     {images.length > 0 && <ImageGallery images={images} />}
{
  /* <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery items={photos} onImgClick={openModal} />
      )}
      {photos.length > 0 && photos.length < total && (
        <LoadMoreBtn onClick={onLoad} />
      )} */
}
{
  /* <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        modalData={modalData}
      /> */
}
//     </>
//   );
// }

// export default App;

// const handleSubmit = async (query) => {
//   try {
//     const { results } = await fetchPhotosByQuery({
//       query,
//       page,
//     });

//     setImages((prev) => [...prev, ...results]);
//     setImages(results);
//   } catch (error) {
//     console.log(error);
//   }
// };
