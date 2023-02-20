import productStore from "../store/productStore.js";

import cartStore from "../store/cartStore.js";

import alertModalStore from "../store/alertModalStore.js";

import productModalStore from "../store/productModalStore.js";

// import alertComponent from "./alertComponent.js";

const {mapState,mapActions} = Pinia;

export default {
    data(){
        return { 
            
        }
    },
    template:  `<table class="table">
    <thead>
    <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
    </tr></thead>
    <tbody>
    <tr v-for="product in products" :key="product.id">
    <td style="height: 100px; width; 100px"> <img :src="product.imageUrl" :alt="product.title" class="img-fluid w-auto h-100"/></td>
    <td>{{product.title}}</td>
    <td> 
    <p>原價 <del>{{product.origin_price}} </del> 元</p>
    <h5>現在只要 {{product.price}} 元</h5>
    </td>
    <td>
    <div class="btn-group">
    <button type="button" class="btn btn-outline-secondary" @click="showProductModal(product)">查看更多</button>
    <button type="button" class="btn btn-outline-danger" @click="addCart(product.id)">加到購物車</button>
    </div>
    </td>

    </tr>
    </tbody>
    </table>`,
    methods: {
        ...mapActions(productStore, ["getProducts"]),
        ...mapActions(cartStore, ["addCart", "getCart"]),
        ...mapActions(alertModalStore,["showAlertModal"]),
        ...mapActions(productModalStore, ["showProductModal"]),
    },
    mounted(){
        this.getProducts();
    },
    computed: {
        ...mapState(productStore,["products"])
        
    }
}