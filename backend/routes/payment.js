import express from 'express';
const router = express.Router();
router.get('/sanity', (req, res) => res.json({ message: 'Payment route working' }));
export default router;
