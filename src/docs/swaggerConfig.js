// src/docs/swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

// Determina la URL del servidor dinámicamente.
// Plataformas como Railway o Render crean estas variables de entorno automáticamente.
const serverUrl = process.env.RAILWAY_STATIC_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`;
const serverDescription = (process.env.RAILWAY_STATIC_URL || process.env.RENDER_EXTERNAL_URL) ? 'Servidor de Producción' : 'Servidor de Desarrollo Local';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: process.env.SWAGGER_TITLE || 'API Compras',
    version: process.env.SWAGGER_VERSION || '1.0.0',
    description: process.env.SWAGGER_DESCRIPTION || 'Documentación de la API de Compras'
  },
  servers: [
    {
      url: serverUrl,
      description: serverDescription
    }
  ],
  components: {
    schemas: {
      Proveedor: {
        type: 'object',
        properties: {
          cedula_ruc: { type: 'string' },
          nombre: { type: 'string' },
          ciudad: { type: 'string' },
          tipo_proveedor: { type: 'string', enum: ['Crédito','Contado'] },
          direccion: { type: 'string' },
          telefono: { type: 'string' },
          email: { type: 'string', format: 'email' },
          estado: { type: 'boolean' },
          fecha_creacion: { type: 'string', format: 'date-time' },
          fecha_modificacion: { type: 'string', format: 'date-time', nullable: true },
          usuario_creacion: { type: 'integer' },
          usuario_modificacion: { type: 'integer', nullable: true }
        }
      },
      ProveedorCreate: {
        type: 'object',
        required: ['cedula_ruc','nombre','ciudad','tipo_proveedor','direccion','telefono','email','usuario_creacion'],
        properties: {
          cedula_ruc: { type: 'string', example: '0912345678' },
          nombre: { type: 'string', example: 'Proveedor Ejemplo S.A.' },
          ciudad: { type: 'string', example: 'Quito' },
          tipo_proveedor: { type: 'string', enum: ['Crédito','Contado'], example: 'Crédito' },
          direccion: { type: 'string', example: 'Av. Siempre Viva 123' },
          telefono: { type: 'string', example: '0991234567' },
          email: { type: 'string', format: 'email', example: 'contacto@proveedor-ejemplo.com' },
          estado: { type: 'boolean', example: true },
          usuario_creacion: { type: 'integer', example: 1 }
        }
      },
      ProveedorUpdate: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'Proveedor Actualizado S.A.' },
          ciudad: { type: 'string', example: 'Guayaquil' },
          tipo_proveedor: { type: 'string', enum: ['Crédito','Contado'], example: 'Contado' },
          direccion: { type: 'string', example: 'Calle Falsa 456' },
          telefono: { type: 'string', example: '0987654321' },
          email: { type: 'string', format: 'email', example: 'nuevo@proveedor.com' },
          estado: { type: 'boolean', example: false },
          usuario_modificacion: { type: 'integer', example: 2 }
        }
      },
      FacturaCompra: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          numero_factura: { type: 'string', example: 'FAC-100' },
          numero_factura_proveedor: { type: 'string', example: '001-001-0000100' },
          fecha_emision: { type: 'string', format: 'date', example: '2025-06-11' },
          proveedor_cedula_ruc: { type: 'string', example: '0912345678' },
          tipo_pago: { type: 'string', enum: ['Crédito','Contado'], example: 'Crédito' },
          fecha_vencimiento: { type: 'string', format: 'date', nullable: true, example: '2025-07-11' },
          subtotal: { type: 'number', example: 1500.50 },
          iva: { type: 'number', example: 180.06 },
          total: { type: 'number', example: 1680.56 },
          estado: { type: 'string', enum: ['Registrada','Impresa','Cancelada'], example: 'Registrada' },
          impresion_realizada: { type: 'boolean', example: false },
          fecha_impresion: { type: 'string', format: 'date-time', nullable: true, example: '2025-06-11T10:00:00Z' },
          observaciones: { type: 'string', nullable: true, example: 'Compra de insumos oficina' },
          fecha_creacion: { type: 'string', format: 'date-time', example: '2025-06-11T12:00:00Z' },
          fecha_modificacion: { type: 'string', format: 'date-time', nullable: true },
          usuario_creacion: { type: 'integer', example: 1 },
          usuario_modificacion: { type: 'integer', nullable: true }
        }
      },
      FacturaCompraCreate: {
        type: 'object',
        required: ['numero_factura','numero_factura_proveedor','fecha_emision','proveedor_cedula_ruc','tipo_pago','subtotal','iva','total','usuario_creacion'],
        properties: {
          numero_factura: { type: 'string', example: 'FAC-100' },
          numero_factura_proveedor: { type: 'string', example: '001-001-0000100' },
          fecha_emision: { type: 'string', format: 'date', example: '2025-06-11' },
          proveedor_cedula_ruc: { type: 'string', example: '0912345678' },
          tipo_pago: { type: 'string', enum: ['Crédito','Contado'], example: 'Crédito' },
          fecha_vencimiento: { type: 'string', format: 'date', example: '2025-07-11' },
          subtotal: { type: 'number', example: 1500.50 },
          iva: { type: 'number', example: 180.06 },
          total: { type: 'number', example: 1680.56 },
          estado: { type: 'string', enum: ['Registrada','Impresa','Cancelada'], example: 'Registrada' },
          impresion_realizada: { type: 'boolean', example: false },
          fecha_impresion: { type: 'string', format: 'date-time', example: '2025-06-11T10:00:00Z' },
          observaciones: { type: 'string', example: 'Compra de insumos oficina' },
          usuario_creacion: { type: 'integer', example: 1 }
        }
      },
      FacturaCompraUpdate: {
        type: 'object',
        properties: {
          numero_factura: { type: 'string', example: 'FAC-100-EDIT' },
          numero_factura_proveedor: { type: 'string', example: '001-001-0000100A' },
          fecha_emision: { type: 'string', format: 'date', example: '2025-06-12' },
          proveedor_cedula_ruc: { type: 'string', example: '0912345678' },
          tipo_pago: { type: 'string', enum: ['Crédito','Contado'], example: 'Contado' },
          fecha_vencimiento: { type: 'string', format: 'date', example: '2025-06-12' },
          subtotal: { type: 'number', example: 1600.00 },
          iva: { type: 'number', example: 192.00 },
          total: { type: 'number', example: 1792.00 },
          estado: { type: 'string', enum: ['Registrada','Impresa','Cancelada'], example: 'Impresa' },
          impresion_realizada: { type: 'boolean', example: true },
          fecha_impresion: { type: 'string', format: 'date-time', example: '2025-06-12T10:00:00Z' },
          observaciones: { type: 'string', example: 'Actualización de monto y estado' },
          usuario_modificacion: { type: 'integer', example: 2 }
        }
      },
      FacturaDetalle: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          factura_id: { type: 'integer', example: 1 },
          producto_id: { type: 'integer', example: 42 },
          cantidad: { type: 'integer', example: 10 },
          precio_unitario: { type: 'number', example: 15.75 },
          aplica_iva: { type: 'boolean', example: true },
          subtotal: { type: 'number', example: 157.50 },
          iva: { type: 'number', example: 18.90 },
          total: { type: 'number', example: 176.40 },
          fecha_creacion: { type: 'string', format: 'date-time', example: '2025-06-11T12:10:00Z' },
          usuario_creacion: { type: 'integer', example: 1 }
        }
      },
      FacturaDetalleCreate: {
        type: 'object',
        required: ['factura_id','producto_id','cantidad','precio_unitario','aplica_iva','subtotal','iva','total','usuario_creacion'],
        properties: {
          factura_id: { type: 'integer', example: 1 },
          producto_id: { type: 'integer', example: 42 },
          cantidad: { type: 'integer', example: 10 },
          precio_unitario: { type: 'number', example: 15.75 },
          aplica_iva: { type: 'boolean', example: true },
          subtotal: { type: 'number', example: 157.50 },
          iva: { type: 'number', example: 18.90 },
          total: { type: 'number', example: 176.40 },
          usuario_creacion: { type: 'integer', example: 1 }
        }
      },
      FacturaDetalleUpdate: {
        type: 'object',
        properties: {
          factura_id: { type: 'integer', example: 1 },
          producto_id: { type: 'integer', example: 43 },
          cantidad: { type: 'integer', example: 12 },
          precio_unitario: { type: 'number', example: 16.00 },
          aplica_iva: { type: 'boolean', example: false },
          subtotal: { type: 'number', example: 192.00 },
          iva: { type: 'number', example: 0.00 },
          total: { type: 'number', example: 192.00 },
          usuario_modificacion: { type: 'integer', example: 1 }
        }
      },
      SaldoProveedor: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          proveedor_cedula_ruc: { type: 'string', example: '0912345678' },
          factura_id: { type: 'integer', example: 1 },
          monto_original: { type: 'number', example: 1680.56 },
          saldo_pendiente: { type: 'number', example: 1680.56 },
          fecha_vencimiento: { type: 'string', format: 'date', example: '2025-07-11' },
          estado: { type: 'string', enum: ['Pendiente','Pagado','Vencido'], example: 'Pendiente' },
          fecha_creacion: { type: 'string', format: 'date-time', example: '2025-06-11T12:15:00Z' },
          fecha_modificacion: { type: 'string', format: 'date-time', nullable: true },
          usuario_creacion: { type: 'integer', example: 1 },
          usuario_modificacion: { type: 'integer', nullable: true }
        }
      },
      SaldoProveedorCreate: {
        type: 'object',
        required: ['proveedor_cedula_ruc','factura_id','monto_original','saldo_pendiente','fecha_vencimiento','usuario_creacion'],
        properties: {
          proveedor_cedula_ruc: { type: 'string', example: '0912345678' },
          factura_id: { type: 'integer', example: 1 },
          monto_original: { type: 'number', example: 1680.56 },
          saldo_pendiente: { type: 'number', example: 1680.56 },
          fecha_vencimiento: { type: 'string', format: 'date', example: '2025-07-11' },
          estado: { type: 'string', enum: ['Pendiente','Pagado','Vencido'], example: 'Pendiente' },
          usuario_creacion: { type: 'integer', example: 1 }
        }
      },
      SaldoProveedorUpdate: {
        type: 'object',
        properties: {
          proveedor_cedula_ruc: { type: 'string', example: '0912345678' },
          factura_id: { type: 'integer', example: 1 },
          monto_original: { type: 'number', example: 1680.56 },
          saldo_pendiente: { type: 'number', example: 1180.56 },
          fecha_vencimiento: { type: 'string', format: 'date', example: '2025-07-15' },
          estado: { type: 'string', enum: ['Pendiente','Pagado','Vencido'], example: 'Pagado' },
          usuario_modificacion: { type: 'integer', example: 1 }
        }
      },
      PagoProveedor: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          saldo_id: { type: 'integer', example: 1 },
          monto: { type: 'number', example: 500.00 },
          fecha_pago: { type: 'string', format: 'date', example: '2025-06-12' },
          metodo_pago: { type: 'string', example: 'Transferencia' },
          referencia_pago: { type: 'string', nullable: true, example: 'TRX-12345' },
          observacion: { type: 'string', nullable: true, example: 'Pago parcial' },
          fecha_creacion: { type: 'string', format: 'date-time', example: '2025-06-11T12:20:00Z' },
          usuario_creacion: { type: 'integer', example: 1 }
        }
      },
      PagoProveedorCreate: {
        type: 'object',
        required: ['saldo_id','monto','fecha_pago','metodo_pago','usuario_creacion'],
        properties: {
          saldo_id: { type: 'integer', example: 1 },
          monto: { type: 'number', example: 500.00 },
          fecha_pago: { type: 'string', format: 'date', example: '2025-06-12' },
          metodo_pago: { type: 'string', example: 'Transferencia' },
          referencia_pago: { type: 'string', example: 'TRX-12345' },
          observacion: { type: 'string', example: 'Pago parcial' },
          usuario_creacion: { type: 'integer', example: 1 }
        }
      },
      PagoProveedorUpdate: {
        type: 'object',
        properties: {
          saldo_id: { type: 'integer', example: 1 },
          monto: { type: 'number', example: 250.00 },
          fecha_pago: { type: 'string', format: 'date', example: '2025-06-13' },
          metodo_pago: { type: 'string', example: 'Efectivo' },
          referencia_pago: { type: 'string', example: 'EF-67890' },
          observacion: { type: 'string', example: 'Ajuste de monto' },
          usuario_modificacion: { type: 'integer', example: 1 }
        }
      },
      PistaAuditoria: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          usuario_id: { type: 'integer', example: 1 },
          usuario_nombre: { type: 'string', example: 'admin' },
          rol: { type: 'string', example: 'Administrador' },
          fecha_hora: { type: 'string', format: 'date-time', example: '2025-06-11T12:30:00Z' },
          tipo_accion: { type: 'string', example: 'CREATE' },
          tabla_afectada: { type: 'string', example: 'facturas_compra' },
          registro_id: { type: 'integer', example: 1 },
          datos_anteriores: { type: 'object', nullable: true },
          datos_nuevos: { type: 'object', nullable: true },
          campos_modificados: { type: 'array', items: { type: 'string' }, example: ['numero_factura','proveedor_cedula_ruc'] }
        }
      },
      PistaAuditoriaCreate: {
        type: 'object',
        required: ['usuario_id','usuario_nombre','rol','tipo_accion','tabla_afectada','registro_id','campos_modificados'],
        properties: {
          usuario_id: { type: 'integer', example: 1 },
          usuario_nombre: { type: 'string', example: 'admin' },
          rol: { type: 'string', example: 'Administrador' },
          tipo_accion: { type: 'string', example: 'CREATE' },
          tabla_afectada: { type: 'string', example: 'facturas_compra' },
          registro_id: { type: 'integer', example: 1 },
          datos_anteriores: { type: 'object', nullable: true },
          datos_nuevos: { type: 'object', nullable: true },
          campos_modificados: { type: 'array', items: { type: 'string' }, example: ['numero_factura','proveedor_cedula_ruc'] }
        }
      },
      ConfiguracionCompra: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          clave: { type: 'string', example: 'max_descuento' },
          valor: { type: 'string', example: '15%' },
          descripcion: { type: 'string', nullable: true, example: 'Descuento máximo permitido' },
          fecha_modificacion: { type: 'string', format: 'date-time', nullable: true },
          usuario_modificacion: { type: 'integer', nullable: true }
        }
      },
      ConfiguracionCompraCreate: {
        type: 'object',
        required: ['clave','valor','usuario_modificacion'],
        properties: {
          clave: { type: 'string', example: 'max_descuento' },
          valor: { type: 'string', example: '15%' },
          descripcion: { type: 'string', example: 'Descuento máximo permitido' },
          usuario_modificacion: { type: 'integer', example: 1 }
        }
      },
      ConfiguracionCompraUpdate: {
        type: 'object',
        properties: {
          valor: { type: 'string', example: '20%' },
          descripcion: { type: 'string', example: 'Incremento de descuento máximo' },
          usuario_modificacion: { type: 'integer', example: 2 }
        }
      },
      TokensApi: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          usuario_id: { type: 'integer', example: 1 },
          token: { type: 'string', example: 'abcdef1234567890abcdef' },
          fecha_expiracion: { type: 'string', format: 'date-time', example: '2025-12-31T23:59:59Z' },
          fecha_creacion: { type: 'string', format: 'date-time', example: '2025-06-11T12:35:00Z' }
        }
      },
      TokensApiCreate: {
        type: 'object',
        required: ['usuario_id','token','fecha_expiracion'],
        properties: {
          usuario_id: { type: 'integer', example: 1 },
          token: { type: 'string', example: 'abcdef1234567890abcdef' },
          fecha_expiracion: { type: 'string', format: 'date-time', example: '2025-12-31T23:59:59Z' }
        }
      },
      TokensApiUpdate: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'nuevotoken1234567890' },
          fecha_expiracion: { type: 'string', format: 'date-time', example: '2026-01-31T23:59:59Z' }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
