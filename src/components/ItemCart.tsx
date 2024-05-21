import { IGuitar } from "../interfaces/guitar";

interface Props {
  item: IGuitar;
  removeFromCart(id: number): void;
  increaseCuantity(id: number): void;
  decrementCuantity(id: number): void;
}

function ItemCart({ item, removeFromCart, increaseCuantity, decrementCuantity }: Props) {

  const { image, name, price, id, quantity } = item


  return (
    <tr>
      <td>
        <img
          className="img-fluid"
          src={`/img/${ image }.jpg`}
          alt="imagen guitarra"
        />
      </td>
      <td>{ name }</td>
      <td className="fw-bold">${ price }</td>
      <td className="flex align-items-start gap-4">
        <button onClick={() => decrementCuantity(id!)} type="button" className="btn btn-dark">
          -
        </button>
        { quantity }
        <button onClick={() => increaseCuantity(id!)} type="button" className="btn btn-dark">
          +
        </button>
      </td>
      <td>
        <button onClick={() => removeFromCart(id!)} className="btn btn-danger" type="button">
          X
        </button>
      </td>
    </tr>
  );
}

export default ItemCart;
