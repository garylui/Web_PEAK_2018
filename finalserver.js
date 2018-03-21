


(function() {
  var fs, http, qs, server, url;

	var MongoClient = require('mongodb').MongoClient;
	var dburl = "mongodb://localhost:27017/";
	
  http = require('http');

  url = require('url');

  qs = require('querystring');

  fs = require('fs');

	var express = require('express');
	var app = express();
	
	
	
  server = http.createServer(function(request, response) {
    var action, form, formData, msg, publicPath, urlData;
		var req = request;
		var res = response;
    urlData = url.parse(request.url, true);
    action = urlData.pathname;
    publicPath = __dirname + "\\public\\";
   console.log(request.url);
    if (action === "/signup") {
       console.log(".....Loading signup page.....");
      if (req.method === "POST") {
        console.log("action = post");
				console.log("Requesting signup");
        formData = '';
        msg = '';				
        return req.on('data', function(data) {
          formData += data;
					//console.log("form data="+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);          
            msg = JSON.stringify(user);
						var	stringMsg = JSON.parse(msg);
						console.log("\tUser input: "+msg);
						MongoClient.connect(dburl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("asm");
							dbo.collection("profile").find({}).toArray(function(err, result) {
								if (err) throw err;
								var checking = 1;
								for (i = 0; i < result.length; i++) { 
									if(result[i].account === stringMsg.account){
										console.log("\t\tExisting Account Found");
										checking = 0;
										response.writeHead(200, {
											"Content-Type": "text/html"
										});
										return response.end("fail");
									}
								}
								if(checking === 1){
									console.log("\t\tAccount have not used. A new record is going to add");
									console.log("\t\t...Assigning ID...");
									var id = "-1";
									var fav = 0;
									console.log("\t\tID: "+result.length);
									user.id = result.length.toString();
									user.fav = fav;
									msg =  msg = JSON.stringify(user);
								  stringMsg = JSON.parse(msg);
									console.log("\Prepared input: "+msg);
									var myobj = stringMsg;
									dbo.collection("profile").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
									});
									
									response.writeHead(200, {
										"Content-Type": "text/html"
									});
									return response.end("success");
								}
								db.close();
							});	
							
						});
         /*
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Content-Length": msg.length
            });
            return res.end();
					
						*/
          });
        });
				
      } else {
				console.log("not post");
        //form = publicPath + "ajaxSignupForm.html";
				
        form = "signup.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }
    } else if( action==="/newpage"){		
       response.writeHead(200, {
        "Content-Type": "text/html"
      });
      return response.end("<h1>w{Node.jsO2</h1><p><a href=\"/Signup\">U</a></p>");
    }
		else if(request.url === "/postSignup"){
			sendFileContent(response, "postSignup.html", "text/html");
		}
		else if(request.url === "/mypage"){
			sendFileContent(response, "mypage.html", "text/html");
		}
		else if(request.url === "/login"){
			console.log(".....Loading login page.....");
			if (req.method === "POST") {
        console.log("action = post");
				console.log("Requesting login")
        formData = '';
        msg = '';				
        return req.on('data', function(data) {
          formData += data; 
          //console.log("\tform data: "+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);          
            msg = JSON.stringify(user);
						var	stringMsg = JSON.parse(msg);
						console.log("\tUser input: "+msg);
						
						MongoClient.connect(dburl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("asm");
							dbo.collection("profile").find({}).toArray(function(err, result) {
								if (err) throw err;
								var checking =-1;
								for (i = 0; i < result.length; i++) { 
										if(result[i].account === stringMsg.account){
											console.log("\tAcount Found");
											console.log("\t\tHandling account: "+stringMsg.account);
											console.log("\t\t...Confirming Password...");
											if(result[i].password === stringMsg.password){
												console.log("\t\tPassword Confirmed");
												checking = 1;
												response.writeHead(200, {
													"Content-Type": "text/html"
												});
												return response.end("success,"+result[i].lastName+","+result[i].id+","+result[i].fav);
											}else{
												checking = 0;
											}						
											break;
										}
								}
								
								if(checking === 0){
									console.log("\t\tPassword Wrong");
									response.writeHead(200, {
										"Content-Type": "text/html"
									});
									return response.end("fail");
								}
								else if(checking === -1){
									console.log("\t\tAccount NOT Found.");
									response.writeHead(200, {
										"Content-Type": "text/html"
									});
									return response.end("fail");
								}								
								else{
									console.log("\tSysErr|checking: "+checking);
									
								}
								db.close();
							});	
						
						});
					
            /*res.writeHead(200, {
              "Content-Type": "application/json",
              "Content-Length": msg.length
            });
            return res.end();
					*/
						
          });
        });
			}
			else
			{
				sendFileContent(response, "login.html", "text/html");
			}
		}else if(request.url === "/fav"){
			console.log(".....Loading home page.....");
			if (req.method === "POST") {
        console.log("action = post");
				console.log("Requesting favourite list manage");
        formData = '';
        msg = '';				
        return req.on('data', function(data) {
          formData += data; 
          console.log("\tform data: "+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);          
            msg = JSON.stringify(user);
						var	stringMsg = JSON.parse(msg);
						console.log("\tUser input: "+msg);
						
						MongoClient.connect(dburl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("asm");
							dbo.collection("profile").find({}).toArray(function(err, result) {
								
								if (err) throw err;
								var checking =-1;
								for (i = 0; i < result.length; i++) { 
										if(result[i].id === stringMsg.id){
											console.log("\tRecord Found");
											console.log("\t\tOriginal fav: "+result[i].fav);
											var myquery = { id: stringMsg.id };
											var newvalues = { $set: {fav: stringMsg.fav } };
											dbo.collection("profile").updateOne(myquery, newvalues, function(err, res) {
												if (err) throw err;
												console.log("1 document updated");
											});
											console.log("\t\tChanged to: "+stringMsg.fav);
											
											
											
											response.writeHead(200, {
												"Content-Type": "text/html"
											});
											return response.end(stringMsg.fav);
											break;
										}
								}
								db.close();
							});							
						});			
          });
        });
			}
			else
			{
				sendFileContent(response, "index.html", "text/html");
			}
		}else if(request.url === "/myfav"){
			console.log(".....Loading favourite list.....");
			if (req.method === "POST") {
        console.log("action = post");
				console.log("Requesting favourite data");
        formData = '';
        msg = '';				
        return req.on('data', function(data) {
          formData += data; 
          console.log("\tform data: "+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);          
            msg = JSON.stringify(user);
						var	stringMsg = JSON.parse(msg);
						console.log("\tUser input: "+msg);
						
						MongoClient.connect(dburl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("asm");
							dbo.collection("profile").find({}).toArray(function(err, result) {
								
								if (err) throw err;
								var checking =-1;
								for (i = 0; i < result.length; i++) { 
										if(result[i].id === stringMsg.id){
											console.log("\tRecord Found");
											console.log("\t\tfav value: "+ result[i].fav);
											response.writeHead(200, {
												"Content-Type": "text/html"
											});
											return response.end(result[i].fav);
											break;
										}
								}
								db.close();
							});					
						});
          });
        });
			}
			else
			{
				sendFileContent(response, "index.html", "text/html");
			}
		}else if(request.url === "/sendMessage"){
			console.log(".....Leave customer message.....");
			if (req.method === "POST") {
        console.log("action = post");
				console.log("Requesting database");
        formData = '';
        msg = '';				
        return req.on('data', function(data) {
          formData += data; 
				
          console.log("\tform data: "+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);          
            msg = JSON.stringify(user);
						var	stringMsg = JSON.parse(msg);
						console.log("\tUser input: "+msg);
						
						MongoClient.connect(dburl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("asm");
								 msg = JSON.stringify(user);
								  stringMsg = JSON.parse(msg);
									console.log("\Prepared input: "+msg);
									var myobj = stringMsg;
									dbo.collection("customers").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
									});
									
									response.writeHead(200, {
										"Content-Type": "text/html"
									});
									return response.end("Thank you");
								db.close();
							});					
						});
         
        });
			}
			else
			{
				sendFileContent(response, "index.html", "text/html");
			}
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

    else {
      
      console.log("callhtml");
		sendFileContent(res, "index.html", "text/html");

     
      //res.writeHead(200, {
      //  "Content-Type": "text/html"
     // });
      //return res.end("<h1>�w����{Node.js�泾���O</h1><p><a href=\"/Signup\">���U</a></p>");
    }
  });

  server.listen(9999);

  console.log("Server is runnin Atime is" + new Date());

  
  
  
  
  
function sendFileContent(response, fileName, contentType){
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
}).call(this);


