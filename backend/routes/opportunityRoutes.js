const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const controller = require("../controller/opportunityController");

router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.post("/", upload.single("image"), controller.create);
router.put("/:id", upload.single("image"), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;