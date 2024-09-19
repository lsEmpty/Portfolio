<template>
    <div class="terminal" id="terminal" @click="focusInput">
        <div v-for="(line, index) in output" :key="index" v-html="line" class="contenido"></div>
        <span style="color: #8f3f38;" class="contenido">danid</span> <span style="color: #2d4663;"
            class="contenido">~\Desktop\Portfolio</span>
        <textarea v-model="input" @keydown.enter="executeCommand" ref="inputField" class="input" rows="1"
            @input="adjustHeight" @keydown="preventBackspace"></textarea>
    </div>
</template>

<script>
export default {
    name: 'CommandsComponent',
    data() {
        return {
            input: '> ',
            output: [],
            clearSpace: false
        }
    },
    methods: {
        focusInput() {
            this.$refs.inputField.focus(); // Enfoca el textarea al hacer clic en la consola
        },
        executeCommand() {
            const command = this.input.trim().substring(2);
            if (command != '') {
                this.input = '> ';
                this.output.push(`<span style="color: #853693;">></span><span style="color: #fdff90;"> ${command}</span>`);
                const terminal = document.getElementById('terminal');
                terminal.style.overflowY = 'auto';
                if (command == 'clear') {
                    terminal.style.overflowY = 'unset';
                    this.output = [];
                } else if (command == 'cls') {
                    terminal.style.overflowY = 'unset';
                    this.output = [];
                } else {
                    this.output.push(`<span style="color:#E96A5E;">${command}: The term '${command}' is not recognized as the name of an executable function.<br>Check the spelling of the name and try again.</span>`);
                }
                this.$nextTick(() => {
                    const terminal = this.$refs.inputField.parentElement;
                    terminal.scrollTop = terminal.scrollHeight;
                });
                this.clearSpace = true;
            }
        }, adjustHeight() {
            const textarea = this.$refs.inputField;
            textarea.style.height = 'auto'; // Restablece la altura
            textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido
            if (this.clearSpace) {
                this.simulateBackspace();
                this.clearSpace = false;
            }else if (this.input.length > 200) {
                this.simulateBackspace();
            }
        },
        preventBackspace(event) {
            // Evita que el usuario borre el símbolo ">"
            if (this.input.length <= 2 && event.key === 'Backspace') {
                event.preventDefault(); // Previene la acción de borrar
            }
        },
        simulateBackspace() {
            if (this.input.length > 0) {
                this.input = this.input.slice(0, -1); // Elimina el último carácter del input
            }
        }
    }
}
</script>

<style scoped>
.contenido {
    font-family: "Playpen Sans", cursive;
    font-size: 17px;
    font-optical-sizing: auto;

    /**/
    word-wrap: break-word;
    /* Permite que las palabras largas se rompan */
    white-space: pre-wrap;
    /* Mantiene los espacios y saltos de línea */
}

.terminal {
    height: 73.6vh;
    border-radius: 0 0 10px 10px;
    background-color: #1C2639;
    padding: 10px 10px 0 10px;
}

.input {
    width: 100%;
    border: none;
    outline: none;
    color: #fdff90;
    background: transparent;
    resize: none;
    font-family: "Playpen Sans", cursive;
    font-size: 17px;
    font-optical-sizing: auto;
}
</style>
