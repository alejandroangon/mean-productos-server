//Rutas para producto
const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

// api/productos
router.post("/", productoController.crearProducto);
router.get("/", productoController.obtenerProductos);
router.put("/:id", productoController.actualizarProducto);
router.get("/:id", productoController.obtenerProducto);
router.delete("/:id", productoController.eliminarProducto);

module.exports = router;

exports.eliminarProducto = async (req, res) => {
  try {
    let producto = await Producto.findById(req.params.id);

    if (!producto)
        res.status(404).json({ message: "Producto inexistente" });

    await Producto.findOneAndDelete({ _id: req.params.id });

    res.json({ message: "Producto eliminador correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo 1 error");
  }
};
