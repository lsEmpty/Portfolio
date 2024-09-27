<template>
    <div class="modal show" @click.self="$emit('close-modal')">
        <div class="modal-dialog">
            <div class="modal-content">
                <ModalContentComponent></ModalContentComponent>
            </div>
        </div>
    </div>
</template>

<script>
import ModalContentComponent from '@/components/modal-content.vue';
export default {
    name: 'ModalComponent',
    components : {
        ModalContentComponent
    }
};
</script>

<style scoped>
.modal {
    display: block;
    /* Asegúrate de que el modal se muestre */
    background-color: #06171E80;
    /* Fondo semitransparente */
    padding-top: 80px;
}
</style>