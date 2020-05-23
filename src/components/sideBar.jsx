import React, { useContext, useEffect, useState } from "react";
import styles from "../css/sidebar.module.css";
import SelectContext from "./../context/selectContext";
import { getBrands } from "../services/brandService";

function SideBar(props) {
	const fromContext = useContext(SelectContext);
    let [brands,setBrands]=useState([]);
	

	useEffect(() => {
        const fetchedBrands = [{id:"11111111111111",name:"All"},...getBrands()];
        setBrands(fetchedBrands);
		console.log(brands);
	}, []);

	const getBrandElements = () => {
		
		const elements=brands.map((brand) => {
                console.log("dhuki");
                
				return(<li
					className={brand.name === fromContext.selectedBrand ? styles.sidebar_li_active : styles.sidebar_li }
					onClick={() => {
						fromContext.brandHandler(brand);
					}}
				>
					{brand.name}
				</li>)
			
		});
		console.log(elements);
		return elements;
	};

	return (
		<div className={styles.sidebar_wrapper}>
			<div className={styles.sidebar_content}>
				<h4>Select Brand</h4>
				<ul className={styles.sidebar_ul}>{getBrandElements()}</ul>
			</div>
		</div>
	);
}

export default SideBar;
