const { defineStore } = Pinia;

import { url , path } from "../config.js";
import alertModalStore from "./alertModalStore.js";
import productModalStore from "./productModalStore.js";


export default defineStore("cartStore", {
    state: () => ({
        carts: [],
    }),
    getters: {
        total: ({carts}) => {
            const num = carts.reduce((a,b) => a+b.final_total ,0)
            return num;
            console.log(carts);
        }
    },
    actions: {
        getCart(){
            axios.get(`${url}api/${path}/cart`)
            .then(res => {
                this.carts = res.data.data.carts ;
            })
            .catch(err => {
                console.log(err);
            })
        },
        addCart(productId, qty=1){
            const { hideProductModal } = productModalStore();
            const { showAlertModal } = alertModalStore();
            let cartUrl = `${url}api/${path}/cart`;
            let method = "post";
            const cartItem =  this.carts.find(item => item.product.id === productId )
            // console.log(cartItem)
            if (cartItem){
                qty += cartItem.qty
                cartUrl = `${url}api/${path}/cart/${cartItem.id}`;
                method = "put"
            }
             axios[method](cartUrl, {data: {product_id:productId,qty} })
            .then(res=> {
                this.getCart();
                showAlertModal("己加入購物車");
                hideProductModal();
            })
            .catch(err => {
                showAlertModal("無法加入購物車");
                // console.log("無法加入購物車");
            })
        },
        changeCartQty(cartId,evt){
            const currentItem = this.carts.find(item => item.id === cartId);
            const qty = Number(evt.target.value);
           
            const {product_id} = currentItem;
            console.log(product_id,qty)
            axios.put(`${url}api/${path}/cart/${currentItem.id}`, {data: {product_id,qty} })
            .then(res=> {
                this.getCart();
            })
            .catch(err => {
                console.log("無法加入購物車");
            })
            
        },
        clearCart(){
            const { hideProductModal } = productModalStore();
            const { showAlertModal } = alertModalStore();
            if (confirm("是否確定清空購物車？")){
                axios.delete(`${url}api/${path}/carts`)
                .then(res => {
                    showAlertModal("己清空購物車");
                    this.getCart();
                })
                .catch(err => {
                    showAlertModal("無法清空購物車");
                })
            }
        }
    }
})