<template>
    <div class="terminal" id="terminal" @click="focusInput">
        <div v-for="(line, index) in output" :key="index" v-html="line" class="contenido"></div>
        <span style="color: #8f3f38;" class="contenido">danid</span> <span style="color: #2d4663;"
            class="contenido">~\Desktop\Portfolio</span>
        <textarea v-model="input" @keydown.enter="executeCommand" ref="inputField" class="input" rows="1"
            @input="adjustHeight" @keydown="handleEvent"></textarea>
    </div>
</template>

<script>
export default {
    name: 'CommandsComponent',
    data() {
        return {
            input: '> ',
            output: []
        }
    },
    methods: {
        focusInput() {
            this.$refs.inputField.focus(); // Enfoca el textarea al hacer clic en la consola
        },
        executeCommand(event) {
            const command = this.input.trim().substring(2);
            event.preventDefault();
            if (command != '') {
                this.input = '> ';
                this.output.push(`<span style="color: #853693;">></span><span style="color: #fdff90;"> ${command}</span>`);
                const terminal = document.getElementById('terminal');
                terminal.style.overflowY = 'auto';
                this.commands(command.toLowerCase(), terminal);
                this.$nextTick(() => {
                    const inputField = this.$refs.inputField;
                    if (inputField) {
                        const terminal = inputField.parentElement;
                        terminal.scrollTop = terminal.scrollHeight;
                    }
                });
            }
        }, adjustHeight() {
            const textarea = this.$refs.inputField;
            textarea.style.height = 'auto'; // Restablece la altura
            textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido
            if (this.input.length > 200) {
                textarea.value = this.input.substring(0, 200);
            }
        },
        handleEvent(event) {
            const textarea = this.$refs.inputField;
            // Evita que el usuario borre el símbolo ">"
            if (this.input.length <= 2 && event.key === 'Backspace') {
                event.preventDefault(); // Previene la acción de borrar
            } else if (textarea.value.length === 2 && event.key === ' ') { // Evita que el usuario pueda colocar espacios antes de colocar algún caracter
                event.preventDefault();
            } else {
                let textAreaLength = textarea.value.length;
                // Evita que el usuario pueda colocar mas de un espacio
                if (textarea.value.substring(textAreaLength - 1) === ' ' && event.key === ' ') {
                    event.preventDefault()
                }
            }

        },
        simulateBackspace() {
            if (this.input.length > 0) {
                this.input = this.input.slice(0, -1); // Elimina el último carácter del input
            }
        },
        commands(command, terminal) {
            switch (command) {
                case 'discord':
                    this.output.push(`<i class="bi bi-discord" style="color: #5865F2;"></i> <span style="color:#5865F2;">Discord: formateado</span>`);
                    break;
                case 'clear':
                    terminal.style.overflowY = 'unset';
                    this.output = [];
                    break;
                case 'cls':
                    terminal.style.overflowY = 'unset';
                    this.output = [];
                    break;
                case 'navegator':
                    this.$emit('NavegatorTerminal', true, false);
                    break;
                case 'exit':
                    this.$emit('ExitTerminal', false);
                    break;
                default:
                    this.errorCommand(command);
                    break;
            }
        },
        // Methods defined in the 
        errorCommand(command) {
            let words = command.split('');
            let initCommand = "";
            let flag = true;
            words.forEach(element => {
                if (element != ' ' && flag) {
                    initCommand += element;
                } else {
                    flag = false;
                }
            });
            this.output.push(`<span style="color:#E96A5E;">${initCommand}: The term '${initCommand}' is not recognized as the name of an executable function.<br>Check the spelling of the name and try again.</span>`);
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
    height: 70vh;
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

/* Estilos para el scrollbar en WebKit */
.terminal::-webkit-scrollbar {
    width: 0px;
}
</style>
