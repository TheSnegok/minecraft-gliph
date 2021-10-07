import React, { useState } from "react";
import Gliph from "./component/Gliphs/Gliph";
import "./App.css";

function App() {
	const [value, setValue] = useState("");
	const clear = () => {
		setValue("");
	};
	const clearLast = () => {
		setValue(value.slice(0, value.length - 1));
	};
	const space = () => {
		setValue(value + " ");
	};
	const validation = (e) => {
		const regExp = /^[a-zA-Z|\s]+$/;
		setValue(
			e.target.value === ""
				? e.target.value
				: e.target.value.match(regExp) === null
				? value + ""
				: e.target.value.match(regExp).input
		);
	};
	return (
		<div className="App">
			<main>
				<div className="gliph">
					<div className="gliphArea">
						<div className="wrapperHeading">
							<h1>Gliphs</h1>
						</div>
						<input
							className="inputLine gliphs"
							value={value}
							readOnly
						/>
						<div className="controlPanel">
							<button className="btn" onClick={clear}>
								Clear
							</button>
							<button className="btn" onClick={clearLast}>
								Delete last
							</button>
							<button className="btn" onClick={space}>
								Space
							</button>
						</div>
						<div className="gliphAlphabet">
							<Gliph value={value} set={setValue} />
						</div>
					</div>
				</div>
			</main>
			<div className="history">
				<div className="wrapperHeading">
					<h1>Translation</h1>
				</div>
				<div className="centry">
					<input
						type="text"
						value={value}
						className="inputLine translate"
						onChange={validation}
					/>
				</div>
			</div>
			<a href="mailto:lord180499@gmail.com">
				<div className="wrapperCreator">created Max Snega</div>
			</a>
		</div>
	);
}

export default App;
