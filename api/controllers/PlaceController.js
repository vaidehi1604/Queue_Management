/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // add place

  addPlace: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { place, unprocessTicket, prefix } = req.body;
      const newPlace = await Place.create({
        place,
        unprocessTicket,
        prefix,
      }).fetch();
      return res.status(201).send({
        message: sails.__("addData", lang),
        newPlace:newPlace
      });
    } catch (error) {
      return res.status(500).send({
        message: sails.__("notAdded", lang),
      });
    }
  },

  //delete place

  deletePlace: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { id } = req.params;
      const place = await Place.find({ id: id });
      console.log(id);

      if (place) {
        const deleted=await Place.destroyOne({ id: id });
        return res.status(200).json({
          message: sails.__("deleteData", lang),
        
        });
      } else {
        return res.status(404).json({
          message: sails.__("notDeleted", lang),
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notDeleted", lang),
      });
    }
  },

  //Update place

  updatePlace: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { id } = req.params;
      const place = await Place.findOne(id);

      if (id === place.id) {
       const updateplace= await Place.updateOne({ id: id }).set(req.body);
        return res.status(200).json({
          message: sails.__("updateData", lang),
          updateplace:updateplace
        });
      } else {
        return res.status(404).json({
          message: sails.__("notUpdated", lang),
        });
      }
    } catch (error) {
      error: error;
      return res.status(500).json({
        message: sails.__("notUpdated", lang),
      });
    }
  },

  //get all place

  getPlace: async (req, res) => {
    const lang = req.getLocale();
    try {
      const places = await Place.find();
      console.log(places);
      return res.status(200).json({
        message: sails.__("getData", lang),
        placeData: places,
      });
    } catch (error) {
      error: error;
      return res.status(500).json({
        message: sails.__("notGet", lang),
      });
    }
  },
};
