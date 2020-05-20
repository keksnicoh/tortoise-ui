import '@fortawesome/fontawesome-free/css/all.css'

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green.darken4,
        secondary: colors.red.lighten4,
        accent: colors.indigo.base,
        lightOn: colors.orange.base,
        lightOff: colors.grey.base,
      },
    },
  },
  icons: {
    iconfont: 'fa',
  }
});
