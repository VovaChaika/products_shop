import {
    addFullProductCreator,
    addFullProductCreator2,
    clearValuesCreator,
    setDefaultAttributesCreator
} from "../redux/cart_reducer";
import {getItemCreator} from "../redux/item_reducer";
import {getShortProductsCreator} from "../redux/content_reducer";
import {setCurrenciesCreator} from "../redux/currency_reducer";

export const locationsAPI = {
    GetLocationsAPI: fetch('http://localhost:4000/', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query:
                `query Query {categories { name}}`
        }),
    }),
}

export const getCartItems = (product) => {
    return (dispatch) => {
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query:
                    `
                    query AirTag{
                      product(id: "${product.id}") {
                        id
                        name
                        prices {
                          currency {
                            label
                            symbol
                          }
                          amount
                        }
                        attributes{
                        name
                         items{
                            value
                            displayValue
                          }
                        }
                        gallery
                        category
                        inStock
                        description
                        brand
                      }
                    }
                    `
            }),
        }).then(res => res.json()).then(data => {
            dispatch(addFullProductCreator2(data.data.product, product.chosenValues, product.count, product.identifier))
        })
    }
}

export const getItemApi = (productId) => {
    return (dispatch) => {
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query:
                    `
                    query GetItemApi{
                      product(id: "${productId}") {
                        id
                        name
                        prices {
                          currency {
                            label
                            symbol
                          }
                          amount
                        }
                        attributes{
                        name
                          items{
                            value
                            displayValue
                          }
                        }
                        gallery
                        category
                        inStock
                        description
                        brand
                      }
                    }
                    `
            }),
        }).then(res => res.json()).then(data => {
            dispatch(getItemCreator(data.data.product))
        })
    }
}

export const getAllProductsApi = (category) => {
    return (dispatch) => {
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query:
                  `
                  query getProducts {
  category(input: { title: "${category}" }) {
    products {
      id
      name
      gallery
      category
      inStock
      brand
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
}`
            }),
        }).then(res => res.json()).then(data => {
            dispatch(getShortProductsCreator(data.data.category.products))
        })
    }

}

export const getDefaultAttrApi = (productId) => {
    return (dispatch) => {
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query:
                    `
                    query GetDefaultAttrApi{
                      product(id: "${productId}") {
                        attributes{
                        name
                          items{
                            value
                            displayValue
                          }
                        }
                      }
                    }
                    `
            }),
        }).then(res => res.json()).then(data => {
            dispatch(setDefaultAttributesCreator(data.data.product.attributes))
            let localProduct = {id: productId}
            dispatch(addFullProductCreator(localProduct,
                Object.assign(localProduct, {count: 1})))
            dispatch(clearValuesCreator())
        })
    }
}

export const getCurrenciesApi = () => {
    return (dispatch) => {
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query:
                    `
                    query currencies{
                      currencies{
                        label
                        symbol
                      }
                    }
                    `
            }),
        }).then(res => res.json()).then(data => {
            dispatch(setCurrenciesCreator(data.data.currencies))
        })
    }
}





