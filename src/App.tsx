import { useState } from 'react';
import './App.css';

function App() {
	return (
		<div className="container">
			<div className="calc">
				<div className="calc-top">
					<p className="expression">346+74*13.6</p>
					<p className="answer">1352.4</p>
				</div>
				<div className="calc-bottom"></div>
			</div>
		</div>
	);
}

export default App;
