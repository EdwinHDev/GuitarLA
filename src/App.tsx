import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { guitars } from "./data/guitars";
import { IGuitar } from "./interfaces/guitar";

function App() {

  const INITIAL_STATE = () => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [ cart, setCart ] = useState<IGuitar[]>(INITIAL_STATE);

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  function addToCart(item: IGuitar) {

    const itemExist = cart.findIndex(guitar => guitar.id === item.id)

    if(itemExist >= 0) {
      if(cart[itemExist].quantity! >= MAX_ITEMS) return
      const updateCart = [...cart]
      updateCart[itemExist].quantity!++
      setCart(updateCart)
    } else {
      item.quantity! = 1
      setCart([...cart, item])
    }

  }

  function removeFromCart(id: number) {
    setCart(prevCart =>  prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseCuantity(id: number) {
    const updateCart = cart.map(guitar => {
      if(guitar.id === id && guitar.quantity! < MAX_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity! + 1
        }
      }
      return guitar
    })
    setCart(updateCart)
  }

  function decrementCuantity(id: number) {
    const updateCart = cart.map(guitar => {
      if(guitar.id === id && guitar.quantity! > MIN_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity! - 1
        }
      }
      return guitar
    })
    setCart(updateCart)
  }

  function ClearCart() {
    setCart([])
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify( cart ))
  }, [cart])

  return (
    <>
      <Header
        cart={ cart }
        removeFromCart={ removeFromCart }
        increaseCuantity={ increaseCuantity }
        decrementCuantity={ decrementCuantity }
        ClearCart={ ClearCart }
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map((guitar: IGuitar) => (
              <Guitar
                key={ guitar.id }
                guitar={ guitar }
                addToCart={ addToCart }
              />
            ))
          }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
