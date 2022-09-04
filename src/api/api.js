import {
    addFullProductCreator,
    addFullProductCreator2,
    clearValuesCreator,
    setDefaultAttributesCreator
} from "../redux/cart_reducer";
import {getItemCreator} from "../redux/item_reducer";
import {getShortProductsCreator} from "../redux/content_reducer";
import {
    setChosenPricesCreator,
    setChosenValuesCreator,
    setCurrenciesCreator,
    setCurrentProductPriceCreator,
} from "../redux/currency_reducer";

export let state = []

export const _productsArr = [
    `
query Huarache{
  product(id: "huarache-x-stussy-le") {
    id
    name
    category
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
    inStock
    description
    brand
  }
}
`,
    `
query Jacket{
  product(id: "jacket-canada-goosee") {
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
`,
    `
query PS5{
  product(id: "ps-5") {
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
`,
    `
query Xbox{
  product(id: "xbox-series-s") {
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
`,
    `
query IMac{
  product(id: "apple-imac-2021") {
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
`,
    `
query IPhone{
  product(id: "apple-iphone-12-pro") {
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
`,
    `
query AirPods{
  product(id: "apple-airpods-pro") {
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
`,
    `
query AirTag{
  product(id: "apple-airtag") {
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
`,

]
export const testAPI = [
    {
        GetProductsAPI:
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    query: _productsArr[0]
                })],
            }),

    },
    {
        GetProductsAPI:
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    query: _productsArr[1]
                })],
            }),

    },
    {
        GetProductsAPI:
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    query: _productsArr[2]
                })],
            }),

    },
    {
        GetProductsAPI:
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    query: _productsArr[3]
                })],
            }),

    },
    {
        GetProductsAPI:
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    query: _productsArr[4]
                })],
            }),

    },
    {
        GetProductsAPI:
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    query: _productsArr[5]
                })],
            }),

    },
    {
        GetProductsAPI:
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    query: _productsArr[6]
                })],
            }),

    },
    {
        GetProductsAPI:
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    query: _productsArr[7]
                })],
            }),

    },
]
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
    console.log(productId)
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
            console.log(data)
            dispatch(getItemCreator(data.data.product))
        })
    }
}

export const getProductsApi = (productId) => {
    return (dispatch) => {
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query:
                    `
query AddProducts{
  product(id: "${productId}") {
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
`
            }),
        }).then(res => res.json()).then(data => {
            dispatch(getShortProductsCreator(data.data.product))
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
query AddProducts{
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
            console.log(data.data.product.attributes)
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

export const getProductPriceApi = (productId) => {
    return (dispatch) => {
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query:
                    `
                query GetProdPrice{
            product(id: "${productId}") {
                prices {
      currency {
        label
        symbol
      }
      amount
    }
            }
        }
        `
            }),
        }).then(res => res.json()).then(data => {
            dispatch(setCurrentProductPriceCreator(data.data.product.prices, productId))
        })
    }
}
export const getPricesApi = (productId) => {
    return (dispatch) => {
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query:
                    `
                query GetProdPrice{
            product(id: "${productId}") {
                prices {
      currency {
        label
        symbol
      }
      amount
    }
            }
        }
        `
            }),
        }).then(res => res.json()).then(data => {
            dispatch(setChosenPricesCreator(data.data.product.prices, productId))
        })
    }
}
export const _productsIdArr = [
    `huarache-x-stussy-le`,
    `jacket-canada-goosee`,
    `ps-5`,
    `xbox-series-s`,
    `apple-imac-2021`,
    `apple-iphone-12-pro`,
    `apple-airpods-pro`,
    `apple-airtag`,
]




