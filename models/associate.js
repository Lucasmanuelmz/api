const Post = require('./postModel');
const Category = require('./categoryModel');
const User = require('./userModels');
const Comment = require('./commentModel');

exports.associateModels = () => {
Comment.belongsTo(User,{as: 'User'})

Post.belongsTo(Category, {as: 'Category'});
Category.hasMany(Post, {as: 'Posts'});

Post.hasMany(Comment, {as: 'Comments'});
Comment.belongsTo(Post, {as: 'Post'})

Post.belongsTo(User, {as:'User'});
User.hasMany(Post, {as: 'Posts'});
}

