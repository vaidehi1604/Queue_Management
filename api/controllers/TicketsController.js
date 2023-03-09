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
      // const {placeId}=req.params;
      
     const place=await Place.findOne({id:id});
    //  console.log(place.id);
   
     const { username,placeId,ticketNo,processed}=req.body;
     if(place.id==placeId){
     const newTicket=await Tickets.create({
      username,
      placeId,
      ticketNo,
      processed
     })
      return res.status(201).json({
        message: "ticket data successfully added!!",
      });}
    } catch (error) {
      error: error;
      res.status(401).json({
        message: "ticket data not added!!",
      }
       
      );
    }
  },

  //search ticket by place

  showTickets: async (req, res) => {
    try {
      const { place } = req.params;
      console.log(place);
      const places = await Tickets.find({ place });
      console.log(places);

      return res.status(200).json({
        message: "Ticket Data",
        ticketData: places,
      });
    } catch (error) {
      error: error;
      return res.status(401).json({
        message: "data not get!!",
      });
    }
  },

  //ticket process updated

  updateTickets: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const tickets = await Tickets.findOne({id});
      // console.log(placeId);
      if (id == tickets.id) {
        await Tickets.updateOne({ id: id }).set({ processed: true });
       console.log('here1');
       const places= await Place.findOne({id:tickets.placeId})
      //  console.log(places);
        await Place.update({id:tickets.placeId}).set({
          unprocessTicket:places.unprocessTicket-1
        })
        console.log('here2');

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

  updateProcess:async(req,res)=>{
    try {
      const { placeId } = req.body;
      const tickets = await Tickets.findOne({placeId});
      console.log(placeId);
      console.log(tickets);
    
      if (placeId = tickets.placeId) {
        await Tickets.updateOne({ placeId: placeId }).set({ processed: true });
       
        // const places = await Place.find({ place: placeId }).set({unprocessTicket:unprocessTicket-1});
        // console.log(places);
       

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
  

  }




};
