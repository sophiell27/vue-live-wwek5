import cartStore from "../store/cartStore.js";


const {mapState,mapActions} = Pinia;

export default {
    template:  `
    <p v-if="!carts.length" class="text-danger text-center">購物車現時為空，請加入產品</p>
    <div v-else>
    <table class="table">
    <thead>
        <tr>
            <th></th>
            <th>品名</th>
            <th>數量/單位</th>
            <th>單價</th>
        </tr>
    </thead>
   <tbody>
   <tr v-for="item in carts" :key="item.id">
   
       <td > 
       <button type="button" class="btn btn-outline-danger" @click="delCartItem(item.id)"> X  </button>
       </td >
       <td > {{item.product.title}}</td>
       <td >
       <div class="input-group input-group-sm w-50 ">
       <input type="number"  min="1" max="10" class="form-control w-25" :value="item.qty" @change="(evt) => changeCartQty(item.id,evt)" />
       <span class="input-group-text"> {{item.product.unit}}</span>
       </div>
       </td>
       <td> $ {{item.product.price}}</td>
   </tr>
   </tbody>
   <tfoot>
   <tr>
   <td></td>
   <td></td>
   <td>總計</td>
   <td> $ {{total}}</td>
   </tr>
   </tfoot>
    </table> 
    <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-outline-danger" @click="clearCart">清空購物車</button>
    </div>
    </div>`,
    computed: {
        ...mapState(cartStore,["carts", "total"])
    },
    methods: {
        ...mapActions(cartStore,["getCart","changeCartQty","delCartItem", "clearCart"]),
    },
    mounted(){
        this.getCart();
    }
}