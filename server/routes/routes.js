const routes = require("express").Router();
const userController = require("../controllers/UserControllers");
const pollController = require("../controllers/PollControllers");
const auth = require("../middleware/Auth");

/* User Routes */
routes.post("/api/user/create", userController.createUser);
routes.post("/api/user/login", userController.LoginUser);
routes.get("/api/user/valid-token", userController.ValidateToken);
routes.post("/api/user/forget-password", userController.ForgetPassword); //incompleto
//Editar Senha

/* Polls Routes */
routes.get("/api/polls/get-all", pollController.getAllPolls);
routes.get("/api/polls/:user_id/get-my-polls", auth, pollController.getMyPolls);
routes.get("/api/polls/:poll_id", auth, pollController.getOnePoll);
routes.post("/api/polls/:user_id/create", auth, pollController.createPool);
routes.put("/api/polls/:user_id/:poll_id/edit", auth, pollController.editPoll);
routes.delete("/api/polls/:poll_id/delete", auth, pollController.deletePool);
routes.post("/api/polls/:user_id/:poll_id/answer", auth, pollController.answerPool);

module.exports = routes;
