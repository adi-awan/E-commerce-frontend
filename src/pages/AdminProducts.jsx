import { useEffect, useState } from "react";

import ProductForm from "../components/ProductForm";
import AdminProductCard from "../components/AdminProductCard";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/adminProductService";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (form) => {
  try {
    console.log("Submitting:", form);

    setLoading(true);

    if (selectedProduct) {
      await updateProduct(selectedProduct.id, form);
      alert("Product Updated Successfully");
    } else {
      await createProduct(form);
      alert("Product Added Successfully");
    }

    setSelectedProduct(null);
    loadProducts();

  } catch (error) {
    console.log(error);
    console.log(error.response);

    alert(
      error.response?.data?.detail ||
      error.message ||
      "Something went wrong."
    );

  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      alert("Product Deleted");

      loadProducts();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Product Management
      </h1>

      <ProductForm
        onSubmit={handleSubmit}
        selectedProduct={selectedProduct}
        loading={loading}
      />

      <h2 className="text-3xl font-bold mt-12 mb-8">
        All Products
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (

          <AdminProductCard
            key={product.id}
            product={product}
            onEdit={setSelectedProduct}
            onDelete={handleDelete}
          />

        ))}

      </div>

    </div>
  );
};

export default AdminProducts;