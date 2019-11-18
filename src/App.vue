<template>
    <div id="app">

        <h1>Custom Directives</h1>
        <p v-highlight:background.delayed="'red'">Color this</p>
        <p v-local-highlight:background.blink="{mainColor: 'red', secondColor: 'green', delay: '3000' }">
          My local directive!
        </p>

      <h1>Directives Exercise</h1>
      <!-- Exercise -->
      <!-- Build a Custom Directive which works like v-on (Listen for Events) -->
      <button v-my-on:click="clicked">Click me for alert!</button>
      <hr>
      <div style="width: 100px; height: 100px; background-color: lightcoral"
           v-my-on:mouseenter="mouseEnter"
           v-my-on:mouseleave="mouseLeave"

      >

      </div>

    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {},
      methods: {
          clicked() {
            alert('I was clicked!');
          },
        mouseEnter() {
          // eslint-disable-next-line no-console
            console.log('mouse entered!!')
        },
        mouseLeave() {
          // eslint-disable-next-line no-console
            console.log('mouse leaves')
        }
      },

        directives: {
          'local-highlight': {
                bind(el, binding) {
                    // eslint-disable-next-line no-console
                    console.log(el);
                    //el.style.backgroundColor = binding.value; // didn't work
                    let delay = 0;
                    if (binding.modifiers['delayed']) {
                        delay = 2000;
                    }

                    if (binding.modifiers['blink']) {
                      let mainColor = binding.value.mainColor;
                      let secondColor = binding.value.secondColor;
                      let currentColor = mainColor;

                      setTimeout(() => {
                        setInterval(() => {
                          currentColor === secondColor ? currentColor = mainColor : currentColor = secondColor;
                          if (binding.arg === 'background') {
                            el.style.backgroundColor = currentColor;
                          } else {
                            el.style.color = currentColor;
                          }
                        }, binding.value.delay);

                        }, 500);
                    } else {
                        setTimeout(() => {
                            if (binding.arg === 'background') {
                                el.style.backgroundColor = binding.value.mainColor;
                            } else {
                                el.style.color = binding.value.mainColor;
                            }
                        }, delay);
                    }
                }
            },
          'my-on': {
              bind(el, binding) {
                // el.onclick = function() {
                //   binding.value();
                // }
                const type = binding.arg;
                const fn = binding.value;
                el.addEventListener(type, fn);

              }
          }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
