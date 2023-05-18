import mongooseConnection from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnection();
  if (method === 'POST') {
    const { title, description, price } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
    });
    res.status(201).json({ message: 'Proucts was create succefully', product });
  }

  if (method === 'GET') {
    const product = await Product.find();
    res.json(product);
  }
}
