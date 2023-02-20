const { defineStore } = Pinia;

export default defineStore("alertModalStore", {
    state: () => ({
        alertMsg: "",
        modal: {},
    }),
    actions: {
        tieModal(modal){
            this.modal = modal;
        },
        showAlertModal(msg){
            this.alertMsg = msg;
            this.modal.show();
            setTimeout(()=> {
                this.modal.hide();
            },1000)
        }
    }
})