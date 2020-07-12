
const app = new Vue({
    el: '#app',
    data: {
        titulo: 'Bandas con Vue',
        bandas:[],
        nuevaBanda: ''
    },
    methods: {
        agregarBanda(){
            this.bandas.push({
                nombre: this.nuevaBanda,
                estado: false
            });
            console.log(this.bandas);
            this.nuevaBanda='';
            localStorage.setItem('banda-vue',JSON.stringify(this.bandas));
        },
        editarBanda(index){
            if(this.bandas[index].estado){
                this.bandas[index].estado=false;
            }else{

                this.bandas[index].estado=true;
            }
            localStorage.setItem('banda-vue',JSON.stringify(this.bandas));

        },
        eliminarBanda(index){
            this.bandas.splice(index,1);
            localStorage.setItem('banda-vue',JSON.stringify(this.bandas));

        }
    },created() {
        let datosDB =JSON.parse(localStorage.getItem('banda-vue'));
        if(datosDB===null){
            this.bandas=[];
        }else{
            this.bandas = datosDB;
        }
    },
})
