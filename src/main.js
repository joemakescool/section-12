import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.directive('highlight', {
  bind(el, binding) {
    // eslint-disable-next-line no-console
    console.log(el);
    //el.style.backgroundColor = binding.value; // didn't work
    let delay = 0;
    if (binding.modifiers['delayed']) {
      delay = 2000;
    }
    setTimeout( ()=> {
      if (binding.arg === 'background') {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value;
      }
    }, delay);

  }
});// v-highlight

new Vue({
  render: h => h(App),
}).$mount('#app');
