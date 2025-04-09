import { Request, Response } from 'express';
import { ProductService } from '../services/products';

export class ProductController {
  private service = new ProductService();

  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.service.getAll();
      res.json({ data: products, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const product = await this.service.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ data: null, error: 'Product not found' });
      }
      res.json({ data: product, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const product = await this.service.create(req.body);
      res.status(201).json({ data: product, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const product = await this.service.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ data: null, error: 'Product not found' });
      }
      res.json({ data: product, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  };
}