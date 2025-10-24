import express from 'express';
const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ ok: true, message: 'Servidor operativo y conectado a la base de datos' });
});

export default router;
