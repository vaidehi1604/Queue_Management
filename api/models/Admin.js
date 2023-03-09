/**
 * Admin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const {roles}=sails.config.constants;

module.exports.Admin = {

  Admin: {
    userName: {
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
    role:{
      type:"String",
      isIn:[roles.user,roles.admin],
      defaultsTo:roles.user,
    }
  },

};

