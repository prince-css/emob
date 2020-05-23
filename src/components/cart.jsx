import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
	faTrashAlt,
	faPlusSquare,
	faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../css/cart.module.css";
import SelectContext from "./../context/selectContext";
import { getMobileById } from "../services/mobileService";
import PaypalBtn from "./paypalBtn";



function Cart(props) {
	const fromContext = useContext(SelectContext);
	let count = 0;
	var total = 0;
	console.log(fromContext.selection);

	var getTableElements = () => {
		const elements = [];

		fromContext.selection.map((eachSelection) => {
			const mobile = getMobileById(eachSelection.id);
			count = count + 1;

			elements.push(
				<tr key={mobile[0].id}>
					<th scope="row">{count}</th>
					<td>{mobile[0].title}</td>
					<td>
						<FontAwesomeIcon
							icon={faMinusSquare}
							size="2x"
							onClick={mobile[0].pcs !==0 ? () => {
								fromContext.quantHandler("dec", mobile[0].id);
							}:""}
						/>
					</td>
					<td>{mobile[0].pcs}</td>
					<td>
						<FontAwesomeIcon
							icon={faPlusSquare}
							size="2x"
							onClick={() => {
								fromContext.quantHandler("inc", mobile[0].id);
							}}
						/>
					</td>
					<td>{mobile[0].price * mobile[0].pcs}</td>
					<td>
						<button
							className={`btn btn-danger ${styles.sign}`}
							onClick={() => {
								fromContext.deleteHandler(mobile[0].id);
							}}
						>
							<FontAwesomeIcon icon={faTrashAlt} /> Delete
						</button>
					</td>
				</tr>
			);
		});
		return elements;
	};

	return (
		<div className={styles.table_wrapper}>
			<table className={`table ${styles.table}`}>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Product</th>
						<th scope="col"></th>
						<th scope="col">Quant.</th>
						<th scope="col"></th>
						<th scope="col">Price</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{getTableElements()}
					<tr key="total">
						<th scope="row"></th>
						<td></td>
						<td></td>
						<td></td>
						<td className={styles.appeal}>Total</td>
						<td className={styles.appeal}>{fromContext.total} /=</td>
						<td
							className={styles.clear}
							onClick={() => {
								fromContext.clearCartHandler();
								props.history.replace("/products");
							}}
						>
							Clear Cart
						</td>
					</tr>
					<tr>
						<th scope="row"></th>
						<td></td>
						<td></td>
						<td></td>
						<td colSpan="4" className={styles.checkout}>
							Check Out <PaypalBtn total={fromContext.total} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Cart;
