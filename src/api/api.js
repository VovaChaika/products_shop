import {ApolloClient, gql, InMemoryCache, useQuery} from "@apollo/client";
import {request, gql as ggg} from 'graphql-request';
import React from "react";
import {Query} from "@apollo/client/react/components";


export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});
export let state = []

function _AddQueryData(query) {
    const {loading, error, data} = useQuery(query);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    let attribute = [];
    let imgs = [];
    let prices = [];
    let counter = 0;
    (data.product.attributes?.map((items) => {
        attribute.push(items)
    }));
    (data.product.gallery?.map((items) => {
        imgs.push(items)
    }));
    data.product.prices?.map((items) => {
        prices.push(items)

        counter++
    });
    Object.assign(prices, {id: data.product.id});


    let state = {
        id: data.product.id,
        category: data.product.category,
        name: data.product.name,
        img: imgs,
        inStock: data.product.inStock,
        brand: data.product.brand,
        attribute: attribute,
        description: data.product.description,
        prices: prices,
        priceUSD: data.product.prices[0].amount,
        priceGBP: data.product.prices[1].amount,
        priceAUD: data.product.prices[2].amount,
        priceJPY: data.product.prices[3].amount,
        priceRUB: data.product.prices[4].amount,
    }

    return state
}

export const AddQueryData = (query) => {
    return <Query query={query}>
        {
            ({loading, error, data}) => {
                if (loading) return <p>Loading…</p>;
                if (error) return <p>Error :(</p>;
                let attribute = [];
                let imgs = [];
                let prices = [];
                let counter = 0;
                (data.product.attributes?.map((items) => {
                    attribute.push(items)
                }));
                (data.product.gallery?.map((items) => {
                    imgs.push(items)
                }));
                data.product.prices?.map((items) => {
                    prices.push(items)
                    console.log(prices?.[counter])

                    counter++
                });
                Object.assign(prices, {id: data.product.id})
                console.log(prices)

                let state = {
                    id: data.product.id,
                    category: data.product.category,
                    name: data.product.name,
                    img: imgs,
                    inStock: data.product.inStock,
                    brand: data.product.brand,
                    attribute: attribute,
                    description: data.product.description,
                    prices: prices,
                    priceUSD: data.product.prices[0].amount,
                    priceGBP: data.product.prices[1].amount,
                    priceAUD: data.product.prices[2].amount,
                    priceJPY: data.product.prices[3].amount,
                    priceRUB: data.product.prices[4].amount,
                }

                return state
            }
        }
    </Query>
}
export const productsAPI = {
    GetProductsAPI: () => {
        const dataArr = []
        const currProduct = []
        _productsArr.map((product) => (
            currProduct.push(gql(product))
        ))
        currProduct.map((query) => (
            dataArr.push(_AddQueryData(query))
        ))
        return dataArr
    }
}
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
    // {
    //     GetLocationsAPI: fetch('http://localhost:4000/', {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({
    //             query:
    //                 `query Query {categories { name}}`
    //         }),
    //     }),
    // },
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
export const currencyAPI = {
    GetCurrenciesAPI: () => {
        const dataArr = []
        const currProduct = []
        _productsArr.map((product) => (
            currProduct.push(gql(product))
        ))
        currProduct.map((query) => {
            dataArr.push(_AddQueryData(query).prices)
        })
        return dataArr
    }
}

