los computeds y data la diferencia es que los compute traen valores con logica en cambio el data no

los props hacen comunicacion entre componentes de una padre componente a un hijo
<hijo :numero="numeroP"></hijo> padre.js
 <h4>Componente hijo {{numero}}</h4>  hijo.js
  props:['numero'], hijo.js
##############

para traer de un componente hijo a un componente padre se usa la funcion mounted en el hijo

 mounted() {
        this.$emit('nombreHijo',this.nombre)
    },

componente padre lo traemos en el template 
<hijo @nombreHijo = "nombrePadre = $event"></hijo>
###########################