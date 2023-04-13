const express = require("express");
const mongoose = require("mongoose");

const PostMessage = require('../models/postMessage.js');

const router = express.Router();

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const createPost = async (req, res) => {
  let { title, message, selectedFile, creator } = req.body;
  // split tags at commas to make an array
  let tags = req.body.tags.split(',').map(tag => tag.trim());
  console.log(req.body);
  const newPost = new PostMessage({ title, message, selectedFile, creator, tags })
  console.log(newPost);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  }
  catch (error) {
    res.status(409).json({ message: error.message });
  }

}

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}



module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}