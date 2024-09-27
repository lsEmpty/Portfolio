<template>
    <div class="terminal-content" id="terminal-content">
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <ModalComponent v-if="showModal" @close-modal="showModal = false" />
        </transition>
        <BarComponent @closeTerminal="closeTerminal" @openModal="openModal"></BarComponent>
        <NavTerminalComponent v-if="showNavTerminal" ref="navterminal" @CommandTerminal="OpenTerminal">
        </NavTerminalComponent>
        <CommandsComponent v-if="showCommandTerminal" @NavegatorTerminal="OpenTerminal" @ExitTerminal="closeTerminal">
        </CommandsComponent>
    </div>
</template>

<script>
import BarComponent from '@/components/bar.vue'
import CommandsComponent from '@/components/commands.vue'
import NavTerminalComponent from '@/components/nav-terminal.vue'
import ModalComponent from '@/components/modal-search.vue'
export default {
    name: 'TerminalComponent',
    components: {
        BarComponent,
        CommandsComponent,
        NavTerminalComponent,
        ModalComponent
    },
    methods: {
        closeTerminal(value) {
            this.$emit('closeTerminal', value); // Reenviar el evento al padre
        },
        focusNavTerminal() {
            if (this.showNavTerminal && !this.showModal) {
                this.$refs.navterminal.focusNavTerminal();
            }
        },
        OpenTerminal(navegator, command) {
            this.showNavTerminal = navegator;
            this.showCommandTerminal = command;
        }
        , beforeEnter(el) {
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
            }, 300); // El tiempo debe coincidir con la duración de la transición
        },
        openModal(value) {
            this.showModal = value;
        }
    },
    data() {
        return {
            showNavTerminal: true,
            showCommandTerminal: false,
            showModal: false
        }
    }
}

</script>

<style scoped>
.terminal-content {
    margin-top: 52px;
    margin-bottom: 65px;
    width: 130vh;
    height: 80vh;
    background-color: #1C2639;
    border-radius: 11px;
}
</style>