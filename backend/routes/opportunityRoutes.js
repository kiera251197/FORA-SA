const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const controller = require("../controller/opportunityController");
const requireStaffAuth = require("../middleware/requireStaffAuth");

router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.post("/", requireStaffAuth, upload.single("image"), controller.create);
router.put("/:id", requireStaffAuth, upload.single("image"), controller.update);
router.delete("/:id", requireStaffAuth, controller.remove);

module.exports = router;