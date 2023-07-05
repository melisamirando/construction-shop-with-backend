const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true }));

const PORT = 4001

let products = [
    {
        id: 1,
        title: "High Quality Smart Card Keyless Digital",
        price: 100.0,
        quantity: 0,
        // image: images1,
      },
      {
        id: 2,
        title: "High Security Smart Door Lock Wi-Fi",
        price: 200.0,
        quantity: 0,
        // image: images2,
      },
      {
        id: 3,
        title: "Newest BLE Smart Locks Door Knob",
        price: 250.0,
        quantity: 0,
        // image: images3,
      },
      {
        id: 4,
        title: "Safety Cat Eyes Camera View Electric Digital",
        price: 250.0,
        quantity: 0,
        // image: images4,
      },
]


// responds to requests on root URL '/', e.g. localhost:3001/
app.get('/', (req,res) => {
    res.send('<h1>Hello Everyone!</h1>')
});

// get all contents of database
app.get('/api/products', (req,res) => {
	res.json(products)
});

// get a single entry by id
app.get('/api/products/:id', (req,res) => {
	const id = Number(req.params.id)
    const product = products.find(product => product.id === id)
    res.json(product)
});

// delete an entry, 
app.delete('/api/products/:id', (req,res) => {
    const id  = Number(req.params.id)
    products = products.filter(product => product.id !== id)
    res.send('Deleted successfully').end();
});

// add a new entry
app.post('/api/products', (req,res) => {
    const maxId = products.length > 0
        ? Math.max(...products.map(n => n.id))
        : 0;
    const product = req.body;

    products.push(product);

    res.json(product);
});


app.patch('/api/products/:id', (req,res) => {
    const id = Number(req.params.id);
    const updateproduct = req.body;
    products = products.map(product => {
        if (product.id === id) {
            return  { ...products, ...updateproduct };
        }
        return product;
});
res.json(products.find(product => product.id === id));
});

app.put('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const updateproduct = req.body;
    products = products.map(product => {
        if (product.id === id) {
            return  { ...products, ...updateproduct };
        }
        return product;
});
res.json(products.find(product => product.id === id));

});


// starts server on port 4001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});