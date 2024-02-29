const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
  try {
    let producto;

    //creanding nuestro producto
    producto = new Producto(req.body);

    await producto.save();
    res.send(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al procesar la solicitud");
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al procesar la solicitud");
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const { nombre, categoria, ubicacion, precio } = req.body;
    let producto = await Producto.findById(req.params.id);

    if (!producto) {
      res.status(404).json({ message: "Producto inexistente" });
    }

    producto.nombre = nombre;
    producto.categoria = categoria;
    producto.ubicacion = ubicacion;
    producto.precio = precio;

    producto = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      producto,
      { new: true }
    );

    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al procesar la solicitud");
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    let producto = await Producto.findById(req.params.id);

    if (!producto) {
      res.status(404).json({ message: "Producto inexistente" });
    }

    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo 1 error");
  }
};

exports.eliminarProducto = async (req, res) => {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto inexistente' });
      }
  
      await Producto.findOneAndDelete({ _id: req.params.id });
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error al procesar la solicitud');
    }
};