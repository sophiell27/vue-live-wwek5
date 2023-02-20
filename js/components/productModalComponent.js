import productModalStore from "../store/productModalStore.js";

import cartStore  from "../store/cartStore.js";

const { mapState, mapActions } = Pinia;

export default {
    data(){
        return {
        }
    },
    template:`<div class="modal" tabindex="-1" ref="productModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title"> {{product.title}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
          <div class="col-6">
          <img :src="product.imageUrl" :alt="product.title" class="img-fluid" />
          </div>
          <div class="col-6">
          <p class="badge bg-primary">{{product.category}}</p>
          <p class="mb-3">商品描述： {{product.description}}</p>
          <p class="mb-3">商品內容： {{product.content}}</p>
          <p class="mb-0">原價 <del>{{product.origin_price}}</del> 元</p>
          <h4 class="mb-3">現在只要 {{product.price}} 元</h4>
          <div class="input-group">
          <input type="number" class="form-control" min="1" value="1" @change="(evt) => getQty(evt)" ref="qtyInput" />
          <button type="button" class="btn btn-primary" @click="addCart(product.id, inputQty)">加入購物車</button>
          </div>
          </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>`,
  mounted(){
    this.tieProductModal(new bootstrap.Modal(this.$refs.productModal));
    this.tieInput(this.$refs.qtyInput);

  },
  methods: {
    ...mapActions(productModalStore, ["tieProductModal", "tieInput","getQty" ]),
    ...mapActions(cartStore,["addCart"])
  },
  computed: {
    ...mapState(productModalStore, ["product", "inputQty" ])
  }

}