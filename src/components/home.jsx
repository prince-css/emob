import React from "react"
import { Link } from 'react-router-dom';
import styles from "../css/home.module.css";

function Home(props) {
	return (
		<div>
			<div className={styles.cover_bg}>
				<div className={styles.bg}>
					<div className={styles.text}>
						<section className={styles.title}>
							MOB<span className={styles.sub_title}>shop</span>
						</section>
						<h5>Number one mobile Wholeseller in Bangladesh</h5>
						<p className={styles.details}>
							Customer friendly MOBshop is committed to providing
							quality products through dedicated technical experts
							in Bangladesh . MOBshop takes pride in its
							countrywide network of 44 customer care centers and
							32 collection points that also happens to be the
							widest after-sales service network in the industry,
							ready to provide service round the clock.
						</p>
						<Link to="/products"><button className={styles.coverBtn}>Shop Now</button></Link>
					</div>
					<img
						className={styles.hero}
						src={`${process.env.PUBLIC_URL}/assets/others/undraw_social_life_4np1.svg`}
						alt="ok"
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
