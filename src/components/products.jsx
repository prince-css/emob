import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../css/products.module.css";
import Modal from "./modal";
import SideBar from "./sideBar";

////////////////   S   T   A   R   T   ////////////////

function Products({
	mobiles,
	selection,
	selected,
	selectionHandler,
	selectedHandler,
	...rest
}) {





	var isDisabled = (mobile) => {
		var a = false;
		selection.map((eachSelection) => {
			//console.log("lalala");
			if (eachSelection.id == mobile.id) {
				//console.log("kkk");
				a = true;
				return a;
			}
		});

		return a ? true : false;
	};
	var productPageHandler = (e, mobile) => {
		//console.log(e.target.tagName);
		if (e.target.tagName != "BUTTON") {
			//console.log(`/product/${mobile.id}`);
			rest.history.push(`/product/${mobile.id}`);
		}
	};

	var displayMobiles = () => {
		const mobilesToDisplay = [];

		mobiles.map((mobile) => {
			//const image=require(mobile.image);
			mobilesToDisplay.push(
				<div
					className={`card ${styles.cardy}`}
					key={mobile.id}
					onClick={(e) => {
						productPageHandler(e, mobile);
					}}
				>
					<img
						src={`${process.env.PUBLIC_URL}${mobile.image}`}
						className={`card-img-top ${styles.cardImg}`}
						alt="..."
					/>
					<div className={`card-body ${styles.cardBody}`}>
						<h5 className={` card-title ${styles.card_title}`}>{mobile.title}</h5>
						<p className={` card-text ${styles.card_text}`}>{mobile.price} BDT</p>
						<button
							type="button"
							className={`btn btn-info ${styles.button_products}`}
							onClick={() => {
								console.log(mobile.pcs);
								selectionHandler(mobile);
							}}
							disabled={isDisabled(mobile)}
						>
							Add To Cart
						</button>
					</div>
				</div>
			);
		});

		return mobilesToDisplay;
	};

	

	

	return (
		<React.Fragment>
			<SideBar />
			<div  className={styles.wrapper}>
				{displayMobiles()}
				{selected && (
					<Modal
						selectedHandler={selectedHandler}
						selection={selection}
						{...rest}
					/>
				)}
			</div>
		</React.Fragment>
	);
}

export default Products;
