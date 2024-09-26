<template>
    <div class="modal show" tabindex="-1" @click.self="$emit('close-modal')">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <p>content</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalComponent'
};
</script>

<style scoped>
.modal {
    display: block;
    /* Asegúrate de que el modal se muestre */
    background-color: rgba(0, 0, 0, 0.5);
    /* Fondo semitransparente */
}
</style>