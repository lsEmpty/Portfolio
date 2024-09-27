<template>
    <div class=modal-content>
        <input type="text" ref="searcher" class="searcher" id="searcher" placeholder="Search" autocomplete="off"
            autocorrect="off" spellcheck="false" @input="onSearch">
        <div class="content" id="content">

        </div>
        <footer class="modal-content-footer">
            <i class="bi bi-arrow-up-short"></i>
            <i class="bi bi-arrow-down-short"></i>
            <p>to scroll in the navigation terminal</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'ModalContentComponent',
    methods: {
        onSearch() {
            const text_search = this.$refs.searcher.value; // Toma el valor del searcher
            this.searchText = []; // Elimina todos los items buscados anteriormente
            let CommandItems = this.pushSearchText(this.CommandItems, text_search); // Retorna la cantidad de items que coinciden de CommandItems
            let ExtraItems = this.pushSearchTextEspecificImages(this.ExtraItems, text_search); // Retorna una lista con la posicion de cada ExtraItem que coincidió en la funcion

            // Toma el div en donde se va a colocar todo lo buscado
            const contenido = document.getElementById('content');
            // Remueve todos los elementos anteriormente colocados
            this.removeAppendChild(this.lastAppendChild, contenido);
            this.lastAppendChild = []; // Limpia el ultimo AppendChild ya que se rellenará nuevamente
            let contador = 0; // Contador para los CommandsItems
            let contadorExtraImages = -1; // Contador para los ExtraImages
            // ForEach para recorrer los items que se van a colocar
            this.searchText.forEach(element => {
                // Condicion para colocar el titulo de los CommandItems
                if (contador == 0) {
                    let tituloTerminal = document.createElement("p");
                    tituloTerminal.className = "titulo";
                    tituloTerminal.textContent = "Terminal";
                    contenido.appendChild(tituloTerminal);
                    this.lastAppendChild.push(tituloTerminal);
                }
                // Crea un div para cada item que se va a colocar
                const div_contenido = document.createElement('div');
                // Cada que se itera el searchText se ejecutará esto en el primer item para darle un pointToDiv
                if (contador == 0) {
                    this.lastPointToDiv = div_contenido;
                    div_contenido.style.borderLeft = "2px solid #00BCF4";
                }
                // EventListener para colocar el pointToDiv cuando se pase el mouse por el item
                div_contenido.addEventListener('mouseover', this.pointToDiv);
                let icon = "";
                contador++;
                // La funcion principal de esta condicion es colocar el icono que se a a colocar al item
                if (contador <= CommandItems) {
                    icon = `<i class="bi bi-terminal"></i>`;
                } else {
                    // Condicional que colocará el titulo de los ExtraItems
                    if (contadorExtraImages == -1) {
                        let tituloExtra = document.createElement("p");
                        tituloExtra.className = "titulo";
                        tituloExtra.textContent = "Extra";
                        contenido.appendChild(tituloExtra);
                        this.lastAppendChild.push(tituloExtra);
                    }
                    contadorExtraImages++;
                    icon = this.ImagesExtraItems[ExtraItems[contadorExtraImages]];
                    // A cada item extra le asigna su indice a la id para despues ser tratada en handleClickExtraItems
                    div_contenido.id = ExtraItems[contadorExtraImages];
                    div_contenido.className = "custom-links";
                    // EventListener para la redireccion al hacer click en el extra item
                    div_contenido.addEventListener('click', this.handleClickExtraItems);
                }
                // InnerHTML para colocar el elemento y el icono respectivo
                div_contenido.innerHTML = `
                    ${icon}
                    <p class="item">${element}</p>
                `;
                // Agrega el appendChild de cada item y los añade al ultimo AppendChild
                this.lastAppendChild.push(div_contenido);
                contenido.appendChild(div_contenido);
            });
            // En caso de que no hayan coincidencias se ejecutará esta condicion
            if (this.searchText.length == 0) {
                const div_contenido = document.createElement('div');
                div_contenido.innerHTML = `
                    <p>No matches found</p>
                `
                this.lastAppendChild.push(div_contenido);
                contenido.appendChild(div_contenido);
            }
        },
        removeAppendChild(elements, contenido) { // Remueve los ultimos appendChild
            // Tomando los elementos que va a eliminar y de donde los va a remover
            elements.forEach(element => {
                contenido.removeChild(element);
            });
        },
        pushSearchText(list, text_search) { // Rellena el searchText con las coincidencias que encontró
            // Recibe la lista que tienen los elementos que serán comparados para filtrar
            // Recibe el texto que se verá si coincide con cada uno de los items
            let contador = 0;
            list.forEach(item => {
                if (item.toLowerCase().includes(text_search.toLowerCase())) {
                    this.searchText.push(item);
                    contador++;
                }
            });
            // Retorna la cantidad de items que coincidieron con el texto
            return contador;
        },
        pushSearchTextEspecificImages(list, text_search) { // Realiza la misma funcion del pushSearchText cambiando el retorno
            let indices = [];
            let contador = -1;
            list.forEach(item => {
                contador++;
                if (item.toLowerCase().includes(text_search.toLowerCase())) {
                    this.searchText.push(item);
                    indices.push(contador);
                }
            });
            // Retorna los indices de los extra items
            return indices;
        },
        pointToDiv(event) { // Cuando pase el mouse por el item se colocarán estos estilos
            this.lastPointToDiv.style.borderLeft = "solid 2px transparent";
            event.currentTarget.style.borderLeft = "2px solid #00BCF4";
            this.lastPointToDiv = event.currentTarget;
        },
        handleClickExtraItems(event) { // Cuando se clickee algún extra item me enviará a la url utilizando la id que tiene el indice de las url's
            window.open(this.LinksExtraItems[event.currentTarget.id]);
        }
    },
    mounted() {
        this.$refs.searcher.focus();
        this.onSearch();
    },
    data() {
        return {
            lastPointToDiv: "",
            lastAppendChild: [],
            searchText: [],
            CommandItems: ["Navegator : Sends you to the navegation terminal", "Discord : Show the user of discord", "Exit : Close the terminal", "Clear : Clear the terminal"],
            ImagesExtraItems: [`<i class="bi bi-youtube custom-links"></i>`, `<i class="bi bi-instagram custom-links"></i>`, `<i class="bi bi-github custom-links"></i>`],
            LinksExtraItems: [`https://www.youtube.com/@Formateado`, `https://www.instagram.com/jeloudab/`, `https://github.com/iHonguito`],
            ExtraItems: ["YouTube", "Instagram", "GitHub"]
        }
    }
}
</script>

