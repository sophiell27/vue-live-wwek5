const { defineStore } = Pinia;

export default defineStore("productModalStore", {
    state: ()=> ({
        productModal: {},
        product: {},
        inputQty:  1,
        qtyInput: ""

    }),
    actions: {
        tieProductModal(modal){
            this.productModal = modal;
            // console.log(this.productModal)
        },
        showProductModal(product){
            this.product = product;
            this.qtyInput.value = 1;
            this.productModal.show();
            // console.log(this.product);
        },
        hideProductModal(){
            this.productModal.hide();
        },
        tieInput(input){
            this.qtyInput = input;
        },
        getQty(evt){
            this.inputQty = Number(evt.target.value)
        }
    }
})