<template>
    <div class="principal-content" id="principal-content" @click="focusTerminal">
        <div class="terminal-content">
            <img v-if="showImage" src="@/assets/terminal.png" alt="Show" class="terminal-image" @click="ShowTerminal">
            <div v-if="showTerminal" class="terminal">
                <TerminalComponent @closeTerminal="closeTerminal" @openModal="openModal" ref="terminal"></TerminalComponent>
            </div>
        </div>
    </div>
</template>

<script>
import TerminalComponent from "@/components/terminal.vue"
export default {
    name: 'PrincipalPageView',
    data() {
        return {
            showImage: false,
            showTerminal: false
        }
    },
    methods: {
        ShowImageTerminal: function () {
            this.showImage = true;
        },
        ShowTerminal: function () {
            this.showImage = false;
            this.showTerminal = true;
        },
        closeTerminal(value) {
            if (!value) {
                this.showTerminal = false;
                this.showImage = true;
            }
        },
        focusTerminal() {
            if (this.showTerminal) {
                this.$refs.terminal.focusNavTerminal();
            }
        }
    },
    mounted() {
        this.ShowImageTerminal();
    },
    components: {
        TerminalComponent,
    },
}
</script>

<style scoped>

.principal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.terminal-image {
    margin-top: -30px;
    height: 80px;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.terminal-image:hover {
    transform: scale(1.05);
}

.terminal-image:active {
    transform: scale(1.00);
}
</style>