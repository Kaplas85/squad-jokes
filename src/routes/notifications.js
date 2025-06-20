const router = require("express").Router();
const notificatorController = require("../controllers/notificator");

router.post("/", notificatorController);

module.exports = router;
