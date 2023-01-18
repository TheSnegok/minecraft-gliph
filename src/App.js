import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import Gliph from "./component/Gliphs/Gliph";
import "./App.css";

function App() {
	const [value, setValue] = useState("");
	const [alert, setAlert] = useState({ show: false, text: "Error!" });

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
		if (e.target.value.length < 50) {
			const regExp = /^[a-zA-Z|\s]+$/;
			setValue(
				e.target.value === ""
					? e.target.value
					: e.target.value.match(regExp) === null
					? value + ""
					: e.target.value.match(regExp).input
			);
		}
	};

	const saveImage = (e) => {
		if (e.target.value !== "") {
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
				downloadImage(image, "gliphs.png");
			});
		} else {
			setAlert({ show: true, text: "Empty string!" });
		}
	};

	useEffect(() => {
		if (alert.show === true) {
			setTimeout(
				() => setAlert((alert) => ({ show: false, text: alert.text })),
				3000
			);
		}
	}, [alert]);

	return (
		<div className="App">
			<main>
				<div className="gliph">
					<div className="gliphArea">
						<div className="wrapperHeading">
							<h1>Gliphs</h1>
						</div>
						<div className="inputLine">
							<textarea
								className="gliphs"
								value={value}
								readOnly
								rows={5}
								columns={10}
								onClick={(e) => !alert.show && saveImage(e)}
							></textarea>
							<div className="helper">Click for download!</div>
						</div>
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
					<div className="inputLine">
						<textarea
							value={value}
							className="translate"
							onChange={validation}
							readOnly
							rows={5}
						></textarea>
					</div>
				</div>
			</div>
			<a className="wrapperHref" href="mailto:lord180499@gmail.com">
				<div className="wrapperHrefCreator">created by Max Snega</div>
			</a>
			<div className={alert.show === false ? "hideAlert" : "showAlert"}>
				<span>{alert.text}</span>
			</div>
		</div>
	);
}

export default App;
