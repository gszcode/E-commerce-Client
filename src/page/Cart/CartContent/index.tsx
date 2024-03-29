import { Link } from 'react-router-dom'
import styles from './cart_content.module.scss'
import Image from '../../../components/Image'
import { useDispatch } from 'react-redux'
import { removeProductFromCart } from '../../../store/features/cart/cartSlice'
import { Order } from '../../../typescript/interfaces/order.interface'

const CartContent = ({
  id,
  category,
  images,
  product_name,
  size,
  price,
  quantity
}: Order) => {
  const dispatch = useDispatch()

  const deleteProductFromCart = (id: string) => {
    dispatch(removeProductFromCart(id))
  }

  return (
    <div className={styles.container}>
      <button className="icon_btn" onClick={() => deleteProductFromCart(id)}>
        <Image img="close" alt="Delete" title="Eliminar del Carrito" />
      </button>
      <div className={styles.product}>
        <Link to={`/product/${id}`} className={styles.product_img}>
          <img src={images[0]} alt={product_name} />
        </Link>
        <div className={styles.product_info}>
          <p className={styles.item}>
            Categoria: <span>{category}</span>
          </p>
          <h3 className={styles.item}>
            Producto: <span>{product_name}</span>
          </h3>
          {size && (
            <p className={styles.item}>
              Talle: <span>{size.split(':')[1]}</span>
            </p>
          )}
          <p className={styles.item}>
            Precio: <span className={styles.price}>${price}</span>
          </p>
          <p className={styles.item}>
            Cantidad: <span className={styles.quantity}>{quantity}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartContent
