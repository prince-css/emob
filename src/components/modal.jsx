import React,{useState} from "react";
import styles from "../css/modal.module.css";
import { getMobileById } from "../services/mobileService";

function Modal(props) {

	//console.log(props);
	
    const selectionLength=props.selection.length;
    const mobile=getMobileById(props.selection[selectionLength-1].id);
    //console.log(mobile);
	let newStyle={};
    const [className,setClassName]=useState([styles.modal_bg,styles.modal_content]);
    

	var continueShoppingHandler = (e) => {
		//props.history.push("/");
		newStyle={
			display:"none",
		}
    };
    
    var goCartHandler=()=>{
        props.selectedHandler(false);
        props.history.push("/cart");
    }

	return (
		<div className={`${className[0]}`} style={newStyle}>
			<div className={`${className[1]}`}>
				<div className={`${styles.modal_image}`}>
					<img
						src={`${process.env.PUBLIC_URL}${mobile[0].image}`}
						alt="demo_image"
					/>
				</div>
				<div className={`${styles.modal_text}`}>
                    <h3>{mobile[0].title}</h3>
					<h5>Added To Cart</h5>
					<br />
					<div className={`${styles.button}`}>
						<button className={styles.button_modal} onClick={goCartHandler}>Go To Cart</button>
						<button className={styles.button_modal}
							onClick={(e) => {
								continueShoppingHandler(e);
								props.selectedHandler(false);
							}}
						>
							Continue Shopping
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
