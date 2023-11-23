const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
const app = express();

app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb+srv://LIYuyao:leslie567@cluster0.xpkz7jh.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'shopping_cart';
const SECRETKEY = 'g46';

var users = new Array(
	{username: "user1", password: "123456"},
	{username: "user2", password: "654321"},
);

var documents = {};

app.use(session({
	userid: "session",  
	keys: [SECRETKEY]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const createDocument = function(db, createdocument, callback){
	const client = new MongoClient(url);
	client.connect(function(err){
	assert.equal(null, err);
	console.log("Connected to the MongoDB database successfully!");
	const db = client.db(dbName);

	db.collection('shopping_cart').inserOne(createdocument, function(err, res){
	if (err){
	throw error
};
	console.log(res);
	return callback();
});
});
}

const updataDocument = function(shopping_cart, updatedocument, callback) {
	const client = new MongoClient(url);
	client.connect(function(err){
	assert.equal(null, err);
	console.log("Connected to the MongoDB database successfully!");
	const db = client.db(dbName);

	let cursor = db.collection('shopping_cart').updateOne(db,
	{$set: updateducument});
	(err, res) =>{
	assert.equal(err, null);
	console.log(res);
	callback();
	};
});
}

const findDocument = function(db, shopping_cart, callback) {
	let cursor = db.collection('shopping_cart').find()
	cursor.forEach((doc) => {
	console.log(`Find Document: ${JSON.stringify(sc)}`);
	callback();
});
	const client = new MongoClient(url);
	client.connect(function(err, documents) {
	assert.equal(null, err);
	console.log(`Find Document: ${documents.length}`);

	const db = client.db(dbName);

	findDocuments(db, (err) => {
	client.close();
})
})
}

const handle_Find = function(req, shopping_cart){
	const client = MongoClient(url);
	client.connect(function(err){
		assert.equal(null, err);
		console.log("Connected successfully.");
		const db = client.db(dbName);
		
		findDocument(db, shopping_cart, function(docs){
			client.close();
			console.log("Connected closed.");
			res.status(200).render('show', {nitems: docs.length, items: docs});
		});
	});
};

const deleteDocuments = function(db, shopping_cart, callback) {
	console.log(shopping_cart);
	db.collection('shopping_cart').deleteOne(
	sc,
	(err, res) => {
	assert.equal(err, null);
	console.log(res);
	callback();
});
};

const handle_delete = function(res, shopping_cart) {
	const client = new MongClient(url);
	client.connect(function(err){
	console.log("Connect successful.");
	const db = client.db(dbName);
	let deletedocument = {};

	deletedocument['_id'] = ObjectID(sc._id);
	deletedocument['ownerid'] = shopping_cart.owner;
	console.log(deletedocument['_id']);
	console.log(deletedocument['ownerid']);	
	
	deleteDocument(db, deletedocument, function(res) {
	client.close();
	console.log("Connected close.");
	res.status(200).render('show', {message: "Document is deleted."});
})
});
}

const handle_Info = function(req, shopping_cart) {
	const client = new MongoClient(url);
	client.connect(function(err){
		assert.equal(null, err);
		console.log("Connected successufully.");
		const db = client.db(dbName);
		
		let documentID = {};
		documentID['_id'] = ObjectID(shopping_cart.id);
		findDocument(db, documentID, function(docs){
			client.close();
			console.log("Connection closed.");
			res.status(200).render('detail', {item: docs[0]});
		});
	});
}

const handle_Edit = function(res, shopping_cart) {
    const client = new MongoClient(url);
    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully.");
        const db = client.db(dbName);

        let documentID = {};
        documentID['_id'] = ObjectID(shopping_cart._id)
        let cursor = db.collection('shopping_cart').find(documentID);
        cursor.toArray(function(err,docs) {
            client.close();
            assert.equal(err,null);
            res.status(200).render('edit',{item: docs[0]});

        });
    });
}

app.get('/', function(req, res){
    if(!req.session.authenticated){
        console.log("No request...");
        res.redirect("/login");
    }else{
    	res.redirect("/login");
    }
});

//login
app.get('/login', function(req,res) {
	console.log("Welcome to the login page.");
	res.sendFile(__dirname + '/public/login.html');
	return res.status(200).render("login.ejs");
});

app.post('/login',function(req, res) {
	console.log("Handling...");
	for (var i=0; i<users.length; i++){
		if(users[i].username == req.body.username && users[i].password == req.body.password){
		req.session.authenticated = true;
		req.session.userid = users[i].username;
		console.log(req.session.userid);
		return res.status(200).redirect("/home");
	}
	}
	console.log("Error username or error password. Please enter again.")
	return res.redirect('/');
});

//logout
app.get('/logout', function(req,res){
	req.session = null;
	req.authenticated = false;
	res.redirect('/login');
});

app.get('/home', function(req,res) {
	console.log("Welcome to the home page.");
	return res.status(200).render("home");
});

app.get('/create', function(req, res){
    return res.status(200).render("create");
});

app.post('/search', function(req, res) {
	const client = new MongoClient(url);
	client.connect(function(err){
	assert.equal(null, err);
	console.log("connected successfully.");
	const db = client.db(dbName);
	
	var searchID = {};
	searchID['sc_id'] = req.body.sc_id;
	
	if(searchID, sc_id){
	console.log("searching...");
	findDocument(db, searchID, function(docs){
		client.close();
		console.log("Connection closed.");
		res.status(200).render('show', {quantity: docs.length, nitems: docs});
	});
	}else{
	console.log("Searching failed.");
	res.status(200).redirect('/search');
	}
	})
});

app.get('/search', function(req, res){
    return res.status(200).render("search");
});

app.post('/create', function(req, res) {
	const client = new MongoClient(url);
		console.log("Connect to the mongodb...");
		const db = client.db(dbName);
		
		documents["_id"] = ObjectID;
		documents['sc_id'] = req.body.sc_id
		documents["product"] = req.body.product;
		documents['quantity'] = req.body.quantity;
		documents['price'] = req.body.price;
		
		documents['userid'] = `${req.session.userid}`;
		
		if(documents.item){
			console.log('Creating the documents...');
			createDocument(db, documents, (req, res) => {
			client.close();
			console.log('mongodb closed.');
			return res.status(200).reder('show',{message:"Created successfully."});})
		}else{
			client.close();
			console.log('Mongodb connection closed.');
			return res.status(200).render('show',{message:"Created failed."});
		}
});

app.post('/update', function(req, res) {
	var updateDocument = {};
	const client = new MongoClient(url);
	client.connect(function(err){
	assert.equal(null, err);
	console.log('connected successfully.')
	
		if(req.body.quantity){
		documents['sc_id'] = req.body.sc_id;
		documents['username'] = req.body.username;
		documents["product"] = req.body.product;
		documents['quantity'] = req.body.quantity;
		documents['price'] = req.body.price;
		
		documents['userid'] = `${req.session.userid}`;
		
		let updateDocument = {};
		updateDocument['quantity'] = req.body.quantity;
		console.log(updateDocument);
		
		updateDocument(updateDoc, updateDocument, function(docs) {
			client.close();
			console.log("Connection closed.");
			return res.render('show', {message: "Updated successfully.."});
		})
		}else{
			return res.render('show', {message: "Updated failed."});
		}
		
	});
});

app.get('/edit', function(req,res) {
    handle_Edit(res, req.query);
})

app.get('/info', function(req,res) {
    handle_Info(res, req.query);
})

app.get('/delete', function(req,res) {
	if(req.query.username == req.session.userid){
		console.log("Waiting...");
		handle_Delete(req, res.query);
	}else{
		return res.status(200).render('show', {message: "Delete failed."});
	}
});

// RESTful
// insert
app.post('/api/app/sc_id/:sc_id', function(req, res){
	if (req.params.sc_id) {
        console.log(req.body)
        const client = new MongoClient(url);
        client.connect(function(err){
        assert.equal(null,err);
        console.log("Connected successfully.");
        const db = client.db(dbName);
        let newDocument = {};
        newDocument['sc_id'] = sc_id;

   	db.collection('shopping_cart').insertOne(newDocument, function(err,res){
                assert.equal(err,null);
                client.close()
		console.log("Closed MongoDB connection.");
                res.status(200).end()
                    });
          
                })
            }
        else {
        res.status(500).json({"error": "shopping cart id missing."});
    }
})


// find
app.get('/api/app/sc_id/:sc_id', function(req, res) {
	if (req.params.sc_id) {
	let shopping_cart = {};
	shopping_cart['sc_id'] = req.params.sc_id;
	const client = new MongoClient(url);
	client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connected sucessfully.");
	const db = client.db(dbName);

	findDocument(db, shopping_cart, function(docs){
	client.close();
	console.log("Closed MongoDB connection.");
	res.status(200).json(docs);
});
});
	}else {
	res.statud(500).json({"error": "Shopping cart id missing."});
}
})

// delete
app.delete('api/app/sc_id/:sc_id', function(req, res){
	if (req.params.sc_id) {
	let shopping_cart = {};
	shopping_cart['sc_id'] = req.params.sc_id;
	const client = new MongoClient(url);
	client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connected sucessfully.");
	const db = client.db(dbName);

	deleteOne(shopping_cart, function(err, res){
	assert.equal(err, null);
	client.close();
	console.log("Closed MongoDB connection.");
	res.status(200).end();
})
});
	}else {
	res.statud(500).json({"error": "Shopping cart id missing."});
}
})

// update
app.put('api/app/sc_id/:sc_id', function(req, res){
	if (req.params.sc_id) {
	let shopping_cart = {};
	shopping_cart['sc_id'] = req.params.sc_id;
	const client = new MongoClient(url);
	client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connected sucessfully.");
	const db = client.db(dbName);

	updateDocument(db, sc, function(docs){
	client.close();
	console.log("Closed MongoDB connection.");
	res.status(200).end();
});
});
	}else {
	res.statud(500).json({"error": "Shopping cart id missing."});
}
})

app.listen(process.env.PORT || 1106);
