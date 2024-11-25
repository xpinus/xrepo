const Koa = require("koa");
const koaStatic = require("koa-static");
const path = require("path");

require("node-jsx").install(); // 处理jsx的引入，否则报错

const app = new Koa();

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const Home = require("../components/Home.js");

const content = ReactDOMServer.renderToString(React.createElement(Home));

// 静态资源 client.js
app.use(koaStatic(path.join(__dirname, "../../public")));

// response
app.use((ctx) => {
	ctx.body = `
  <html>
    <head>
      <title>hello react ssr</title>
    </head>
    <body>
     <div id="root">${content}</div>
    </body>
    <script  src="./client.js"></script>
  </html>
`;
});

app.listen(3000, () => {
	console.log("http://localhost:3000/ start");
});
