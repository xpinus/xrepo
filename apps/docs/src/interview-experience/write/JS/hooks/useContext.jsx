function useContext(context) {
	return context._currentValue;
}

// 父组件
const CountCtx = React.createContext();
function ParentComp() {
	const [state, setState] = React.useState({ number: 0 });
	return (
		<CountCtx.Provider value={{ state, setState }}>
			<Child />
		</CountCtx.Provider>
	);
}

// 子组件
function Child() {
	let { state, setState } = useContext(CountCtx);
	return (
		<div>
			<p>{state.number}</p>
			<button onClick={() => setState({ number: state.number + 1 })}>
				add
			</button>
		</div>
	);
}
