/**
 * Place.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports.place = {
  attributes: {
  
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
      tickets: {
        collection: "Tickets",
        via: "placeId",
      },
    
  },
};
