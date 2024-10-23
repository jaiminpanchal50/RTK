import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { productSlice } = useSelector((res) => res);
  console.log(productSlice);
  return (
    <>
      <div className="w-4/12 mx-auto">
        <img src={productSlice.image} />
        <h3>{productSlice.title}</h3>
        <p>{productSlice.description}</p>
        <h2>{productSlice.price}</h2>
        <p>{productSlice.des}</p>
        
      </div>
    </>
  );
};

export default ProductDetail;
