<template>
  <div class="container">
    <!-- Logo section -->
    <div class="logoSection">
      <img 
        class="logoSectionImage" 
        :src="hangmanLogo">
    </div>
    <!-- Button section -->
    <div class="buttonSection">
      <router-link 
        tag="button" 
        to="/beforeConsole"
        class="btn btn-outline-info"
      >Start game</router-link>
      <router-link 
        tag="button" 
        to="/scoreRecord"
        class="btn btn-outline-info"
      >Ranking</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        'hangmanLogo': 'https://www.brandcrowd.com/gallery/brands/pictures/picture13878397511894.jpg'
      }
    }
  }
</script>

<style scoped>

  /* Logo section */

  .logoSection {
    margin: 20px 0px;
    text-align: center;
  }

  .logoSectionImage {
    width: 50%
  }

  /* Button section */

  .buttonSection {
    margin: 20px 0px;
    text-align: center
  }

  .buttonSection .btn {
    font-size: 20px;
  }

</style>
