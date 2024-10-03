<template>
    <div class="nav-terminal" id="nav-terminal">
        <pre class="banner">                                          

$$\   $$\                                         $$\   $$\               
$$ |  $$ |                                        \__|  $$ |              
$$ |  $$ | $$$$$$\  $$$$$$$\   $$$$$$\  $$\   $$\ $$\ $$$$$$\    $$$$$$\  
$$$$$$$$ |$$  __$$\ $$  __$$\ $$  __$$\ $$ |  $$ |$$ |\_$$  _|  $$  __$$\ 
$$  __$$ |$$ /  $$ |$$ |  $$ |$$ /  $$ |$$ |  $$ |$$ |  $$ |    $$ /  $$ |
$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$\ $$ |  $$ |
$$ |  $$ |\$$$$$$  |$$ |  $$ |\$$$$$$$ |\$$$$$$  |$$ |  \$$$$  |\$$$$$$  |
\__|  \__| \______/ \__|  \__| \____$$ | \______/ \__|   \____/  \______/ 
                              $$\   $$ |                                  
                              \$$$$$$  |                                  
                               \______/
        </pre>
        <div @keydown="handleKey" tabindex="0" ref="selectors" class="selectors" id="selectors">
            <p id="selector-1" style="color: #00BCF4;">> Biography</p>
            <p id="selector-2">Specialties</p>
            <p id="selector-3">Projects</p>
            <p id="selector-4">Terminal</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavTerminalComponent',
    methods: {
        handleKey(event) {
            if (event.key === 'ArrowUp' || event.key === ' ')  {
                this.deleteLastSelection()
                if (this.selected[0]) {
                    this.limitSelected(0, 3)
                } else {
                    this.setSelected(0);
                }
            } else if (event.key === 'ArrowDown') {
                this.deleteLastSelection()
                if (this.selected[3]) {
                    this.limitSelected(3, 0)
                } else {
                    this.setSelected(1);
                }
            }else if (event.key === 'Enter'){
                let selectedEmit = []
                this.selected.forEach((element, index)=> {
                    if (index != this.selected.length - 1) {
                        selectedEmit.push(element)
                    }
                });
                if (this.lastSelected < 3) {
                    this.$emit('showItemProfile', selectedEmit);
                }else{
                    this.$emit('CommandTerminal', false, true)
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
        },
        focusNavTerminal(){
            this.$refs.selectors.focus();
        },
        removeFocusNavTerminal(){
            this.$refs.selectors.blur();
        }
    },
    data() {
        return {
            selected: [true, false, false, false],
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
    font-size: 17px;
}

.banner {
    font-size: 8.5px;
    font-weight: bold;
    margin-left: 20px;
    color: #3871BA;
    font-family: 'Courier New', Courier, monospace;
}

.selectors {
    margin-left: 5px;
}

.selectors:focus {
    outline: none;
}

.selectors p {
    color: #5E77B5;
    margin: 0px 0px 8px 15px;
}
</style>