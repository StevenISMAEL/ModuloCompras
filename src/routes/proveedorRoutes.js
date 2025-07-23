const express = require("express");
const router = express.Router();
const proveedoresController = require("../controllers/proveedoresController");

router.get("/", proveedoresController.getAll);
router.get("/:cedula_ruc", proveedoresController.getById);
router.post("/", proveedoresController.create);
router.put("/:cedula_ruc", proveedoresController.update);
router.delete("/:cedula_ruc", proveedoresController.delete);

module.exports = router;
