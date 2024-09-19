<template>
    <div class="terminal-content" id="terminal-content">
        <BarComponent @closeTerminal="closeTerminal"></BarComponent>
        <NavTerminalComponent></NavTerminalComponent>
        <CommandsComponent v-if="m"></CommandsComponent>
    </div>
</template>

<script>
import BarComponent from '@/components/bar.vue'
import CommandsComponent from '@/components/commands.vue'
import NavTerminalComponent from '@/components/nav-terminal.vue'
export default {
    name : 'TerminalComponent',
    components: {
        BarComponent,
        CommandsComponent,
        NavTerminalComponent
    },
    methods : {
        closeTerminal(value){
            this.$emit('closeTerminal', value); // Reenviar el evento al padre
        }
    },
    data(){
        return{
            m : false
        }
    }
}

</script>

<style scoped>
    .terminal-content{
        margin-top: 60px;
        margin-bottom: 55px;
        width: 130vh;
        height: 80vh;
        background-color: #1C2639;
        border-radius: 11px; 
    }
</style>