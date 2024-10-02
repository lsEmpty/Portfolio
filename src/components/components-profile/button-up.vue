<template>
    <div class="ButtonUpTerminal" @click="clickButtonUp">
        <img src="@/assets/terminal.png" alt="" class="ImgButtonUpTerminal">
    </div>
</template>

<script>
export default{
    name : 'ButtonUpComponent',
    methods: {
        clickButtonUp(){
            this.$emit('clickButtonUp', 'principal')
        }
    }
}
</script>

<style scoped>
.ButtonUpTerminal{
    position : fixed;
    bottom : 0;
    right: 0;
    border-radius: 50%;
    border:13px solid #1D265D;
    background-color: #1D265D;
    margin: 0px 30px 30px 0px;
    transition: transform 0.2s ease;
}

.ImgButtonUpTerminal{
    width: 55px;
    height: 55px;
}

.ButtonUpTerminal:hover{
    transform: scale(1.03);
}

.ButtonUpTerminal:active{
    transform: scale(0.98);
}
</style>