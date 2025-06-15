// src/models/index.js

const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const { DataTypes } = Sequelize;

// Modelos

const Proveedor = sequelize.define('Proveedor', {
  cedula_ruc: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  ciudad: DataTypes.STRING,
  tipo_proveedor: DataTypes.STRING,
  direccion: DataTypes.STRING,
  telefono: DataTypes.STRING,
  email: { type: DataTypes.STRING, validate: { isEmail: true } },
  fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  estado: { type: DataTypes.BOOLEAN, defaultValue: true }, // CORREGIDO
  usuario_creacion: { type: DataTypes.INTEGER, allowNull: false }, // CORREGIDO
  usuario_modificacion: DataTypes.INTEGER, // CORREGIDO
  fecha_modificacion: DataTypes.DATE
}, { tableName: 'proveedores', timestamps: false });

const FacturaCompra = sequelize.define('FacturaCompra', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numero_factura: { type: DataTypes.STRING, allowNull: false },
  numero_factura_proveedor: DataTypes.STRING,
  fecha_emision: { type: DataTypes.DATEONLY, allowNull: false },
  proveedor_cedula_ruc: { type: DataTypes.STRING, allowNull: false },
  tipo_pago: DataTypes.STRING,
  fecha_vencimiento: DataTypes.DATEONLY,
  subtotal: { type: DataTypes.DECIMAL, allowNull: false },
  iva: { type: DataTypes.DECIMAL, allowNull: false },
  total: { type: DataTypes.DECIMAL, allowNull: false },
  estado: { type: DataTypes.STRING, defaultValue: 'pendiente' },
  observaciones: DataTypes.TEXT,
  usuario_creacion: { type: DataTypes.INTEGER, allowNull: false }, // CORREGIDO
  fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  usuario_modificacion: DataTypes.INTEGER, // CORREGIDO
  fecha_modificacion: DataTypes.DATE
}, { tableName: 'facturas_compra', timestamps: false });

const FacturaDetalle = sequelize.define('FacturaDetalle', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  factura_id: { type: DataTypes.INTEGER, allowNull: false },
  producto_id: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario: { type: DataTypes.DECIMAL, allowNull: false },
  aplica_iva: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  subtotal: { type: DataTypes.DECIMAL, allowNull: false },
  iva: { type: DataTypes.DECIMAL, allowNull: false },
  total: { type: DataTypes.DECIMAL, allowNull: false },
  usuario_creacion: DataTypes.INTEGER,
  fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  usuario_modificacion: DataTypes.INTEGER,
  fecha_modificacion: DataTypes.DATE
}, { tableName: 'facturas_compra_detalle', timestamps: false });

const SaldosProveedor = sequelize.define('SaldosProveedor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  proveedor_cedula_ruc: { type: DataTypes.STRING, allowNull: false },
  factura_id: { type: DataTypes.INTEGER, allowNull: false },
  monto_original: { type: DataTypes.DECIMAL, allowNull: false },
  saldo_pendiente: { type: DataTypes.DECIMAL, allowNull: false },
  fecha_vencimiento: DataTypes.DATEONLY,
  estado: { type: DataTypes.STRING, defaultValue: 'activo' },
  usuario_creacion: DataTypes.INTEGER,
  fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  usuario_modificacion: DataTypes.INTEGER,
  fecha_modificacion: DataTypes.DATE
}, { tableName: 'saldos_proveedor', timestamps: false });

const PagosProveedor = sequelize.define('PagosProveedor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  saldo_id: { type: DataTypes.INTEGER, allowNull: false },
  monto: { type: DataTypes.DECIMAL, allowNull: false },
  fecha_pago: { type: DataTypes.DATEONLY, allowNull: false },
  metodo_pago: DataTypes.STRING,
  referencia_pago: DataTypes.STRING,
  observacion: DataTypes.TEXT,
  usuario_creacion: { type: DataTypes.INTEGER, allowNull: false }, // CORREGIDO
  fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  usuario_modificacion: DataTypes.INTEGER, // CORREGIDO (o eliminar si no se usa)
  fecha_modificacion: DataTypes.DATE
}, { tableName: 'pagos_proveedor', timestamps: false });

const PistaAuditoria = sequelize.define('PistaAuditoria', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  usuario_nombre: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.STRING, allowNull: false },
  tipo_accion: { type: DataTypes.STRING, allowNull: false },
  tabla_afectada: { type: DataTypes.STRING, allowNull: false },
  registro_id: { type: DataTypes.STRING, allowNull: false },
  datos_anteriores: DataTypes.JSON, // <--- CAMBIO
  datos_nuevos: DataTypes.JSON,     // <--- CAMBIO
  campos_modificados: DataTypes.JSON, // <--- CAMBIO
  fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, { tableName: 'pista_auditoria', timestamps: false });

const ConfiguracionCompras = sequelize.define('ConfiguracionCompras', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  clave: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.STRING, allowNull: false },
  descripcion: DataTypes.TEXT,
  usuario_modificacion: DataTypes.INTEGER, // CORREGIDO
  fecha_modificacion: DataTypes.DATE
}, { tableName: 'configuracion_compras', timestamps: false });

const TokensApi = sequelize.define('TokensApi', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
  fecha_expiracion: { type: DataTypes.DATE, allowNull: false },
  fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, { tableName: 'tokens_api', timestamps: false });

// Asociaciones

Proveedor.hasMany(FacturaCompra, { foreignKey: 'proveedor_cedula_ruc', sourceKey: 'cedula_ruc' });
FacturaCompra.belongsTo(Proveedor, { foreignKey: 'proveedor_cedula_ruc', targetKey: 'cedula_ruc' });

FacturaCompra.hasMany(FacturaDetalle, { foreignKey: 'factura_id' });
FacturaDetalle.belongsTo(FacturaCompra, { foreignKey: 'factura_id' });

Proveedor.hasMany(SaldosProveedor, { foreignKey: 'proveedor_cedula_ruc', sourceKey: 'cedula_ruc' });
SaldosProveedor.belongsTo(Proveedor, { foreignKey: 'proveedor_cedula_ruc', targetKey: 'cedula_ruc' });

FacturaCompra.hasMany(SaldosProveedor, { foreignKey: 'factura_id' });
SaldosProveedor.belongsTo(FacturaCompra, { foreignKey: 'factura_id' });

SaldosProveedor.hasMany(PagosProveedor, { foreignKey: 'saldo_id' });
PagosProveedor.belongsTo(SaldosProveedor, { foreignKey: 'saldo_id' });

// Exportación de todos los modelos centralizados

module.exports = {
  sequelize,
  Sequelize,
  Proveedor,
  FacturaCompra,
  FacturaDetalle,
  SaldosProveedor,
  PagosProveedor,
  PistaAuditoria,
  ConfiguracionCompras,
  TokensApi
};
