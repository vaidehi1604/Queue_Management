/**
 * Tickets.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports.Tickets = {
  attributes: {
    Tickets: {
     
      placeId: {
        model: "place",
      },
      ticketNo: {
        type: "string",
        unique: true,
      },
      processed: {
        type: "boolean",
        defaultsTo: false,
      },
      date: {
        type: "date",
      },
      owner: {
        model: "User",
      },
    },
  },
};
