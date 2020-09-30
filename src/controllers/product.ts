import { Request , Response } from "express";
import { badRequest, internalServerError, notFound } from "../services/util";
import { Product, productModel } from '../models/products';

const insertProduct = (req: Request, res: Response) => {
    {
        const product = req.body;
        if(!product)
            return badRequest(res, "Produto inválido");
        
        if(!product.name)
            return badRequest(res, "Nome do produto não informado.")

        if(!(parseFloat(product.price) > 0))
            return badRequest(res, "Preço do produto não informado.")
    }
    const product = req.body as Product;
    return productModel.insertProduct(product)
        .then(id => {
            res.json({
                id
            })
        })
        .catch(err => internalServerError(res, err));
}

const updateProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id>0))
            return badRequest(res, 'Id Inválido');

        const product = req.body;
        if(!product)
            return badRequest(res, 'Produto inválido');
        if(!product.name)
            return badRequest(res, 'Informe o nome do produto');
        if(!(parseFloat(product.price) > 0))
            return badRequest(res, 'Informe um valor');

        const productSaved = await productModel.getProduct(id);
        if(!productSaved)
            return notFound(res);    
    }

    const product = req.body as Product;
    return productModel.updateProduct(product)
        .then(product => {
            res.json(product)
        })
        .catch(err => internalServerError(res, err));
}

const listProducts = ({}: Request, res: Response) => {
    productModel.listProducts()
        .then(products => {
            res.json(products)
        })
        .catch(err => internalServerError(res, err));
}

const getProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
       if(!(id > 0))
            return badRequest(res ,'Id inválido');
    }

    return productModel.getProduct(id)
    .then((product) => {
        if(product)
            return res.json(product);
        else
            return notFound(res);
    })
    .catch(err => internalServerError(res, err));
}

const deleteProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id > 0))
            return badRequest(res, 'id Inválido!')
        
        const productSaved = await productModel.getProduct(id);
        if(!productSaved)
            return notFound(res);
    }
    return productModel.deleteProduct(id)
        .then(() => {
            return res.sendStatus(200)
        })
        .catch(err => internalServerError(res, err))
}

export const productController = {
    insertProduct,
    listProducts,
    getProduct,
    deleteProduct,
    updateProduct
}
