import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeProduct } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Product = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(data);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((product) => setData(product));
  }, []);

  const viewProducts = (product) => {
    console.log(product);
    dispatch(storeProduct(product));
    Swal.fire({
      title: "Buy!",
      icon: "success",
    });

    navigate("/product-detail");
  };

  const handleAddToCart = (product) => {
    // console.log(product);
    dispatch(addToCart(product));
    Swal.fire({
      title: "Added to Cart",
      text: `${product.title} has been added to your cart.`,
      icon: "success",
    });

    navigate("/cart");
  };

  return (
    <div className="text-slate-500">
      <h1>Product List</h1>
      <div className="grid grid-cols-4 gap-4 text-center">
        {data.map((product, i) => (
          <div key={i} className="flex flex-col items-center justify-center">
            <img
              src={product.image}
              alt={product.category}
              className="w-[300px] h-[250px] object-contain"
            />
            <h3 className="text-xl">{product.category}</h3>
            <h3 className="text-xl">${product.price}</h3>
            <p>{product.description}</p>
            <div className="flex">
              <button
                onClick={() => viewProducts(product)}
                className="p-3 border rounded bg-red-400 text-white mt-2"
              >
                Buy Now
              </button>
              <hr />
              <button
                className="p-3 border rounded bg-blue-400 text-white mt-2"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
