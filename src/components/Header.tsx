import { useMemo } from "react";
import { IGuitar } from "../interfaces/guitar";
import ItemCart from "./ItemCart";

interface Props {
  cart: IGuitar[];
  removeFromCart(id: number): void;
  increaseCuantity(id: number): void;
  decrementCuantity(id: number): void;
  ClearCart(): void;
}

function Header({ cart, removeFromCart, increaseCuantity, decrementCuantity, ClearCart }: Props) {

  const cartTotal = useMemo(() => cart.reduce((total, item) =>  total + (item.quantity! * item.price), 0), [cart])
  
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {
                  cart.length > 0 ? (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            cart.map(item => (
                              <ItemCart
                                key={ item.id }
                                item={ item }
                                removeFromCart={ removeFromCart }
                                increaseCuantity={ increaseCuantity }
                                decrementCuantity={ decrementCuantity }
                              />
                            ))
                          }
                        </tbody>
                      </table>
                      <p className="text-end">
                        Total pagar: <span className="fw-bold">${ cartTotal }</span>
                      </p>
                      <button onClick={ClearCart} className="btn btn-dark w-100 mt-3 p-2">
                        Vaciar Carrito
                      </button>
                    </>
                  ) : (
                    <p className="text-center">El carrito esta vacio</p>
                  )
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
