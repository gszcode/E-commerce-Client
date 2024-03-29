import { useParams } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import styles from './product_detail.module.scss'
import Button from '../../components/Button'
import { ChangeEvent, useState } from 'react'
import ImagesCard from './ImagesCard'
import SelectAmout from './SelectAmount'
import SelectSize from './SelectSize'
import { allProducts } from '../../utils/getAllProducts'
import { useDispatch, useSelector } from 'react-redux'
import { setProductsToFavorites } from '../../store/features/favorites/favoriteSlice'
import { RootState } from '../../store/store'
import { Product } from '../../typescript/interfaces/product.interface'
import { messageToast } from '../../utils/toastSuccess'
import { useAddProductCart } from '../../hooks/useAddProductCart'
import { createProductOrder } from '../../store/features/order/orderSlice'
import { Order } from '../../typescript/interfaces/order.interface'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { notify, notifyError } = messageToast()
  const { favorites } = useSelector((state: RootState) => state.favorites)
  const [selectImage, setSelectImage] = useState<null | string>(null)
  const [selectAmount, setSelectAmount] = useState<number>(1)
  const [selectSize, setSelectSize] = useState<string>('')
  const { cart } = useSelector((state: RootState) => state.cart)
  const addToCart = useAddProductCart(cart)

  const handleSelectImage = (img: string) => {
    setSelectImage(img)
  }

  const productFound = allProducts.find((product) => product.id === id!)
  const addToFavorite = () => {
    const productInFavorites = favorites.find((prod: Product) => prod.id === id)

    if (productInFavorites) {
      notifyError('El producto ya se encuentra en favoritos')
    }

    if (productFound && !productInFavorites) {
      dispatch(setProductsToFavorites(productFound))
      notify('Producto añadido a favoritos')
    }
  }

  const handleSelectAmount = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectAmount(JSON.parse(e.target.value))
  }

  const handleSelectSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectSize(e.target.value)
  }

  const createOrder = () => {
    if (!productFound || productFound.stock < 1) {
      notifyError('No hay stock de este producto')
      return
    }

    const order: Order = {
      id: productFound?.id,
      category: productFound?.category,
      product_name: productFound?.product_name,
      price: productFound?.price,
      quantity: selectAmount,
      size: selectSize,
      images: productFound?.images,
      stock: productFound?.stock
    }

    dispatch(createProductOrder(order))
    notify('Producto agregado al carrito')
  }

  return (
    <section className={styles.container}>
      <BreadCrumbs
        page={`${productFound?.category} / ${productFound?.product_name}`}
      />
      <div className={styles.product}>
        <div className={styles.detail}>
          {/* Sección de Imagenes */}
          <ImagesCard
            selectImage={selectImage}
            productFound={productFound!}
            handleSelectImage={handleSelectImage}
          />

          {/* Sección de Compras */}
          <div className={styles.shopping_container}>
            <p className={styles.id}>ID: {productFound?.id}</p>
            <h3 className={styles.title}>{productFound?.product_name}</h3>
            <p className={styles.iva}>IVA incluido</p>
            <span className={styles.price}>{productFound?.price}$</span>
            <div className={styles.rating_container}>
              {Array.from({ length: productFound?.rating ?? 0 }).map(
                (_, index) => (
                  <span key={index} className={styles.rating}>
                    ★
                  </span>
                )
              )}
              <p>( rating )</p>
            </div>

            {/* Selección de Cantidad */}
            <SelectAmout
              productFound={productFound!}
              handleSelectAmount={handleSelectAmount}
            />

            {/* Selección de Talle */}
            <SelectSize
              productFound={productFound!}
              handleSelectSize={handleSelectSize}
            />

            <div className={styles.btn_container}>
              <div
                className={styles.button}
                title="Añadir al 🛒"
                onClick={() => {
                  addToCart(productFound ? productFound?.id : '')
                  createOrder()
                }}
              >
                <Button text="Añadir al carrito" />
              </div>
              <button
                className={styles.favorite}
                onClick={() => addToFavorite()}
              >
                <span>❤</span> AÑADIR A FAVORITOS
              </button>
            </div>
            <div
              className={`${styles.stock} ${
                productFound?.stock ? styles.green : styles.red
              }`}
            >
              {productFound?.stock ? <p>En Stock</p> : <p>Sin Stock</p>}
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.data_container}>
            <h4 className={styles.title}>DESCRIPCIÓN</h4>
            <p className={styles.data}>
              ¡Te presentamos{' '}
              <span className={styles.product_name}>
                {productFound?.product_name}
              </span>{' '}
              {productFound?.description}
            </p>
          </div>
          <div className={styles.data_container}>
            <h4 className={styles.title}>CARACTERÍSTICAS:</h4>
            <div className={styles.data}>
              <ul className={styles.list}>
                {productFound?.characteristics.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
