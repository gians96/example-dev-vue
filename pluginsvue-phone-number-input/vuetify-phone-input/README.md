# Vuetify Phone Input

Please refer to the 
[TextField](https://vuetifyjs.com/en/components/text-fields)
if you want to see which inherited props will be available.

### Props:

| Name        | Type           | Default  |
| ------------- |:-------------:| -----:|
| `value`|`string`| `''`    |
| `countries`|`[]`|[countries](https://github.com/kingscode/vuetify-phone-input/blob/master/src/countries.ts)|
| `type`|`string`|`tel`|
| `placeholder`|`string`|`#`|
| `countryCode`|`string`-`number`|`''`|
| `prependCountryCode`|`boolean`|`true`|

### Events:
| Name        | Return value           | What  |
| ------------- |:-------------:| -----:|
| `@country`|`string`| The new selected country code    |
| `@phone`|`string`| Equivalent to `@change` event, but with additional features. Gets called on blur |


