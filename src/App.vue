<template>
  <div id="app">
    <h3>Demo Echo String</h3>
    <b-row class="my-2">
      <b-col md="4" class="my-1 ml-2">
        <b-input-group prepend="Enter here" class="echo">
          <b-form-input
              id="filter-input"
              v-model="clientString"
              type="text"
              @change="encode"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="info" :disabled="!clientString" v-on:click="getEcho">Echo</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col md="4" class="my-1">
        <b-input-group prepend="Echo Response:">
          <b-input type="text" v-model="echoResponse"></b-input>
        </b-input-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import echoService from '@/service/echo-service'
import encoder from "@/common/encoder";
export default {
  name: 'App',
  data() {
    return{
      clientString: '',
      encryptedClientString: '',
      echoResponse: ''
    }

  },
  methods: {
    encode: function() {
      this.encryptedClientString = encoder.getEncodedString(this.clientString)
    },
    getEcho: async function () {
      const response = await echoService.getEcho(this.encryptedClientString).catch(error => {
        console.log(error)
        throw error
      })

      const self = this
      if(response != undefined && response.data != undefined && response.data.length != 0){
        self.echoResponse = response.data
      }
    }
  }
}
</script>

<style>
h3{
  background-color: darkgray;
}
</style>
