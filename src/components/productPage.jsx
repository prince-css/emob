import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { getMobileById } from "../services/mobileService";
import styles from "../css/productPage.module.css";
import { Link } from "react-router-dom";
import SelectContext from "../context/selectContext";
import Modal from "./modal";

function ProductPage(props) {
    
    let fromContext = useContext(SelectContext);
    
    
    var a=false;
	console.log(fromContext);
	var mobileId = props.match.params.id;
	var mobile = getMobileById(mobileId);
	console.log(mobile[0].title);

	var isDisabled = () => {
		a = false;
		fromContext.selection.map((eachSelection) => {
			if (mobileId === eachSelection.id) {
                console.log("achi");
				a = true;
			}
		});
		return a ? true : false;
	};

	return (
        <React.Fragment>
		<div className={styles.wrapper}>
			<div className={`jumbotron bg-light ${styles.jumbotron}`}>
				<div className={styles.container}>
					<img
						className={styles.img_product_page}
						src={`${process.env.PUBLIC_URL}${mobile[0].image}`}
						alt="mobile_image"
					/>
					<div>
						<h1>{mobile[0].title}</h1>
						<h2 className="text-secondary">{mobile[0].price}</h2>
						<h4>Ram: {mobile[0].desc.Ram}</h4>
						<h4>Rom: {mobile[0].desc.Rom}</h4>
						<h4>Chipset: {mobile[0].desc.Chipset}</h4>
						<h4>Battery: {mobile[0].desc.Battery}</h4>
					</div>
					<div className={`${styles.button}`}>
						<button
							className={
								isDisabled()
									? styles.button_product_page_disabled
									: styles.button_product_page
							}
							disabled={isDisabled()}
							onClick={() => {
                                fromContext.selectionHandler(mobile[0]);
								fromContext.selectedHandler(true);
							}}
						>
							Add To Cart
						</button>
						<Link
							className={styles.button_product_page}
							to="/products"
							role="button"
						>
							Back To Products
						</Link>
					</div>
				</div>
			</div>
		</div>
        {fromContext.selected && <Modal selectedHandler={fromContext.selectedHandler} selection={fromContext.selection} {...props} />}
        </React.Fragment>
	);
}

export default ProductPage;
