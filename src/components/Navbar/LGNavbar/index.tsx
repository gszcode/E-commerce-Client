import { useState } from 'react'
import SubNav from '../SubNav'
import styles from './lgnavbar.module.scss'
import { Link } from 'react-router-dom'
import { clothes_links, home_links } from '../../../json/links'
import { SubMenu } from '../../../typescript/types/submenu'
import { useCloseDrop } from '../../../hooks/useCloseDrop'

const LGNavbar = () => {
  const [openSubNav, setOpenSubNav] = useState<SubMenu>(null)
  const { closeRef } = useCloseDrop(setOpenSubNav)

  const handleOpenSubNav = (menu: SubMenu) => {
    setOpenSubNav((prev) => (prev === menu ? null : menu))
  }

  return (
    <div className={styles.large_menu}>
      <ul className={styles.list}>
        <Link className={styles.item} to="/">
          INICIO
        </Link>
        <Link className={styles.item} to="/products">
          PRODUCTOS
        </Link>
        <div ref={closeRef}>
          <span
            onClick={() => handleOpenSubNav('clothes')}
            className={`${styles.item} ${styles.clothes}`}
          >
            ROPA
            {
              /* submenu */
              openSubNav === 'clothes' && (
                <SubNav
                  openSubNav={openSubNav}
                  links={clothes_links}
                  setOpenSubNav={setOpenSubNav}
                />
              )
            }
          </span>
          <span
            onClick={() => handleOpenSubNav('home')}
            className={`${styles.item} ${styles.home}`}
            style={{ marginLeft: '20px' }}
          >
            HOGAR
            {
              /* submenu */
              openSubNav === 'home' && (
                <SubNav
                  openSubNav={openSubNav}
                  links={home_links}
                  setOpenSubNav={setOpenSubNav}
                />
              )
            }
          </span>
        </div>
        <Link className={styles.item} to="/products/sports">
          PRODUCTOS DEPORTIVOS
        </Link>
        <Link className={styles.item} to="/contact">
          CONTACTO
        </Link>
      </ul>
    </div>
  )
}

export default LGNavbar
