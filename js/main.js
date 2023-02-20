const { createApp } = Vue;

const { createPinia } = Pinia;
import { url , path } from "./config.js" 

import ProductComponent from "./components/productComponent.js";

import CartComponent from "./components/cartComponent.js";

import AlertComponent from "./components/alertComponent.js";

import ProductModalComponent from "./components/productModalComponent.js";
import alertModalStore from "./store/alertModalStore.js";
import cartStore from "./store/cartStore.js";
const {  mapState,mapActions } = Pinia;


VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});


Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

const app = createApp({
  data() {
    return {
      alertmodal: "",
    };
  },
  components: {
    ProductComponent,
    CartComponent,
  },
  methods: {
    ...mapActions(alertModalStore, ["showAlertModal"]),
    ...mapActions(cartStore, ["getCart"]),
    submit() {
      let loader = this.$loading.show({
        canCancel: true,
        onCancel: this.onCancel,
        container: this.fullPage ? null : this.$refs.formContainer,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
      }, 1000);
    },
    onSubmit(value){
     if (!this.carts.length){
      this.showAlertModal("購物車內沒有貨品，未能送出訂單");
      return;
     }
      const obj = {
        "data": {
          "user": {
            "name": value["收件人姓名"],
            "email": value.email,
            "tel": value["收件人電話"],
            "address": value["收件人地址"]
          },
          "message": value.message
        }
      }
      if (!confirm("是否確定送出訂單？")){
        return;
      }
      
      axios.post(`${url}api/${path}/order`, obj)
      .then(res => {
        this.showAlertModal("訂單已成功送出");
        this.$refs.orderForm.resetForm();
        this.getCart();
       
      })
      .catch(err => {
        console.log(err);
      })
    },
    validPhone(value){
      const phoneNumber = /^[5,6,8,9]\d{8}$/
      return phoneNumber.test(value)? true: "請輸入超過8位數字電話號碼"

    }

  },
  mounted() {
    this.submit();
    
  },
  computed: {
    ...mapState(cartStore, ["carts"])
  }
});
app.component("AlertComponent", AlertComponent);
app.component("ProductModalComponent", ProductModalComponent);
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("VErrorMessage", VeeValidate.ErrorMessage);

const pinia = createPinia();
app.use(pinia);
app.use(VueLoading.LoadingPlugin);
app.mount("#app");
