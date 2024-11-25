// 创建Color用来管理顶层状态
export const ColorContext = createContext({});

// reducer
export const UPDATE_COLOR = "UPDATE_COLOR";
const reducer = (state, action) => {
	switch (action.type) {
		case UPDATE_COLOR:
			return action.color;
		default:
			return state;
	}
};

/**
 * 创建一个 Color 组件
 * Color 组件包裹的所有子组件都可以通过调用 ColorContext 访问到 value
 */
export const Color = (props) => {
	const [color, dispatch] = useReducer(reducer, "blue");

	return (
		<ColorContext.Provider value={{ color, dispatch }}>
			{props.children}
		</ColorContext.Provider>
	);
};

///////////////////////////////////////////////////////////////////////////////////////////////////

import { Color } from "./color";

function App() {
	return (
		<div className="App">
			<Color>
				<ShowArea />
				<Buttons />
			</Color>
		</div>
	);
}

///////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { ColorContext } from "./color";

const ShowArea = (props) => {
	const { color } = useContext(ColorContext);
	return <div style={{ color: color }}>字体颜色展示为{color}</div>;
};

///////////////////////////////////////////////////////////////////////////////////////////////////

// buttons.js

import React, { useContext } from "react";
import { colorContext, UPDATE_COLOR } from "./color";

const Buttons = (props) => {
	const { dispatch } = useContext(colorContext);
	return (
		<React.Fragment>
			<button
				onClick={() => {
					dispatch({ type: UPDATE_COLOR, color: "red" });
				}}
			>
				红色
			</button>
			<button
				onClick={() => {
					dispatch({ type: UPDATE_COLOR, color: "yellow" });
				}}
			>
				黄色
			</button>
		</React.Fragment>
	);
};