<style>
.modal-content {
    margin: 0;
    padding: 0;
    font-family: "Playpen Sans", cursive;
    background-color: #326C78;
    color: #00BCF4;
    border-radius: 5px;
}

.searcher::placeholder {
    color: #00BCF480;
}

.searcher {
    width: 100%;
    padding: 12px;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: #326C78;
    color: #00BCF4;
}

.bi-arrow-up-short,
.bi-arrow-down-short,
.bi-arrow-return-left {
    font-size: 0;
}

.bi-arrow-up-short::before,
.bi-arrow-down-short::before {
    background-color: #00BCF480;
    font-size: 25px;
    border-radius: 3px;
    margin: 0px 3px;
}

.modal-content-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
}

.modal-content-footer p {
    margin: 0;
    margin-left: 5px;
    margin-bottom: 5px;
}

.content {
    border-top: solid 2px #306874;
    border-bottom: solid 2px #306874;
    max-height: 250px;
    overflow-y: auto;
}

.content div {
    padding: 6px 0px 6px 10px;
    font-size: 15px;
    border-left: solid 2px transparent;
}

.titulo {
    margin: 0;
    font-size: 12.5px;
    padding: 4px 0px 4px 12px;
    color: #02a9db;
}

.custom-links:hover {
    cursor: pointer;
}

.content div p {
    display: inline;
}


/* Estilos para el scrollbar en WebKit (Chrome, Safari) */
.content::-webkit-scrollbar {
    width: 12px;
}

.content::-webkit-scrollbar-track {
    background: #326C78;
}

.content::-webkit-scrollbar-thumb {
    background: #00BCF4;
}

.content::-webkit-scrollbar-thumb:hover {
    background: #02a9db;
}
</style>