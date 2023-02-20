import alertModalStore from "../store/alertModalStore.js";
const {mapState, mapActions}  = Pinia;
export default {
    data(){
        return {
            alertmodal: ""
        }
    },
    template: `
    <div class="modal" tabindex="-1" ref="alertmodal" ><div class="modal-dialog modal-sm modal-dialog-centered" >
    <div class="modal-content">
      <div class="modal-body">
        <p class="mt-2 mb-1">{{alertMsg}}</p>
      </div>
      <div class="modal-footer p-1">
        <button type="button" class="btn btn-sm text-primary" >關閉</button>
      </div>
    </div>
  </div></div>`,
  mounted(){
    this.alertmodal = new bootstrap.Modal(this.$refs.alertmodal);
    this.tieModal(this.alertmodal);
  },
  methods: {
    ...mapActions(alertModalStore,["tieModal"])
  },
  computed: {
    ...mapState(alertModalStore,["alertMsg"])
  }
}