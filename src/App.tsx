import React from "react";

import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
	return (
		<div className="App">
			<Home />
			<ToastContainer />
		</div>
	);
}

export default App;
