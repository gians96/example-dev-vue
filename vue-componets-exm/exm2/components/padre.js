Vue.component('padre',{
    template:
    `
    <div class="p-5 bg-dark text-white">
        <h2>Componente Padre: {{numeroP}}</h2>
        <button class="btn btn-danger" @click="numeroP++">+</button>
        {{nombrePadre}}
        <hijo :numero="numeroP" @nombreHijo = "nombrePadre = $event"></hijo>
    </div>
    `,
    data() {
        return {
            numeroP:2,
            nombrePadre: ''
        }
    },
})