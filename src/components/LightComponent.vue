<template>
  <v-card class="mx-auto">
    <v-img
      class="black--text align-end"
      v-bind:src="webcam.url"
      v-bind:style="webcamStyle"
      v-on:click="handleWebcam"
    >
      <v-card-title></v-card-title>
    </v-img>
    <v-card-text class="text--primary">
      <v-row justify="space-around">
        <v-col cols="4" align-self="center">
          <v-icon v-bind:color="colorLight1">{{iconLight1}}</v-icon>
          <span class="ml-2">Light 1</span>
        </v-col>
        <v-col cols="8" class="text-right">
          <LightControlComponent
            v-bind:value="monitor.switchLight1"
            v-on:input="handleLight1"
            v-bind:disabled="disabled"
          />
        </v-col>
      </v-row>
      <v-row style="cardStyle">
        <v-col cols="4" align-self="center">
          <v-icon v-bind:color="colorLight2" align-self="center">{{iconLight2}}</v-icon>
          <span class="ml-2">Light 2</span>
        </v-col>
        <v-col cols="8" class="text-right">
          <LightControlComponent
            v-bind:value="monitor.switchLight2"
            v-on:input="handleLight2"
            v-bind:disabled="disabled"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import LightControlComponent from "./LightControlComponent";

export default {
  name: "LightComponent",
  components: {
    LightControlComponent
  },
  props: {
    monitor: {
      type: Object
    },
    webcam: {
      type: Object
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    handleLight1: function(value) {
      this.$emit("lightChanged", "switchLight1", value);
    },
    handleLight2: function(value) {
      this.$emit("lightChanged", "switchLight2", value);
    },
    handleWebcam: function() {
      this.$emit("webcamRequest");
    }
  },
  computed: {
    cardStyle: function() {
      return { cursor: "not-allowed" };
    },
    colorLight1: function() {
      if (this.monitor == undefined) {
        return "lightOff";
      }

      if (this.monitor.switchLight1 == undefined) {
        return "lightOff";
      }

      return this.monitor.switchLight1.value ? "lightOn" : "lightOff";
    },
    colorLight2: function() {
      if (this.monitor == undefined) {
        return "lightOff";
      }

      if (this.monitor.switchLight2 == undefined) {
        return "lightOff";
      }

      return this.monitor.switchLight2.value ? "lightOn" : "lightOff";
    },
    iconLight1: function() {
      if (this.monitor == undefined) {
        return "fa-question";
      }

      return this.monitor.switchLight2 == undefined
        ? "fa-question"
        : "far fa-lightbulb";
    },
    iconLight2: function() {
      if (this.monitor == undefined) {
        return "fa-question";
      }

      return this.monitor.switchLight2 == undefined
        ? "fa-question"
        : "far fa-lightbulb";
    },
    webcamLabel: function() {
      if (this.monitor == undefined) {
        return "";
      }

      var date = new Date(this.monitor.webcamDate);

      return date;
    },
    webcamStyle: function() {
      if (this.webcam.loading) {
        return { opacity: 0.5, cursor: "not-allowed" };
      } else {
        return {};
      }
    }
  },
  data: () => ({})
};
</script>
