/**
 * Place.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports.place = {
  attributes: {
    place: {
      place: {
        type: "String",
        required: true,
        unique: true,
      },
      unprocessTicket: {
        type: "number",
      },
      prefix: {
        type: "string",
        unique: true,
      },
      owner: {
        model: "Admin",
      },
      tickets: {
        // collection: "tickets",
        // via: "placeId",

        type:"number",
        columnType:"array",
        defaultTo:[]
      },
    },
  },
};
