/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //admin routes
  "POST /admin/signup": "AdminController.adminSignup",
  "POST /admin/login": "AdminController.adminLogin",
  "POST /admin/logout": "AdminController.adminLogout",
  //place routes
  "POST /admin/place": "PlaceController.addPlace",
  "DELETE /place/delete/:id": "PlaceController.deletePlace",
  "PATCH /place/update/:id": "PlaceController.updatePlace",
  "GET /place/get": "PlaceController.getPlace",
  "GET /place/get/unprocess": "PlaceController.getUnprocessTicket",
  //Ticket routes
  "POST /addticket": "TicketsController.addTickets",
  "GET /ticket/:place": "TicketsController.showTickets",
  "PATCH /ticket/:id": "TicketsController.updateTickets",
  "PATCH /ticket": "TicketsController.updateProcess",

  //User routes
  "POST /user/signup":"UserController.userSignup",
  "POST /user/login":"UserController.userLogin",
  "POST /user/logout":"UserController.userLogout",
  "GET /user/place": "PlaceController.userTicket",




};
