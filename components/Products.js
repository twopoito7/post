import React, { Component } from "react";
import util from "../util";
export default class Products extends Component {
  render() {
    const productItems = this.props.products.map(product => (
      <div
        className="col-md-4"
        key={product.id}
        style={{ border: "1px solid black" }}
      >
        <div className="thumbnail text-center">
          <img
            src={`${product.img}`}
            alt={product.title}
            style={{ width: 300, height: 300, backgroundColor: "#ffffff" }}
          />
          <br />
          <p>{product.description}</p>
          <p>{product.title}</p>
          <b>{util.formatCurrency(product.price)}</b>
          <br />
        </div>
      </div>
    ));

    return <div className="row">{productItems}</div>;
  }
}
