import { useState } from 'react';
import './App.css';

function App() {
	const [expr, setExpr] = useState('');
	const [ans, setAns] = useState('0');

	const addNumber = (num: string) => {
		setExpr(expr + num);
	};
	const addOperation = (op: string) => {
		setExpr(expr + op);
	};

	const backspace = () => {
		let temp = expr.slice(0, -1);
		setExpr(temp);
	};
	const clear = () => setExpr('');
	const evaluate = () => {
		let temp = expr;
		temp = temp.replace('÷', '/');
		temp = temp.replace('x', '*');
		setAns(eval(temp));
	};

	const NumBtn = ({ val }: { val: string }) => (
		<button className="num" onClick={() => addNumber(val)}>
			{val}
		</button>
	);

	const OpBtn = ({ op }: { op: string }) => (
		<button className="op" onClick={() => addOperation(op)}>
			{op}
		</button>
	);

	return (
		<div className="container">
			<div className="calc">
				<div className="calc-inner">
					<div className="calc-top">
						<p className="expression">{expr}</p>
						<p className="answer">{ans}</p>
					</div>

					<div className="calc-bottom">
						<div className="calc-row">
							<button style={{ flex: 3 }} onClick={clear}>
								C
							</button>
							<OpBtn op="÷" />
						</div>
						<div className="calc-row">
							<NumBtn val="7" />
							<NumBtn val="8" />
							<NumBtn val="9" />
							<OpBtn op="x" />
						</div>
						<div className="calc-row">
							<NumBtn val="4" />
							<NumBtn val="5" />
							<NumBtn val="6" />
							<OpBtn op="-" />
						</div>
						<div className="calc-row">
							<NumBtn val="1" />
							<NumBtn val="2" />
							<NumBtn val="3" />
							<OpBtn op="+" />
						</div>
						<div className="calc-row">
							<NumBtn val="0" />
							<NumBtn val="." />
							<button onClick={backspace}>
								<i className="bi bi-backspace"></i>
							</button>
							<button className="equals" onClick={evaluate}>
								=
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
