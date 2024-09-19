<template>
    <div class="bar-content" id="bar-content">
        <div class="close" @click="closeTerminal"></div>
        <div class="redirect"></div>
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

.redirect{
    margin-left: 8px;
    background-color: #F2BF4E !important;
}

.close, .info , .redirect{
    display: inline-block;
    background-color: #E96A5E;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    transition: transform 0.2s ease;
}

.close:hover, .info:hover, .redirect:hover{
    transform: scale(1.05);
}

.close:active, .info:active, .redirect:active{
    transform: scale(0.95);
}
</style>