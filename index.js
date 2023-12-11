const fs = require("fs");
const http = require("http");
const url = require("url");

// Maps routes to corresponding HTML file paths
const routes = {
	"/": "./pages/index.html",
	"/about": "./pages/about.html",
	"/contact-me": "./pages/contact-me.html",
};

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url);

	// Get the corresponding HTML file path for the route
	const filePath = routes[parsedUrl.pathname] || "./pages/404.html";

	// Read the corresponding HTML file
	fs.readFile(filePath, (err, data) => {
		if (err) {
			// If an error occurs, send a "404 Not Found" response
			res.writeHead(404, { "Content-Type": "text/html" });
			res.write("404 Not Found");
		} else {
			// If the file is successfully read, send the content as response
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write(data);
		}
		res.end();
	});
});

server.listen(3000, () => {
	console.log("Server is running...");
});
