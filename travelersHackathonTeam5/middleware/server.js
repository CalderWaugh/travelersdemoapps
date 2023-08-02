require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const brcypt = require('bcrypt');
const cors = require('cors');

const User = require("./models/User");
const Item = require("./models/Item");
const Cart = require("./models/Cart");
const Checkout = require('./models/Checkout');

const app = express();
const port = process.env.PORT || 8081;

var corsOption = {
  origin: ["http://localhost:3000"],
};

app.use(express.json());

app.use(cors({
    origin: '*'
}));

mongoose.connect("mongodb://localhost:27017/store", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user already created
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await brcypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const passwordMatch = await brcypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate a jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "An error occurred" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = user.userId;
    next();
  });
}

app.get("/checkout/cart", authenticateToken, async (req, res) => {
  try {
    const customerCart = await Cart.findOne({ userId: req.userId });
    if (customerCart) {
      const createCart = new Checkout({
        userId: req.userId,
        items: customerCart.items,
        price: customerCart.price
      });
      await createCart.save();
      await Cart.deleteOne({userId: req.userId});
      res.json({ message: "cart checkedout" });
    } else {
      res.status(404).json({ errorMessage: "No Cart Found" });
    }
    
  } catch (err) {
    console.log(`Error searching item ${err}`);
    res.status(500).json({ errorMessage: "An error occurred" });
  }
});

app.post("/add/cart", authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.body;
    const existingCart = await Cart.findOne({ userId: req.userId });
    if (!existingCart) {
      
      const createCart = new Cart({
        userId: req.userId,
        items: [parseInt(itemId)],
      });
      await createCart.save();
    } else {
      let temp = existingCart.items;
      temp.push(parseInt(itemId))
      existingCart.items = temp;
      await existingCart.save();
    }
    res.json({ message: "cart updated" });
  } catch (err) {
    console.log(`Error searching item ${err}`);
    res.status(500).json({ errorMessage: "An error occurred" });
  }
});

app.get("/get/cart", authenticateToken, async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userId: req.userId });
    if (!existingCart) {
      res.json({ message: "No cart found" });
    } else {
      let itemList = [];
      let totalPrice = 0;
      for (let id of existingCart.items) {
        const item = await Item.findOne({ id });
        if (item) {
          itemList.push({ name: item.name, price: item.price.toString() });
          totalPrice += parseFloat(item.price);
        }
      }
      let ret = { items: itemList, price: totalPrice.toFixed(2) };
      res.json(ret);
    }
  } catch (err) {
    console.log(`Error searching item ${err}`);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/get/cart/size", authenticateToken, async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userId: req.userId });
    if (!existingCart) {
      res.json({ size: 0 });
    } else {
      res.json({ size: existingCart.items.length});
    }
  } catch (err) {
    console.log(`Error searching item ${err}`);
    res.status(500).json({ message: "An error occurred" });
  }
})

app.get("/", authenticateToken, (req, res) => {
  res.json({ message: "OK" });
});

// Utility functions to add items to mongodb
app.post("/add/item", authenticateToken, async (req, res) => {
  try {
    const { id, name, price, categories } = req.body;
    const existingItemId = await Item.findOne({ id });
    if (existingItemId) {
      return res
        .status(409)
        .json({ message: "Item with this id already exists" });
    }
    const existingItemName = await Item.findOne({ name });
    if (existingItemName) {
      return res
        .status(409)
        .json({ message: "Item with this name already exists" });
    }
    // Create a new item
    const item = new Item({ id, name, price, categories });
    await item.save();
    res.json({ message: "Item added" });
  } catch (err) {
    console.log(`Error creating item ${err}`);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/get/items/:name", async (req, res) => {
  try {
    const items = await Item.find({
      name: { $regex: new RegExp(req.params.name), $options: "i" },
    });
    if (!items) {
      return res.status(404).json({ message: "No values found" });
    }
    res.json(items);
  } catch (err) {
    console.log(`Error searching item ${err}`);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get('/get/items', async (req, res) => {
    try {
        const items = await Item.find();
        if(!items) {
            return res.status(404).json({message: 'No values found'});
        }
        res.json(items);
    } catch(err) {
        console.log(`Error searching item ${err}`)
        res.status(500).json({ message: 'An error occurred'});
    }
  });

app.get("/get/category/:category", async (req, res) => {
  try {
    const items = await Item.find({ categories: req.params.category });
    if (!items) {
      return res.status(404).json({ message: "No values found" });
    }
    res.json(items);
  } catch (err) {
    console.log(`Error searching item ${err}`);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
