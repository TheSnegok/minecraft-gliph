import React, { useState } from "react";
import html2canvas from "html2canvas";
import Gliph from "./component/Gliphs/Gliph";
import "./App.css";

function App() {
	const [value, setValue] = useState("");
	const [alert, setAlert] = useState("");
	const clear = () => {
		setValue((value) => (value = ""));
	};
	const clearLast = () => {
		setValue((value) => value.slice(0, value.length - 1));
	};
	const space = () => {
		setValue((value) => value + " ");
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

	const saveImage = (e) => {
		if(e.target.value !== "") {
			html2canvas(e.target).then((canvas) => {
				const image = canvas.toDataURL("image/png", 1.0);
				const downloadImage = (blob, fileName) => {
					const fakeLink = window.document.createElement("a");
					fakeLink.style = "display:none;";
					fakeLink.download = fileName;
					fakeLink.href = blob;
					document.body.appendChild(fakeLink);
					fakeLink.click();
					document.body.removeChild(fakeLink);
	
					fakeLink.remove();
				};
				downloadImage(image, 'gliphs.png');
			});
		} else {
			setAlert("Empty string!");
		}
		
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
							onClick={(e) => saveImage(e)}
						/>
						<div className="controlPanel">
							<button className="btn" onClick={clear}>
								Clear
							</button>
							<button className="btn" onClick={clearLast}>
								Remove last
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
			<div className="english">
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
			<a className="wrapperHref" href="mailto:lord180499@gmail.com">
				<div className="wrapperHrefCreator">created by Max Snega</div>
			</a>
			<div className={alert === "" ? "hideAlert" : "showAlert"}>{alert}</div>
		</div>
	);
}

export default App;
