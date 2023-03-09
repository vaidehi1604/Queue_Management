/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */



    module.exports.User = {

      User: {
        username: {
          type: "String",
          required: true,
        },
        email: {
          type: "String",
          required: true,
          isEmail: true,
        },
    
        password: {
          type: "String",
          required: true,
        },
        
  }
    };


