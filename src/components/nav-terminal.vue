<template>
    <div class="nav-terminal" id="nav-terminal">
        <pre class="banner">
    ____                                _  
  (|      \                   o        | | 
   |       |  __,   _  _        _   | | 
 _|       |/    |  / |/ |  |   |/   |/  
 (/\___/ \_/|_/  |  |_/|_/|__/|__/
        </pre>
        <div @keydown="handleKey" tabindex="0" ref="selectors" class="selectors" id="selectors">
            <p id="selector-1" style="color: #00BCF4;">> Biografia</p>
            <p id="selector-2">Especialidades</p>
            <p id="selector-3">Proyectos</p>
            <p id="selector-4">Contacto</p>
            <p id="selector-5">Terminal</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavTerminalComponent',
    methods: {
        handleKey(event) {
            if (event.key === 'ArrowUp') {
                this.deleteLastSelection()
                if (this.selected[0]) {
                    this.limitSelected(0, 4)
                } else {
                    this.setSelected(0);
                }
            } else if (event.key === 'ArrowDown') {
                this.deleteLastSelection()
                if (this.selected[4]) {
                    this.limitSelected(4, 0)
                } else {
                    this.setSelected(1);
                }
            }
        },
        deleteLastSelection() {
            const selector = document.getElementById(`selector-${this.lastSelected + 1}`);
            selector.textContent = selector.textContent.substring(2);
            selector.style.color = "#5E77B5"
        },
        setSelected(sign) {
            let signSelected = sign == 0 ? this.lastSelected - 1 : this.lastSelected + 1;
            let acumulador = -1;
            this.selected[this.lastSelected] = false;
            this.selected[signSelected] = true;
            this.selected.forEach(element => {
                acumulador++;
                if (element == true) {
                    const selector = document.getElementById(`selector-${acumulador + 1}`);
                    selector.style.color = "#00BCF4"
                    selector.textContent = `> ${selector.textContent}`
                    this.lastSelected = acumulador;
                }
            });
        },
        limitSelected(last, next) {
            const selector = document.getElementById(`selector-${next + 1}`);
            selector.style.color = "#00BCF4"
            selector.textContent = `> ${selector.textContent}`
            this.selected[last] = false;
            this.selected[next] = true;
            this.lastSelected = next;
        }
    },
    data() {
        return {
            selected: [true, false, false, false, false],
            lastSelected: 0
        }
    },
    mounted() {
        this.$refs.selectors.focus();
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: "Playpen Sans", cursive;
    font-size: 18px;
}

.banner {
    font-size: 20px;
    font-weight: bold;
    margin-left: 15px;
    color: #352484;
}

.selectors {
    margin-left: 5px;
}

.selectors:focus {
    outline: none;
}

.selectors p {
    color: #5E77B5;
    margin: 10px
}
</style>