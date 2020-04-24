import React, { Component } from "react";
import "./App.css";
import base from "./base";
import Filter from "/components/Filter";
import Products from "/components/Products";
import styled from "styled-components";

const ProductStyled = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  margin-right: 0px;
  margin-left: 10px;
  position: absolute;
`;

const FilterWrapper = styled.div`
  margin: 0px;
  margin-right: 0px;
  margin-left: 10px;
  width: 100%;
  align-content: center;
  padding: 0px;
  color: black;
`;

class App extends Component {
  state = {
    result: null,
    error: null,
    size: "",
    sort: "",
    cartItems: [],
    products: [],
    filteredProducts: []
  };
  componentDidMount() {
    base("Destinations")
      .select({
        sort: [
          { field: "summary", direction: "desc" },
          { field: "title", direction: "desc" }
        ]
      })
      .firstPage((error, records) => {
        if (error) return this.setState({ error });
        const result = records.map(record => {
          var urldata = [record.get("image")];
          var urldata2 = JSON.stringify(urldata);
          var urldata3 = urldata2.split('"');

          return {
            itemName: record.get("title"),
            priority: record.get("tags"),
            useCase: record.get("isFreeShipping"),
            sprintReleaseDate: record.get("number"),
            status: record.get("style"),
            id: record.get("number"),
            sku: record.get("sku"),
            title: record.get("title"),
            description: record.get("description"),
            price: record.get("price"),
            availableSizes: record.get("availableSizes"),
            img: urldata3[7]
          };
        });
        this.setState({ result });
        this.setState({ products: result });
        this.listProducts();
      });
  }
  listProducts = () => {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowestprice"
            ? a.sprintReleaseDate > b.sprintReleaseDate
              ? 1
              : -1
            : a.sprintReleaseDate < b.sprintReleaseDate
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        };
      }
      return { filteredProducts: state.products };
    });
  };
  handleSortChange = e => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  };
  handleSizeChange = e => {
    this.setState({ size: e.target.value });
    this.listProducts();
  };

  render() {
    return (
      <div>
        <h2> </h2>
        <div className="row">
          <FilterWrapper className="col-md-3">
            <Filter
              count={this.state.filteredProducts.length}
              handleSortChange={this.handleSortChange}
              handleSizeChange={this.handleSizeChange}
            />
            <br />
            <ProductStyled className="row">
              <Products products={this.state.filteredProducts} />
            </ProductStyled>
          </FilterWrapper>
        </div>
      </div>
    );
  }
}
export default App;
