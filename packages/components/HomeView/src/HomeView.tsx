{/* <template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
</template>

<script lang="ts"> */}
import { defineComponent } from 'vue'
// import { Options, Vue } from 'vue-class-component';
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

// @Options({
//   components: {
//     HelloWorld,
//   },
// })
// export default class HomeView extends Vue {}

export default defineComponent({
    name: 'HomeView',
    setup() {
        return (): JSX.Element => <div style="background-color:yellow;">
            {/* <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> */}
            Welcome to Your Vue.js + TypeScript App
        </div>
    },
})
// </script>
