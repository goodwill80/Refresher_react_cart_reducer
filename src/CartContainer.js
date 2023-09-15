import { useGlobalContext } from './context';
import CartItem from './CartItem';

const CartContainer = () => {
  const { cart, clearCart, totalCost } = useGlobalContext();

  // Convert Map to Array
  const cartArray = Array.from(cart.entries()).map((item) => item[1]);

  if (cartArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem, index) => {
          // console.log(cartItem);
          return <CartItem key={index} {...cartItem} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${totalCost.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={clearCart}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
