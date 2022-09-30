import { defineComponent } from "vue"

import "./TestPageLy.scss"

export default defineComponent({
    name: "TestPageLy",
    setup() {
        return (): JSX.Element => <div class="TestPageLy">++++++++++++++TestPageLy====****===============</div>
    }
})