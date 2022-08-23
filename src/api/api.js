import {ApolloClient, gql, InMemoryCache, useQuery} from "@apollo/client";
import {request, gql as ggg} from 'graphql-request';
import React from "react";


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
    (data.product.attributes?.map((items) => {
        attribute.push(items)
    }));
    (data.product.gallery?.map((items) => {
        imgs.push(items)
    }));
    (data.product.prices?.map((items) => {
        prices.push(items)
    }));

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

// export const _AddQueryData = (query) => {
//     return <Query query={query}>
//         {
//             ({ loading, error, data }) => {
//             if (loading) return <p>Loading…</p>;
//             if (error) return <p>Error :(</p>;
//             let attribute = [];
//             let imgs = [];
//             let prices = [];
//             (data.product.attributes?.map((items)=>{
//                 attribute.push(items)
//             }));
//             (data.product.gallery?.map((items)=>{
//                 imgs.push(items)
//             }));
//             (data.product.prices?.map((items)=>{
//                 prices.push(items)
//             }));
//
//             state.push({
//                 id: data.product.id,
//                 category: data.product.category,
//                 name: data.product.name,
//                 img: imgs,
//                 inStock: data.product.inStock,
//                 brand: data.product.brand,
//                 attribute:attribute,
//                 description: data.product.description,
//                 prices: prices,
//                 priceUSD: data.product.prices[0].amount,
//                 priceGBP: data.product.prices[1].amount,
//                 priceAUD: data.product.prices[2].amount,
//                 priceJPY: data.product.prices[3].amount,
//                 priceRUB: data.product.prices[4].amount,
//             })
//                 return alert("1!!")
//         }}
//     </Query>
//     }
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
// export const productsAPI = {
//     GetProductsAPI: () => {
//         const dataArr = []
//         let state
//         let attribute = [];
//         let imgs = [];
//         let prices = [];
//
//         _productsArr.map((product) => {
//             let sqlProduct = ggg(product)
//             request('http://localhost:4000/', sqlProduct).then((data) => {
//                     state = {
//                         id: data.product.id,
//                         category: data.product.category,
//                         name: data.product.name,
//                         img: imgs,
//                         inStock: data.product.inStock,
//                         brand: data.product.brand,
//                         attribute: attribute,
//                         description: data.product.description,
//                         prices: prices,
//                         priceUSD: data.product.prices[0].amount,
//                         priceGBP: data.product.prices[1].amount,
//                         priceAUD: data.product.prices[2].amount,
//                         priceJPY: data.product.prices[3].amount,
//                         priceRUB: data.product.prices[4].amount,
//                     };
//                     dataArr.push(state);
//                     return dataArr
//                 }
//             );
//         })
//         return dataArr
//     }
// }
// export const currencyAPI = {
//     GetCurrenciesAPI: () => {
//         _productsArr.map((product)=>{
//             _AddQueryData(gql(product))
//         })
//         console.log(state)
//         return state
//     }
// }
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
const _productsArr = [
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
