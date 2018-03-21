var http = require('http');
var fs = require("fs");

http.createServer(function(request, response) {

	if(request.url === "/index"){
		//sendFileContent(response, "callajax.html", "text/html");
		sendFileContent(response, "index.html", "text/html");
	}
	else if(request.url ==="/getContent"){
		sendFileContent(response, "getContent.php", "application/x-httpd-php-source");
	}
	else if(request.url ==="/getContent2"){
		sendFileContent(response, "getContent.html", "text/x-php");
	}
	else if(request.url === "/mypage"){
		sendFileContent(response, "mypage.html", "text/html");
	}
	else if(request.url === "/signup"){
		sendFileContent(response, "signup.html", "text/html");
	}
	else if(request.url === "/login"){
		sendFileContent(response, "login.html", "text/html");
	}
	else if(request.url === "/forgot"){
		sendFileContent(response, "forgot.html", "text/html");
	}
	else if(request.url === "/workshop1"){
		sendFileContent(response, "workshop1.html", "text/html");
	}else if(request.url === "/workshop2"){
		sendFileContent(response, "workshop2.html", "text/html");
	}else if(request.url === "/workshop3"){
		sendFileContent(response, "workshop3.html", "text/html");
	}else if(request.url === "/workshop4"){
		sendFileContent(response, "workshop4.html", "text/html");
	}else if(request.url === "/workshop5"){
		sendFileContent(response, "workshop5.html", "text/html");
	}else if(request.url === "/workshop6"){
		sendFileContent(response, "workshop6.html", "text/html");
	}else if(request.url === "/workshop7"){
		sendFileContent(response, "workshop7.html", "text/html");
	}else if(request.url === "/workshop8"){
		sendFileContent(response, "workshop8.html", "text/html");
	}else if(request.url === "/news1"){
		sendFileContent(response, "news1.html", "text/html");
	}else if(request.url === "/news2"){
		sendFileContent(response, "news2.html", "text/html");
	}else if(request.url === "/news3"){
		sendFileContent(response, "news3.html", "text/html");
	}else if(request.url === "/news4"){
		sendFileContent(response, "news4.html", "text/html");
	}else if(request.url === "/news5"){
		sendFileContent(response, "news5.html", "text/html");
	}else if(request.url === "/news6"){
		sendFileContent(response, "news6.html", "text/html");
	}else if(request.url === "/"){
		console.log("Requested URL is url" +request.url);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.prettyPhoto.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.isotope.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.easing.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/]*.min.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/]*.awesome.min.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpg");
	}
	else if(/^\/[a-zA-Z0-9\/]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/png");
	}
	else if(/^\/[a-zA-Z0-9\/]*.ico$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/x-icon");
	}
	else if(/^\/[a-zA-Z0-9\/]*.gif$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/gif");
	}
	else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.woff/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/font-woff");
	}
	else if(/^\/[a-zA-Z0-9\/]*fontawesome-webfont.ttf/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/x-font-ttf");
	}
	else if(/^\/[a-zA-Z0-9\/]*fontawesome-webfont.svg/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/svg+xml");
	}
	else if(/^\/[a-zA-Z0-9\/]*fontawesome-webfont.eot/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/vnd.ms-fontobject");
	}
	else if(/^\/[a-zA-Z0-9\/]*.otf/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/font-otf");
	}

	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(9999)

function sendFileContent(response, fileName, contentType){
	console.log("My 305cd is: " + fileName);
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}