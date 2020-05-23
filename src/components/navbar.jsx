import React, { useContext } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../css/navbar.module.css";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectContext from './../context/selectContext';

function Navbar(props) {

	const fromContext=useContext(SelectContext);
	console.log("navbar",fromContext);
	return (
		<nav>
			<ul id={styles.ul}>
				<li className={styles.li}>
					<Link to="/cart" className="text-dark">
						<FontAwesomeIcon
							icon={faCartPlus}
							size="2x"
						/> <sub className={styles.sub}>{fromContext.total} TK</sub>
					</Link>
				</li>
				<li className={styles.li}>Contact Us</li>
				<li className={styles.li}>
					<Link to="/products" className="text-dark">
						Products
					</Link>
				</li>
				<li className={styles.li}>
					<Link to="/home" className="text-dark">
						Home
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
