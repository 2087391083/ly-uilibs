import { defineComponent } from "vue"

import "./TestCom.scss"

export default defineComponent({
    name: "TestCom",
    setup() {
        return (): JSX.Element => <div class="TestCom">TestCom</div>
    }
})
