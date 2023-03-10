/**
 * TicketsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //Book tickets details

  addTickets: async (req, res) => {
    try {
      const places = await Place.findOne({ id: req.params.placeId });
      const newDate = new Date().toLocaleDateString();
      const newNo = await Tickets.count({
        placeId: places.id,
        date: newDate,
      });
      const newnum = newNo + 1;
      const { username, ticketNo, processed, date } = req.body;

      const newTicket = await Tickets.create({
        username,
        placeId: req.params.placeId,
        ticketNo: places.prefix + newnum,
        processed:
          processed === "true"
            ? true
            : processed === "false"
            ? false
            : undefined,
        date: newDate,
      });
      return res.status(201).json({
        message: "ticket data successfully added!!",
      });
    } catch (error) {
      error: error;
      res.status(401).json({
        message: "ticket data not added!!",
      });
    }
  },

  //show all tickets
  getTicket: async (req, res) => {
    try {
      const tickets = await Tickets.find();
      console.log(tickets);
      return res.status(200).json({
        message: "Ticket data get",
        tickets: tickets,
      });
    } catch (error) {
      error: error;
      return res.status(401).json({
        message: "Data not get!!",
      });
    }
  },

  //ticket process updated

  updateTickets: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(id);
      const tickets = await Tickets.findOne({ id });
      // console.log(placeId);
      if (id == tickets.id) {
        await Tickets.updateOne({ id: id }).set({ processed: true });

        const places = await Place.findOne({ id: tickets.placeId });
        //  console.log(places);
        await Place.update({ id: tickets.placeId }).set({
          unprocessTicket: places.unprocessTicket - 1,
        });

        return res.status(200).json({
          message: "update sucessfully!!",
        });
      } else {
        return res.status(200).json({
          message: "Data not update !!",
        });
      }
    } catch (error) {
      return res.json({
        message: "data not found",
      });
    }
  },

  //user can find process & unprocess ticket

  userfind: async (req, res) => {
    const { processed } = req.query;
    try {
      console.log(processed);
      console.log(processed == "false" ? false : true);
      const userfind = await Tickets.find({
        owner: req.userData.id,
        processed: processed == "false" ? false : true,
      });
      return res.status(401).json({
        message: "data  processed",
        User: userfind,
      });
    } catch (error) {
      return res.status(401).json({
        message: "data not processed",
      });
    }
  },
};
