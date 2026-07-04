import { useEffect, useState } from "react";

import CategoryForm from "../components/CategoryForm";
import CategoryCard from "../components/CategoryCard";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const AdminCategories = () => {

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const loadCategories = async () => {

    try {

      const data = await getCategories();

      setCategories(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadCategories();

  }, []);

  const handleSubmit = async (form) => {

    try {

      setLoading(true);

      if (selectedCategory) {

        await updateCategory(
          selectedCategory.id,
          form
        );

        alert("Category Updated Successfully");

      } else {

        await createCategory(form);

        alert("Category Added Successfully");

      }

      setSelectedCategory(null);

      loadCategories();

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this category?"))
      return;

    try {

      await deleteCategory(id);

      alert("Category Deleted");

      loadCategories();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredCategories = categories.filter(category =>
    category.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        Category Management

      </h1>

      <CategoryForm
        onSubmit={handleSubmit}
        selectedCategory={selectedCategory}
        loading={loading}
      />

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3 w-full md:w-96"
        />

      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredCategories.length === 0 ? (

          <div className="col-span-full text-center text-gray-500">

            No Categories Found

          </div>

        ) : (

          filteredCategories.map(category => (

            <CategoryCard
              key={category.id}
              category={category}
              onEdit={setSelectedCategory}
              onDelete={handleDelete}
            />

          ))

        )}

      </div>

    </div>

  );

};

export default AdminCategories;