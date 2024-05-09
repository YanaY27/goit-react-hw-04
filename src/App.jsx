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

  const handleSearch = async (newSearch) => {
    if (!newSearch.trim()) {
      toast.error("Enter a search query");
      return;
    }
    setIsLoading(true);
    setError("");
    setQuery(newSearch);
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
          toast.error("No images with your request");
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
      {images.length > 0 && !isLoading && (
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
