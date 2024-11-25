const React = require("react");
const Home = (props) => {
	return (
		<div>
			<div>This is home</div>
			<button
				onClick={() => {
					alert("事件触发");
				}}
			>
				点击
			</button>
		</div>
	);
};

module.exports = Home;
