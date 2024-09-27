<template>
    <div class="principal-content" id="principal-content" @click="focusTerminal">
        <div class="terminal-content">
            <img v-if="showImage" src="@/assets/terminal.png" alt="Show" class="terminal-image" @click="ShowTerminal">
            <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="showTerminal" class="terminal">
                    <TerminalComponent @closeTerminal="closeTerminal" @openModal="openModal" ref="terminal">
                    </TerminalComponent>
                </div>
            </transition>
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
            }
        },
        focusTerminal() {
            if (this.showTerminal) {
                this.$refs.terminal.focusNavTerminal();
            }
        },
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            // Para asegurar que el modal esté visible antes de hacer la transición
            el.offsetHeight; // Trigger a reflow
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 0;
            setTimeout(() => {
                done();
                this.showImage = true;
            }, 300); // El tiempo debe coincidir con la duración de la transición
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