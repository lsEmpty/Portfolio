<template>
    <!-- Div que contiene toda el contenido -->
    <div class="all-content">
        <!-- Div que muestra el contenido del a section terminal -->
        <div class="terminal-content-show" @click="focusTerminal" ref="PrincipalSection">
            <!-- Div que muestra el contenido de la terminal sea el Button Terminal o la Terminal -->
            <div class="terminal">
                <img v-if="showImage" src="@/assets/terminal.png" alt="Show" class="terminal-image"
                    @click="ShowTerminal">
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-if="showTerminal" class="terminal">
                        <TerminalComponent :inProfileComponent="inProfileComponent" @closeTerminal="closeTerminal"
                            @showItemProfile="showItemProfile" ref="terminal">
                        </TerminalComponent>
                    </div>
                </transition>
            </div>
            <!-- Componente que mostrará un mensaje de guia -->
            <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <RedirectMessage v-if="showTerminal"></RedirectMessage>
            </transition>
        </div>
        <!-- Div que mostrará cada una de los profile items -->
        <div class="profile-items" ref="SecondarySection">
            <BiographyComponent v-if="showProfileComponents[0]"></BiographyComponent>
            <SpecialtiesComponent v-if="showProfileComponents[1]"></SpecialtiesComponent>
            <ProjectsComponent v-if="showProfileComponents[2]"></ProjectsComponent>
            <ContactComponent v-if="showProfileComponents[3]"></ContactComponent>
            <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <ButtonUpComponent v-if="inProfileComponent" @clickButtonUp="SectionsScroll"></ButtonUpComponent>
            </transition>
        </div>
    </div>
</template>

<script>
/* Terminal Components */
import TerminalComponent from "@/components/terminal.vue"
import RedirectMessage from "@/components/guie-message.vue";

/* Profile components */
import BiographyComponent from "@/components/components-profile/biography.vue";
import SpecialtiesComponent from "@/components/components-profile/specialties.vue";
import ProjectsComponent from "@/components/components-profile/projects.vue";
import ContactComponent from "@/components/components-profile/contact.vue";

/* Button Profile Components*/
import ButtonUpComponent from "@/components/components-profile/button-up.vue";

export default {
    name: 'PrincipalPageView',
    data() {
        return {
            showImage: false, //Dependiendo de esta variable se mostrará o no el botón para abrir la terminal
            showTerminal: false, //Dependiendo de esta variable se mostrará o no la terminal
            inProfileComponent: false, //Variable que estará en true si se está en un profile component, en caso de presionar el ButtonUp para subir a la terminal se colocará en false
            section: 'secondary', //Variable que cambiará si se presiona el ButtonUp para subir a la terminal, en caso de ser presionado cambiará a 'principal'
            showProfileComponents: [false, false, false, false] //Lista que cambiará cada profile según el indice que se seleccione en el nav terminal
        }
    },
    methods: {
        // Function que muestra el componente de ImageTerminal para el botón
        ShowImageTerminal: function () {
            this.showImage = true;
        },
        // Function que muestra el componente de la terminal
        ShowTerminal: function () {
            this.showImage = false;
            this.showTerminal = true;
        },
        // Function que recibe un $emit, se cierra la terminal y se cierran todos los ProfileComponents
        closeTerminal(value) {
            if (!value) {
                this.showTerminal = false;
                this.showProfileComponents = [false, false, false, false];
            }
        },
        // Function que hace focus a la terminal tomando la ref y haciendo el focus
        focusTerminal() {
            if (this.showTerminal) {
                this.$refs.terminal.focusNavTerminal();
            }
        },
        removeFocusTerminal() {
            this.$refs.terminal.removeFocusNavTerminal();
        },
        // Before, Enter and Leave are to the animations 
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
                if (!this.showTerminal) {
                    this.showImage = true;
                }
            }, 300); // El tiempo debe coincidir con la duración de la transición
        },
        // Function que muestra el Profile según lo que mandé el el componente de nav terminal
        showItemProfile(values) {
            // Recibe el componente la lista con el indice que se accionó y se pasa ese valor a showProfileComponent para mostrar el que se seleccionó
            this.showProfileComponents = values;
        },
        // Funcction que se ejecutá cuando se acciona el botón de ButtonUp y cuando hay alguna update en la funcion verifyShowProfile
        SectionsScroll(section) {
            // En caso de ser secondary significa que se accionó algún item de nav-terminal
            if (section == 'secondary') {
                // Scroll down
                this.ScrollToComponent("SecondarySection");
                this.inProfileComponent = true; // Como se encuentra en un ProfileComponent se asigna a true
            } else if (section == 'principal') { // Se acciona cuando se ejecuta el botón de ButtonUp
                // Scroll up
                this.section = section;
                this.ScrollToComponent("PrincipalSection");
                this.section = 'secondary';
                this.inProfileComponent = false; // Como se encuentra en la section de la terminal inProfileComponent pasa a ser falso
            }
        },
        ScrollToComponent(ref) {
            this.$refs[ref].scrollIntoView({
                behavior: "smooth", // Scroll suave
                block: "start", // Alinea al inicio del componente
            });
            // Toma el contenido de la variable antes de comenzar el timeout
            let section = this.section;
            setTimeout(() => {
                // En caso de que se haya presionado el botón de ButtonUp se hará focus a la navegator terminal
                if (section == 'principal') {
                    this.focusTerminal();
                }
            }, 500);
        },
        // Function que verificará si se va a redireccionar para un ProfileComponent
        verifyShowProfile() {
            let acumulador = 0;
            this.showProfileComponents.forEach(value => {
                if (value == false) {
                    acumulador++;
                }
            });
            // Esta condicional se coloca para evitar un error del updated ya que se ejecuta de forma indeceada, 
            // es para verificar que se haya seleccionado algún item de nav-terminal 
            if (acumulador != 4 && this.section == 'secondary') {
                // Cuando se encuentre en un Prifile Item se removerá el focus que tiene el nav-terminal para no poder modificar la terminal desde ahí
                this.removeFocusTerminal()
                this.SectionsScroll(this.section);
            }
        }
    },
    mounted() {
        this.ShowImageTerminal();
    },
    components: {
        TerminalComponent,
        RedirectMessage,
        BiographyComponent,
        SpecialtiesComponent,
        ProjectsComponent,
        ContactComponent,
        ButtonUpComponent
    },
    updated() {
        // Cada vez que se haga un updated se ejecutará todo lo que está acá dentro
        this.verifyShowProfile();
    }
}
</script>

<style scoped>
.terminal-content-show {
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
    /* Ajusta el tiempo aquí */
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in versions <2.1.8 */
    {
    opacity: 0;
}
</style>