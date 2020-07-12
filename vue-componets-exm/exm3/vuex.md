Al trabajar con Vuex , lo que hace esta libreria es trabjar con variables global que pueden ser
accedidas por diferentes componentes.

    const store = new Vuex.Store({
        state: {
            numero: 10
        },
        mutations:{
            aumentar(state){
                state.numero++;
            }
        }
    });


state: se declaran las variables globales
                <h1>numero{{$store.state.numero}}</h1>

mutations: declarar metodos globales
                <button @click="$store.commit('aumentar')">+</button>
#########################MAPEO#########################################################

LLAMARA VARIABLES CON COMPUTED

Usando el computes con una funcion de Vuex (la variable const store = new Vuex.Store)
se puede llamar a la misma variable usando mapeo con la funcion computed, como ya sabiamos 
que esta trae datos con logica dentro.

Vue.component('titulo',{
            template:
            `
            <div>
                <h1>numero{{numero}}</h1>
                <h2>numero 2 : {{numero2}}</h2>
                <hijo></hijo>
            </div>
            `,
            computed: {
                ...Vuex.mapState(['numero','numero2'])
            },
        });

 const store = new Vuex.Store({
        state: {
            numero: 10,
            numero2: 10
        }
    });

LLAMARA METODOS CON METHODOS
En el componente se crea el  methods y se mapea los metodos que vienen del Vuex.Store
...Vuex.mapMutations(['metodo1','metodo2',....])
En el store los metodos son llamados mutations y lo state variables globlaes

  Vue.component('hijo',{
            template:
            `
            <div>
                <button @click="aumentar">+</button>
                <button @click="disminuir(2)">-</button>
                <h1>numero{{numero}}</h1>

            </div>
            `,
            computed: {
                ...Vuex.mapState(['numero','numero2'])
                
            },methods: {
                ...Vuex.mapMutations(['aumentar','disminuir'])
            },
        });


        
    const store = new Vuex.Store({
        state: {
            numero: 10,
            numero2: 10
        },
        mutations:{
            aumentar(state){
                state.numero++;
            },
            disminuir(state,n){
                state.numero -= n;
            }
        }
    });

    LLAMAR METODO ACTIONS

    Sirve para hacer llamados o consumir API's 
    en actions:{}
    se crea una funcion async y await porque este proceso puede demorar y cuando la peticion haya sido completada esta se ejecutara
   En el metodo accion se pasa como parametro commit para poder usar un metodo el las mutations donde se pasa el nombre del metodo y el objeto que se quiere pasar, en esta caso el metodo lo que hace es llenar la varible global en el state y la actions lo que hace es recibir esa informacion del API cualquiera.


     const store = new Vuex.Store({
        state: {
            numero: 10,
            numero2: 10,
            cursos: []
        },
        mutations:{
            aumentar(state){
                state.numero++;
            },
            disminuir(state,n){
                state.numero -= n;
            },
            llenarCursos(state,cursosAccion){
                state.cursos = cursosAccion
            }
        },
        actions:{
            obtenerCursos: async function ({commit}){
                const datosss = await fetch('cursos.json');
                const cursos = await datosss.json();
                commit('llenarCursos',cursos)
            }
        }
    });


     Vue.component('hijo',{
            template:
            `
            <div>
                <button @click="aumentar">+</button>
                <button @click="disminuir(2)">-</button>
                <button @click="obtenerCursos">obtenerCursos</button>
                <h1>numero{{numero}}</h1>
                <ul v-for="item of cursos">
                    <li>{{item.nombre}}</li>
                </ul>
            </div>
            `,
            computed: {
                ...Vuex.mapState(['numero','numero2','cursos'])
                
            },methods: {
                ...Vuex.mapMutations(['aumentar','disminuir']),
                ...Vuex.mapActions(['obtenerCursos'])
            },
        });