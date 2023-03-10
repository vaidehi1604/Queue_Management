/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addPlace: async (req, res) => {
    try {
     
      const { place, unprocessTicket, prefix, tickets } = req.body;
      const newPlace = await Place.create({
        place,
        unprocessTicket,
        prefix,
        tickets,
      }).fetch();
      return res.send({
        message: "place added successfully!!",
      });
    } catch (error) {
      return res.send({ message: "place not added!!" });
    }
  },

  //delete place

  deletePlace: async (req, res) => {
    try {
      console.log(place);
      if (id === place.id) {
        await Place.destroy({ id: id });
        return res.status(200).json({
          message: "data deleted successfully ",
        });
      } else {
        return res.status(200).json({
          message: "data not found!!",
        });
      }
    } catch (error) {
      error: error;
      return res.status(401).json({
        message: "Data not deleted!!",
      });
    }
  },

  //Update place

  updatePlace: async (req, res) => {
    try {
      const { id } = req.params;
      const place = await Place.findOne(id);

      if (id === place.id) {
        await Place.updateOne({ id: id }).set(req.body);
        return res.status(200).json({
          message: "update sucessfully!!",
        });
      } else {
        return res.status(201).json({
          message: "Data not update !!",
        });
      }
    } catch (error) {
      error: error;
      return res.status(401).json({
        message: " not update !!",
      });
    }
  },

  //get all place

  getPlace: async (req, res) => {
    try {
      const places = await Place.find();
      console.log(places);
      return res.status(200).json({
        message: " data get",
        placeData: places,
      });
    } catch (error) {
      error: error;
      return res.status(401).json({
        message: "data not get!!",
      });
    }
  },
};
