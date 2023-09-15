import { useGlobalContext } from './context';

const CartContainer = () => {
  const { cart } = useGlobalContext();
  // console.log(cart);
  // Convert Map to Array
  const cartArray = Array.from(cart.entries());

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
        {/* {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })} */}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>$0.00</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => console.log('clear cart')}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
