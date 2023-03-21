/**
 * TicketsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //Book tickets

  addTickets: async (req, res) => {
    const lang = req.getLocale();

    try {
      const places = await Place.findOne({ id: req.params.placeId });
      const newDate = new Date().toLocaleDateString();
      const newNo = await Tickets.count({
        placeId: places.id,
      });
      const newnum = newNo + 1;
      var str = "" + newnum;
      var pad = "000";
      var newtick = pad.substring(0, pad.length - str.length) + str;
      console.log(newtick);
      const newTicket = await Tickets.create({
        placeId: req.params.placeId,
        ticketNo: places.prefix + newtick,
        processed: false,
        date: newDate,
        owner: req.userData.id,
      }).fetch();
      if (newTicket) {
        const unprocessTic = await Place.updateOne({
          id: req.params.placeId,
        }).set({
          unprocessTicket: places.unprocessTicket * 1 + 1,
        });
      }

      return res.status(201).json({
        message: sails.__("addData", lang),
        newTicket: newTicket,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
        message: sails.__("notAdded", lang),
      });
    }
  },

  //show all tickets
  getTicket: async (req, res) => {
    const lang = req.getLocale();
    try {
      const tickets = await Tickets.find();
      console.log(tickets);
      return res.status(200).json({
        message: sails.__("getData", lang),
        tickets: tickets,
      });
    } catch (error) {
      error: error;
      return res.status(500).json({
        message: sails.__("notGet", lang),
      });
    }
  },

  //ticket status to process updated

  updateTickets: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { id } = req.params;
      const tickets = await Tickets.findOne({ id });
      console.log(tickets);
      console.log(id);
      if (id == tickets.id) {
        if (tickets.processed === false) {
          const processUpdate = await Tickets.updateOne({ id: id }).set({
            processed: true,
          });
          console.log(processUpdate);
          const places = await Place.findOne({ id: tickets.placeId });
          const unprocessTic = await Place.update({ id: tickets.placeId }).set({
            unprocessTicket: places.unprocessTicket - 1,
          });
          return res.status(200).json({
            message: sails.__("updateData", lang),
            processUpdate: processUpdate,
          });
        } else {
          return res.status(404).json({
            message: sails.__("notUpdated", lang),
          });
        }
      } else {
        return res.status(404).json({
          message: sails.__("notUpdated", lang),
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notUpdated", lang),
      });
    }
  },

  //user can find process & unprocess ticket

  userfind: async (req, res) => {
    const lang = req.getLocale();

    const { processed } = req.query;
    try {
      console.log(req.userData.id);
      const userfind = await Tickets.find({
        owner: req.userData.id,
        processed: processed === "false" ? false : true,
      });
      console.log(userfind);
      return res.status(200).json({
        message: sails.__("dataProcessed", lang),
        userfind: userfind,
      });
    } catch (error) {
      return res.status(500).json({
        message: sails.__("dataNotProcessed", lang),
      });
    }
  },

  //admin can find process & unprocess ticket
  adminfind: async (req, res) => {
    const lang = req.getLocale();

    const { processed } = req.query;
    try {
      const userfind = await Tickets.find({
        processed: processed === "false" ? false : true,
      });
      console.log(userfind);
      return res.status(200).json({
        message: sails.__("dataProcessed", lang),
        userfind: userfind,
      });
    } catch (error) {
      return res.status(500).json({
        message: sails.__("dataNotProcessed", lang),
      });
    }
  },

  //place to find

  getPlaceTicket: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { processed } = req.query;
      const { placeId } = req.params;
      const tickets = await Tickets.find({ placeId });
      console.log(tickets);
      try {
        const userfind = await Tickets.find({
          processed: processed === "false" ? false : true,
        });
        console.log(userfind);
        return res.status(200).json({
          message: sails.__("dataProcessed", lang),
          userfind: userfind,
        });
      } catch (error) {
        return res.status(500).json({
          message: sails.__("dataNotProcessed", lang),
        });
      }
    } catch (error) {
      error: error;
      return res.status(500).json({
        message: sails.__("notGet", lang),
      });
    }
  },
};
