<template>
  <v-container>
    <v-tabs>
      <v-tab to="/admin/videos">admin</v-tab>
      <v-tab to="/admin/tags">Tags</v-tab>
    </v-tabs>
  </v-container>
</template>

<script>
//si solo ponemos el middlewahre llamado [auth], esta vista solo sera vista si alguien esta logeado,
//si no lo esta te redirigira al login

//se va a crear un nuevo middleware donde se hara la validacion del rol 
export default {
    middleware: 'auth-admin'
}
</script>