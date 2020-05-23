import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";



function PaypalBtn(props) {
	const onSuccess = (payment) => {
		console.log("The payment was succeeded!", payment);
	};

	const onCancel = (data) => {
		// User pressed "cancel" or close Paypal's popup!
		console.log("The payment was cancelled!", data);
	};

	const onError = (err) => {
		// The main Paypal's script cannot be loaded or somethings block the loading of that script!
		console.log("Error!", err);
		// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
		// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
	};

	let env = "sandbox"; //'production' for production
	let currency = "USD";

	const client = {
		sandbox:
			"ARm-J-nQHuME6Wb7P73Mo9pTsSRhh1187KaOY5bEf72jaNBo5qDd0PwzDzhT_zfrr0prvHmnI8XuJZot",
		//production: 'YOUR-PRODUCTION-APP-ID',
	};

	return (
		<PaypalExpressBtn
			env={env}
			client={client}
			currency={currency}
			total={props.total}
			onError={onError}
			onSuccess={onSuccess}
			onCancel={onCancel}
		/>
	);
}

export default PaypalBtn;
