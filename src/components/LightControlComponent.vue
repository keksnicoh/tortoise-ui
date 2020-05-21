<template>
  <v-btn-toggle v-bind:value="lightValue">
    <v-btn
      value="auto"
      v-on:click="updateValue({controlled:true,value:value?value.value:true})"
      v-bind:disabled="disabled"
      v-bind:color="colorAuto"
    >
      <v-icon>{{iconEye}}</v-icon>
    </v-btn>
    <v-btn
      value="on"
      v-on:click="updateValue({controlled:false,value:true})"
      v-bind:disabled="disabled"
      v-bind:color="colorOn"
    >On</v-btn>
    <v-btn
      value="off"
      v-on:click="updateValue({controlled:false,value:false})"
      v-bind:disabled="disabled"
      v-bind:color="colorOff"
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
    iconEye: function() {
      if (this.disabled) {
        return "fas fa-sync fa-spin"
      }
      return this.lightValue == "auto" ? "far fa-eye" : "far fa-eye-slash";
    },
    colorAuto: function() {
      return this.lightValue == "auto" ? "highlight" : "";
    },
    colorOn: function() {
      return this.lightValue == "on" ? "colorOn" : "";
    },
    colorOff: function() {
      return this.lightValue == "off" ? "colorOff" : "";
    },
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
