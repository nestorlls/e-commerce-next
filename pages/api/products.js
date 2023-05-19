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
    if (req?.query?.id) {
      const product = await Product.findOne({ _id: req.query.id });
      res.json(product);
    } else {
      const products = await Product.find();
      res.json(products);
    }
  }

  if (method === 'PUT') {
    const { _id, title, description, price } = req.body;
    await Product.updateOne({ _id }, { title, description, price });
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
