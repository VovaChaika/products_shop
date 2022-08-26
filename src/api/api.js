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



