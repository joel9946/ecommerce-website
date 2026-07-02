import express from 'express';
const router = express.Router();
router.get('/sanity', (req, res) => res.json({ message: 'Orders route working' }));
export default router;
