const { defineStore } = Pinia;
import {url,path} from "../config.js"

export default defineStore("productStore", {
    state: ()=> ({
        products: []
    }),
    getters: {
        productlist: () => {

        }
    },
    actions: {
        getProducts(){
            axios.get(`${url}api/${path}/products`)
            .then(res => {
                this.products = res.data.products;
                // console.log(this.products)
            })
            .catch(err => {
                console.log("無法取得產品列品");
            })
        }
    }

})