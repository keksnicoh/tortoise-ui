<template>
  <v-btn-toggle v-bind:value="lightValue">
    <v-btn
      value="auto"
      v-on:click="updateValue({controlled:true,value:value?value.value:true})"
      v-bind:disabled="disabled"
    >
      <v-icon>far fa-eye</v-icon>
    </v-btn>
    <v-btn
      value="on"
      v-on:click="updateValue({controlled:false,value:true})"
      v-bind:disabled="disabled"
    >On</v-btn>
    <v-btn
      value="off"
      v-on:click="updateValue({controlled:false,value:false})"
      v-bind:disabled="disabled"
    >Off</v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "LightControlComponent",
  props: {
    value: {
      type: Object
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    lightValue: function() {
      if (!this.value) {
        return "";
      }
      if (this.value.value === true && this.value.controlled === false) {
        return "on";
      }
      if (this.value.value === true && this.value.controlled === true) {
        return "auto";
      }
      if (this.value.value === false && this.value.controlled === false) {
        return "off";
      }
      if (this.value.value === false && this.value.controlled === true) {
        return "auto";
      }
      return "";
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>
