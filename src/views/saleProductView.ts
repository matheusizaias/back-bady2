import SalesProduct from "../models/SalesProduct"

export default {
  render(salesProduct: SalesProduct) {
    return {
      salesIdSale: salesProduct.salesIdSale,
      productIdProduct: salesProduct.productIdProduct,
      qtd: salesProduct.qtd,
      price: salesProduct.price,
      total: salesProduct.total,
      // createdAt: salesProduct.sale.created_at
    }
  },
  renderMany(salesProduct: SalesProduct[]) {
    return salesProduct.map(salesProduct => this.render(salesProduct))
  }
}