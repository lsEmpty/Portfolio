<template>
    <div class="bar-content" id="bar-content">
        <div class="close" @click="closeTerminal"></div>
        <div class="button_modal" @click="openModal"></div>
        <div class="info"></div>
        
    </div>
</template>

<script>
export default {
    name: 'BarComponent',
    data(){
        return {
            showTerminal : true
        }
    },
    methods: {
        closeTerminal(){
            this.showTerminal = false;
            this.$emit('closeTerminal', this.showTerminal);
        },
        openModal(){
            this.$emit('openModal', true);
        }
    }
}
</script>

<style scoped>
.bar-content {
    padding: 15px 15px 10px 15px;
    background-color: #0F172A;
    border-radius: 10px 10px 0px 0px;
}
.info{
    margin-left: 8px;
    background-color: #61C554 !important;
}

.button_modal{
    margin-left: 8px;
    background-color: #F2BF4E !important;
}

.close, .info , .button_modal{
    display: inline-block;
    background-color: #E96A5E;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    transition: transform 0.2s ease;
}

.close:hover, .info:hover, .button_modal:hover{
    transform: scale(1.05);
}

.close:active, .info:active, .button_modall:active{
    transform: scale(0.95);
}
</style>