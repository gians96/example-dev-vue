import VuetifyPhoneInput from './VuetifyPhoneInput.vue'

const install = (Vue: any, options: {}) => {
    Vue.component('VuetifyPhoneInput', VuetifyPhoneInput);
};

export default {
    install,
    VuetifyPhoneInput,
};
