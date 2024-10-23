import {  useSelector } from "react-redux";
import { IoMdCart } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
const Cart = () => {

  const { cartSlice } = useSelector((state) => state); // Accessing cartSlice correctly
  console.log(cartSlice);
  const totalPrice = cartSlice.items.reduce(
    (total, item) => total + item.price,
    0
  );

  const paymentHandler = async () => {
    const stripe = await loadStripe(
      "pk_test_51PfatdBMEheqm87LIWMLI78S5WqX4Twmb1ovGjaunbnFIHyhPpkBBAiThdeIR4GSZ4DCP9U3GypT2NzDvmNBQBWb008DLPWk8U" //public key
    );
    const body = {
      product: cartSlice.items,
    };
    const headers = {
      "Content-Type": "application/json",   
    };

    const response = await fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      headers:headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    console.log("session:"+ session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
      
    });

    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <div>
      <div className="text-3xl font-bold text-center m-8 flex items-center justify-center">
        <IoMdCart />
        <h1> Cart</h1>
      </div>

      {cartSlice.items.length > 0 ? (
        <div>
          <ul>
            {cartSlice.items.map((item, index) => (
              <li key={index} className="flex w-7/12 mx-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[200px] w-[200px] object-contain"
                />
                <div>
                  <h3 className="text-xl">{item.title}</h3>
                  <p>{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <button
            className="bg-blue-400 py-2 px-4 rounded text-white font-bold"
            onClick={paymentHandler}
          >
            Check Out
          </button>
        </div>
      ) : (
        <p className="text-3xl font-bold text-center">Your cart is empty :(</p>
      )}
    </div>
  );
};

export default Cart;
