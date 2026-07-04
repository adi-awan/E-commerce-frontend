import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getSuggestions } from "../services/searchService";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    navigate(`/products?search=${encodeURIComponent(keyword.trim())}`);
  };
  useEffect(() => {

    if (!keyword.trim()) {

      setSuggestions([]);

      return;

    }

    const timer = setTimeout(async () => {

      try {

        const data = await getSuggestions(keyword);

        setSuggestions(data);

        setShowSuggestions(true);

      } catch (err) {

        console.log(err);

      }

    }, 300);

    return () => clearTimeout(timer);

  }, [keyword]);

  return (
    <form
      onSubmit={handleSearch}
      className="hidden lg:flex items-center bg-gray-100 rounded-xl overflow-hidden w-96"
    >
      <input
    type="text"
    placeholder="Search products..."

    value={keyword}

    onChange={(e)=>{

        setKeyword(e.target.value);

    }}

    className="flex-1 bg-transparent px-4 py-3 outline-none"
/>
{
showSuggestions &&
suggestions.length > 0 && (

<div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border z-50 overflow-hidden">

{
suggestions.map((product,index)=>(

<div

key={product.id}

onClick={()=>{

navigate(`/products?search=${product.name}`);

setKeyword(product.name);

setShowSuggestions(false);

}}

className={`

flex

items-center

gap-4

p-3

cursor-pointer

hover:bg-blue-50

transition

${selectedIndex===index?"bg-blue-100":""}

`}

>

<img

src={product.image_url}

className="w-14 h-14 rounded-lg object-cover"

/>

<div>

<h3 className="font-semibold">

{product.name}

</h3>

<p className="text-blue-600">

Rs. {product.price}

</p>

</div>

</div>

))
}

</div>

)
}

      <button
        type="submit"
        className="px-4 text-gray-600 hover:text-blue-600"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;