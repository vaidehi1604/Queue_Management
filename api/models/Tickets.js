/**
 * Tickets.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports.Tickets = {
  attributes: {
    Tickets: {
      username: {
        type: "string",
        required: true,
      },
      placeId: {
        model: "place",
      },
      ticketNo: {
        type: "number",
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
