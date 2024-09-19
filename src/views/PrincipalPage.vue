<template>
    <div class="principal-content" id="principal-content">
        <div>
            <img v-if="showImage" src="@/assets/terminal.png" alt="Show" class="terminal-image" @click="ShowTerminal">
            <div v-if="showTerminal" class="terminal">
                <TerminalComponent @closeTerminal="closeTerminal"></TerminalComponent>
            </div>
        </div>
    </div>
</template>

<script>
import TerminalComponent from "@/components/terminal.vue"
export default {
    name: 'PrincipalPageView',
    data(){
        return{
            showImage: false,
            showTerminal: false,
        }
    },
    methods: {
        ShowImageTerminal : function(){
            this.showImage = true;
        },
        ShowTerminal : function(){
            this.showImage = false;
            this.showTerminal = true;
        },
        closeTerminal(value){
            if (!value){
                this.showTerminal = false;
                this.showImage = true;
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

/* Estilos para las transiciones */
.expand-enter-active, .expand-leave-active {
    transition: transform 0.3s ease; /* Duración y efecto de la transición */
}

.expand-enter, .expand-leave-to {
    transform: scale(0.5); /* Tamaño inicial para la entrada y final para la salida */
}

.principal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.terminal-image {
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