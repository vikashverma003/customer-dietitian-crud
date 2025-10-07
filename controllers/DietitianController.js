const Dietitian = require("../models/Dietitian");
const upload = require("../middleware/upload");
const generateToken = require("../utils/generateToken");

/******** Token based Authentication ***********/

const register = async (req, res) => {
  const { name, age, email, password } = req.body;
  try {
    const exists = await Dietitian.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const customer = await Dietitian.create({ name, age, email, password });
    const token = generateToken(customer._id, "dietitian");

    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Dietitian.findOne({ email });
    if (!customer) return res.status(404).json({ message: "User not found" });

    const isMatch = await customer.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(customer._id, "dietitian");
    res.json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/************END*********/

/* GetAll the Customers  */

const getDietitians = async (req, res) => {
  try {
    const dietitian = await Dietitian.find();
    res.status(200).json(dietitian);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Create Customer */

/* const createPost = (req, res) => { 
  const post = new Post({
    userId: req.body.user_id,
    desc: req.body.desc,
  });

  post.save((err, post) => { 
    if (err) { console.log(err);
      res.send(err);
    }
    res.json(post);
  });
}; */

const createDietitian = async (req, res) => {
  try {
    const cust = new Dietitian({
      name: req.body.name,
      age: req.body.age,
      profileImage: req.file.path,
    });
    const dietitian = await cust.save();
    /*
       // Another way for Inserting the data
        const data = req.body;
        if (req.file) data.profileImage = req.file.path;
        const customer = await Customer.create(data);
    */

    res.status(200).json(dietitian);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update a post

const updateDietitian = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.profileImage = req.file.path;

    const updated = await Dietitian.findByIdAndUpdate(req.body.id, data, {
      new: true,
    }).select("-updatedAt");
    res.status(200).json({ data: updated });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Like a post

// const likePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.body.id);
//     if (!post.likes.includes(req.body.userId)) {
//       await post.updateOne({ $push: { likes: req.body.userId } });
//       res.status(200).json("The post has been liked");
//     } else {
//       await post.updateOne({ $pull: { likes: req.body.userId } });
//       res.status(200).json("The post has been disliked");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// Delete Post

// const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.body.id);
//     if (post.userId === req.body.userId) {
//       await post.deleteOne();
//       res.status(200).json("the post has been deleted");
//     } else {
//       res.status(403).json("you can delete only your post");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// router.put("/:id", async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       if (post.userId === req.body.userId) {
//         await post.updateOne({ $set: req.body });
//         res.status(200).json("the post has been updated");
//       } else {
//         res.status(403).json("you can update only your post");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

/* const updateTodo = (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.todoID },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      },
    },
    { new: true },
    (err, Todo) => {
      if (err) {
        res.send(err);
      } else res.json(Todo);
    }
  );
};

const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.todoID })
    .then(() => res.json({ message: "Todo Deleted" }))
    .catch((err) => res.send(err));
}; */

module.exports = {
  getDietitians,
  createDietitian,
  updateDietitian,
  register,
  login,
};
