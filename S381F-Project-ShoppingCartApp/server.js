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

var users = new Array(
	{username: "user1", password: "123456"},
	{username: "user2", password: "654321"},
);

var documents = {};

app.use(session({
	secrect: 'g46',
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const createDocuments = function(db, createdocuments, callback){
	const client = new MongoClient(url);
	client.connect(function(err){
	assert.equal(null, err);
	console.log("Connected to the MongoDB database successfully!");
	const db = client.db(dbName);

	db.collection('shopping_cart').inserOne(createdocuments, function(err, res){
	if (err){
	throw error
};
	console.log(res);
	return callback();
});
});
}

const updataDocuments = function(sc, updatedocuments, callback) {
	const client = new MongoClient(mongourl);
	client.connect(function(err){
	assert.equal(null, err);
	console.log("Connected to the MongoDB database successfully!");
	const db = client.db(dbName);

	let cursor = db.collection('shopping_cart').updateOne(db,
	{$set: updateducuments});
	(err, res) =>{
	assert.equal(err, null);
	console.log(res);
	callback();
	};
});
}

const findDocuments = function(sc, sc, callback) {
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

const handle_Find = function(req, sc){
	const client = MongoClient(mongourl);
	client.connect(function(err){
		assert.equal(null, err);
		console.log("Connected successfully.");
		const db = client.db(dbName);
		
		findDocuments(db, sc, function(docs){
			client.close();
			console.log("Connected closed.");
			res.status(200).render('show', {nItems: docs.length, items: docs});
		});
	});
};

const deleteDocuments = function(db, sc, callback) {
	console.log(sc);
	db.collection('shopping_cart').deleteOne(
	sc,
	(err, res) => {
	assert.equal(err, null);
	console.log(res);
	callback();
});
};

const handle_delete = function(res, sc) {
	const client = new MongClient(mongourl);
	client.connect(function(err){
	console.log("Connect successful.");
	const db = client.db(dbName);
	let deletedocument = {};

	deletedocument['_id'] = ObjectID(sc._id);
	deletedocument['ownerid'] = sc.owner;
	console.log(deletedocument['_id']);
	console.log(deletedocument['ownerid']);	
	
	deleteDocument(db, deletedocument, function(res) {
	client.close();
	console.log("Connected close.");
	res.status(200).render('show', {message: "Document is deleted."});
})
});
}

const handle_Detail = function(req, sc) {
	const client = new MongoClient(mongourl);
	client.connect(function(err){
		assert.equal(null, err);
		console.log("Connected successufully.");
		const db = client.db(dbName);
		
		let documentID = {};
		documentID['_id'] = ObjectID(sc.id);
		findDocument(db, documentID, function(docs){
			client.close();
			console.log("Connection closed.");
			res.status(200).render('detail', {item: docs[0]});
		});
	});
}

app.get('/', (req, res) =>{
    if(!req.session.authenticated){
        console.log("No request...");
        res.redirect("/login");
    }else{
    	res.redirect("/login");
    }
});

//login
app.get('/login',(req,res) => {
	console.log("Welcome to the login page.");
	res.sendFile(__dirname + '/public/login.html');
	return res.status(200).render("login.ejs");
});

app.post('/login',(req, res) =>{
	res.send("Handling...");
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
app.get('/logout', (req,res) =>{
	req.session.destroy((err) =>{
	if(err){
		console.log('Error destroying session:', err);
	}else{
		res.send('Logged out successufully.');
	}
	});
});

app.get('/home', (req,res) => {
	console.log("Welcome to the home page.");
	return res.status(200).renser("home");
});

app.get('/create', function(req, res){
    return res.status(200).render("create");
});

app.post('/search', (req, res) => {
	const client = new MongoClient(mongourl);
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
		res.status(200).render('show', {quantity: docs.length, items: docs});
	});
	}else{
	console.log("Searching failed.");
	res.status(200).redirect('/find');
	}
	})
});

app.post('/create', (req, res) => {
	const client = new MongoClient(mongourl);
		console.log("Connect to the mongodb...");
		const db = client.db(dbName);
		
		documents["_id"] = ObjectID;
		documents['sc_id'] = req.body.sc_id
		documents["item"] = req.body.item;
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

app.post('/update', (req, res) => {
	var updateDocument = {};
	const client = new MongoClient(mongourl);
	client.connect(function(err){
	console.log('connected successfully.')
	
		if(req.body.quantity){
		documents['sc_id'] = req.body.sc_id;
		documents['username'] = req.body.username;
		documents["item"] = req.body.item;
		documents['quantity'] = req.body.quantity;
		documents['price'] = req.body.price;
		
		documents['userid'] = `${req.session.userid}`;
		
		let updateDocument = {};
		updateDocument['quantity'] = req.body.quantity;
		console.log(updateDocument);
		
		updateDoc(updateDocument, updateDoc, (docs) => {
			client.close();
			console.log("Connection closed.");
			return res.render('show', {message: "Updated successfully.."});
		})
		}else{
			return res.render('show', {message: "Updated failed."});
		}
		
	});
});

app.get('/delete', (req,res) => {
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
        const client = new MongoClient(mongourl);
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
	const client = new MongoClient(mongourl);
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
	const client = new MongoClient(mongourl);
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
	const client = new MongoClient(mongourl);
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
