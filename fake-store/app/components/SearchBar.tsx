const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
      <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="border p-2 rounded w-full mb-4 text-black"
      />
  );
};

export default SearchBar;
