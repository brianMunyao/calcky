import { useState } from 'react';
import './App.css';
import { addCommas, checkDP, toExponent } from './utils';

const MATH_ERROR = 'Math Error';
const ANS = 'Ans';
const NUM_DEFAULT = '0';

const DIVISION = '÷';
const PRODUCT = 'x';

function App() {
	const [expr, setExpr] = useState('');
	const [ans, setAns] = useState('0');

	const [tempAns, setTempAns] = useState('');

	const [numLock, setNumLock] = useState(true);
	const [opLock, setOpLock] = useState(false);

	const addNumber = (num: string) => {
		if (num === '.' && expr.endsWith('.')) return;

		if (num === '0' && numLock) return;

		if (tempAns.length > 0) {
			setExpr(num);
			setTempAns('');
		} else {
			setExpr(expr + num);
		}

		setNumLock(false);
	};
	const addOperation = (op: string) => {
		if ((op === DIVISION || op === PRODUCT) && opLock) return;

		if (tempAns.length > 0) {
			setExpr(tempAns + op);
			setTempAns('');
		} else {
			setExpr(expr + op);
		}

		if (op === DIVISION || op === PRODUCT) setOpLock(true);
		setNumLock(true);
	};

	const backspace = () => setExpr(expr.slice(0, -1));

	const clear = () => {
		setExpr('');
		if (expr === '') {
			setAns('0');
			setTempAns('');
			setNumLock(true);
			setOpLock(false);
		}
	};
	const evaluate = () => {
		if (expr !== '') {
			try {
				let temp = expr;
				temp = temp.replace('÷', '/');
				temp = temp.replace('x', '*');

				let res_num = checkDP(eval(temp));
				let res_str = res_num.toString();

				if (res_num > 100000000) {
					res_str = toExponent(res_num);
				}

				setAns(res_str);
				setTempAns(res_str);

				setOpLock(false);
			} catch (e) {
				setAns(MATH_ERROR);
			}
		}
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
						<p
							className="answer"
							style={{
								color:
									ans === MATH_ERROR ? '#f5958c' : 'inherit',
							}}
						>
							{addCommas(ans)}
						</p>
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
