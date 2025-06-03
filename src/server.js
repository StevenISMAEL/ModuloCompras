const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
const proveedorRoutes = require('./routes/proveedorRoutes');
app.use('/api/proveedores', proveedorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
