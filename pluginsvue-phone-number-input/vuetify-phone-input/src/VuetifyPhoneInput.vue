<script lang="ts">
    import {PropValidator} from 'vue/types/options.js';
    import VTextField from 'vuetify/lib/components/VTextField/VTextField';
    import VSelect from 'vuetify/lib/components/VSelect/VSelect';
    import countries from './countries';
    import {parsePhoneNumberFromString} from 'libphonenumber-js/min/';

    export default VTextField.extend({
        name: 'VuetifyPhoneInput',
        props: {
            value: {
                type: String,
                default: () => '',
                validator: (val) => {
                    return typeof val === 'string';
                },
            } as PropValidator<string>,
            type: {
                type: String,
                default: () => 'tel',
            },
            placeholder: {
                type: String,
                default: () => '#',
            },
            countries: {
                type: Array,
                default: () => [],
            },
            countryCode: {
                type: [Number, String],
                default: () => '',
            },
            prependCountryCode: {
                type: Boolean,
                default: () => true,
            },
            returnWithCountryCode: {
                type: Boolean,
                default: () => true,
            },
        },
        data: () => {
            return {
                internalCountryCode: '',
            };
        },
        watch: {
            value: {
                handler(value: string) {
                    this.setPhoneNumber(
                        value.replace(new RegExp('^00'), '+')
                    )
                },
                immediate: true,
            },
            countryCode: {
                handler(countryCode: [string, number]) {
                    this.setPhoneNumber('+' + countryCode + this.internalValue);
                },
                immediate: true,
            },
        },
        methods: {
            genPrependSlot() {
                if (!this.prependCountryCode) return false;

                return this.genSelector();
            },
            genSelector() {
                const selections = this.countries.length ? this.countries : countries.sort((a, b) => Number(a.code) - Number(b.code));

                if (selections.length === 0) return;

                return this.$createElement(VSelect, {
                    props: {
                        items: selections.map((el) => {
                            return {
                                text: `${el.name} (+${el.code})`,
                                value: el.code,
                            }
                        }),
                        placeholder: this.placeholder,
                        value: this.internalCountryCode || selections[0].code,
                        disabled: selections.length == 1,
                    },
                    on: {
                        input: this.selectCountry,
                    },
                    class: {
                        'pt-0': true,
                        'mt-0': true,
                        'mr-1': true,
                    },
                    ref: 'countrySelector',
                });
            },
            onInput(e) {
                VTextField.options.methods.onInput.call(this, e);

                this.setPhoneNumber(e.target.value);
            },
            onBlur(e) {
                VTextField.options.methods.onBlur.call(this, e);

                this.setPhoneNumber(e.target.value);

                this.$emit('phone', this.preparePhoneNumber(this.internalValue));
            },
            selectCountry(code: string) {
                this.$emit('country', this.internalCountryCode = code);

                if (this.returnWithCountryCode) this.$emit('phone', this.preparePhoneNumber(this.internalValue));
            },
            preparePhoneNumber(phone: string): string {
                let final = phone;

                if (!this.prependCountryCode) return this.internalCountryCode + phone;

                if (!final.startsWith('+')) {
                    final = '+' + this.internalCountryCode + phone;
                }

                return final.split(' ').join('');
            },
            setPhoneNumber(phone: string) {
                const phoneNumber = parsePhoneNumberFromString(this.preparePhoneNumber(phone), this.internalCountryCode.toString());

                if (!phoneNumber) return;

                if (!phoneNumber.isValid()) return;

                this.internalValue = phoneNumber.formatNational();
                this.internalCountryCode = Number(phoneNumber.countryCallingCode);
            },
        },
    });
</script>
