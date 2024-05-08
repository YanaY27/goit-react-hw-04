import toast from "react-hot-toast";
import s from "./SearchBar.module.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim() === "") {
      toast.error("Please enter text to search for images");
      return;
    }
    onSearch(searchValue);
  };

  return (
    <div className={s.container}>
      <header className={s.wrap}>
        <form onSubmit={handleSubmit} className={s.form}>
          <button className={s.btn} type="submit">
            <FaSearch />
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
