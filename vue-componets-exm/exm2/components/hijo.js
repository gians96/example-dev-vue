Vue.component('hijo',{
    template:
    `
    <div class="p-5 bg-success text-white">
        <h4>Componente hijo {{numero}}</h4>
        <h4>Nombre hijo {{nombre}}</h4>
        
        
    </div>
    `,
    props:['numero'],
    data(){
        return{
            nombre:'Shock'
        }
    },
    mounted() {
        this.$emit('nombreHijo',this.nombre)
    },
})