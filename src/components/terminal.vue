<template>
    <div class="terminal-content" id="terminal-content">
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <ModalComponent v-if="showModal" @close-modal="showModal = false" />
        </transition>
        <BarComponent @closeTerminal="closeTerminal" @openModal="openModal"></BarComponent>
        <NavTerminalComponent v-if="showNavTerminal" ref="navterminal" @showItemProfile="showItemProfile" @CommandTerminal="OpenTerminal">
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
        removeFocusNavTerminal() {
            this.$refs.navterminal.removeFocusNavTerminal();
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
            if (!this.inProfileComponent){
                this.showModal = value;
            }
        },
        handleKeyDown(event) {
            this.keysPressed[event.key] = true;
            if (this.keysPressed['Control'] && this.keysPressed['m']) {
                this.openModal(!this.showModal);
                if (!this.inProfileComponent) {
                    this.focusNavTerminal();
                }
            }else if (this.keysPressed['Control'] && this.keysPressed['x']) {
                this.closeTerminal(false);
            }else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
            } 
        },
        handleKeyUp(event) {
            this.keysPressed[event.key] = false;
        },
        showItemProfile(values){
            this.$emit('showItemProfile', values);
        }
    },
    data() {
        return {
            showNavTerminal: true,
            showCommandTerminal: false,
            showModal: false,
            keysPressed: {}
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    },
    beforeUnmount() {  // Se usa en lugar de beforeDestroy
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    },
    props: {
        inProfileComponent: {
            type: Boolean,
            request: true
        }
    }
}

</script>

<style scoped>
.terminal-content {
    margin-top: 34px;
    margin-bottom: 65px;
    width: 130vh;
    height: 80vh;
    background-color: #1C2639;
    border-radius: 11px;
}
</style>