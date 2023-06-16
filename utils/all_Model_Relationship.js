const Models = require('../utils/all_Models');

exports.Model_Relationship = () => {
    // PRODUCT - USER ASSOCIATION
    Models.Product.belongsTo(Models.User, { constraints : true, onDelete : 'CASCADE' }); 
        // So that when we delete a User, all Products associated to it also get deleted
    Models.User.hasMany(Models.Product);

// USER - CART ASSOCIATION
    Models.Cart.belongsTo(Models.User, { constraints : true, onDelete : 'CASCADE' });
    Models.User.hasOne(Models.Cart);

// USER - PRODUCT ASSOCIATION
    // Many-to-Many Relation
    // only works with an Intermediate Table (that connects/ basically stores a combination of them)
    // thus, we use 'CartItem' Model
    Models.Cart.belongsToMany(Models.Product, { through : Models.CartItem });
    Models.Product.belongsToMany(Models.Cart, { through : Models.CartItem });
}