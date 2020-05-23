import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Products from "./components/products";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductPage from "./components/productPage";
import {
	getMobiles,
	pcsInc,
	getMobileById,
	pcsDec,
} from "./services/mobileService";
import SelectContext from "./context/selectContext";
import Cart from "./components/cart";
import Home from "./components/home";
import SideBar from "./components/sideBar";

function App() {
	const [mobiles, setMobiles] = useState([]);
	const [selected, setSelected] = useState(false);
	const [selection, setSelection] = useState([]);
	const [selectedBrand,setSelectedBrand]=useState("All");
	const [total,setTotal]=useState();

	useEffect(() => {
		const fetchedMobiles = getMobiles();
		setMobiles(fetchedMobiles);
		const newMobiles=fetchedMobiles.filter((mobile)=>mobile.brand == selectedBrand)
		selectedBrand != "All" ? setMobiles(newMobiles): setMobiles(fetchedMobiles);
		console.log(newMobiles);
		console.log(selection);
		
		
		let totalAmount=0;
		selection.map((eachSelection)=>{
			const eachMobile = getMobileById(eachSelection.id)
			totalAmount=totalAmount+(eachMobile[0].pcs * eachMobile[0].price);
			console.log(totalAmount);	
		})
		setTotal(totalAmount);
		console.log(total);
	}, [selection,selected,total,selectedBrand]);

	console.log(selection);

	var selectionHandler = (mobile) => {
		console.log(mobile);
		pcsInc(mobile.id);
		const newMobile=getMobileById(mobile.id)
		const newSelection = [...selection, { id: newMobile[0].id, pcs: newMobile[0].pcs }];
		setSelection(newSelection);
		setSelected(true);
	};

	var quantHandler = (operation, mobileId) => {
		if (operation === "inc") {
			pcsInc(mobileId);
		} else if (operation == "dec") {
			pcsDec(mobileId);
		}

		let updatedSelection = [];
		updatedSelection = selection.map((eachSelection) => {
			if (eachSelection.id == mobileId) {
				const updatedMobile = getMobileById(eachSelection.id);
				eachSelection.pcs = updatedMobile[0].pcs;
			}
			return eachSelection;
		});

		setSelection(updatedSelection);
		
	};

	var selectedHandler = (value) => {
		setSelected(value);
	};

	var clearCartHandler=()=>{
		setSelection([]);
	}

	var deleteHandler=(mobileId)=>{
		console.log (selection);
		const newSelection=selection.filter((eachSelection)=>eachSelection.id !== mobileId);
		setSelection(newSelection);
	}

	var brandHandler=(brand)=>{
		// console.log(brand);
		// const fetchedMobiles=getMobiles();
		// const newMobiles=fetchedMobiles.filter((mobile)=>mobile.brand ==brand.name)
		// console.log(newMobiles);
		// brand.name != "All" ? setMobiles(newMobiles): setMobiles(fetchedMobiles);
		setSelectedBrand(brand.name);
	}
	


	return (
		<React.Fragment>

			<SelectContext.Provider
				value={{
					selected: selected,
					selection: selection,
					selectedBrand:selectedBrand,
					total:total,
					selectedHandler: selectedHandler,
					selectionHandler: selectionHandler,
					quantHandler: quantHandler,
					deleteHandler:deleteHandler,
					clearCartHandler:clearCartHandler,
					brandHandler:brandHandler,
				}}
			>
				<Navbar />
				
				<Switch>
					<Route path="/cart" component={Cart} />
					<Route path="/home" component={Home} />
					<Route path="/product/:id" component={ProductPage} />
					<Route
						exact
						path="/products"
						render={(props) => (
							<Products
								{...props}
								mobiles={mobiles}
								selected={selected}
								selection={selection}
								selectionHandler={selectionHandler}
								selectedHandler={selectedHandler}
							/>
						)}
					/>
					<Redirect from="/" to="/home" />
				</Switch>
			</SelectContext.Provider>
		</React.Fragment>
	);
}

export default App;
