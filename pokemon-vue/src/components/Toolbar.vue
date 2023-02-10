<template>
  <v-toolbar color="yellow">
    <template v-slot:prepend>
      <h2 class="px-3">Pokemon</h2>
    </template>
    <v-divider class="ms-3" inset vertical></v-divider>

    <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">Home</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn variant="text" to="/lista">Lista</v-btn>

      <v-divider vertical></v-divider>

      <v-btn variant="text" href="https://pokeapi.co/">API</v-btn>

      <v-divider vertical></v-divider>

      <v-btn variant="text" href="https://github.com/vinicio-silva">GitHub</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
