const Customer = require("../models/Customer");

/* GetAll the Customers  */

const getCustomers = async (req, res) => {
  try {
    const customer = await Customer.find()
      .populate({
        path: "dietitianId",
        select: ["name"],
      })
      .populate({
        path: "advisorId",
        select: ["name"], // choose fields to return
      });
    // const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
};

const singleCustomer = async (req, res) => {
  try {
    // const cust = await Customer.findById({ _id: req.params.id });
    const cust = await Customer.findById(req.params.id);

    res.status(200).json(cust);
  } catch (error) {
    res.status(500).json(error);
  }
};

const dietitianWithReview = async (req, res) => {
  try {
    const reviews = await Review.find({ dietitianId: req.params.id }).populate(
      "customerId",
      "name"
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get dietitian with reviews
// router.get("/:id/reviews", async (req, res) => {
//   try {
//     const reviews = await Review.find({ dietitianId: req.params.id }).populate(
//       "customerId",
//       "name"
//     );
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

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

const createCustomer = async (req, res) => {
  try {
    //if (req.file) data.profileImage = req.file.path;

    const cust = new Customer({
      advisorId: req.body.advisorId,
      dietitianId: req.body.dietitianId,
      name: req.body.name,
      age: req.body.age,
      profileImage: req.file.path,
    });
    const customer = await cust.save();
    /*
       // Another way for Inserting the data
        const data = req.body;
        if (req.file) data.profileImage = req.file.path;
        const customer = await Customer.create(data);
    */

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update a post

const updateCustomer = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.profileImage = req.file.path;

    const updated = await Customer.findByIdAndUpdate(req.body.id, data, {
      new: true,
    }).select("-updatedAt");
    res.status(200).json({ data: updated });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Delete Customer */

const deleteCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndDelete(req.body.id);
    res.status(200).json({ msg: "data has been deleted" });
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
  getCustomers,
  createCustomer,
  updateCustomer,
  singleCustomer,
  dietitianWithReview,
  deleteCustomer,
};
