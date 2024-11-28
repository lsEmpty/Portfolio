<template>
    <div>
        <div class="card" style="width: 35rem;">
            <img src="@/assets/questions.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Questions</h5>
                <p class="card-text">This project is a Minecraft Plugin. 
                    This plugin adds a chat game to Minecraft for user interactivity with rewards and a top.</p>
                <div class="tools-used">
                    <div><img src="@/assets/logo_java.png" alt=""></div>
                    <div><img src="@/assets/spigot.png" alt=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardPetComponent'
}
</script>

<style >
.card-img-top {
    width: 100%;
    height: 13rem;
    object-fit: cover;
}

.card{
    border: #1d265d dashed 2px;
    background-color: transparent;
}

.card-body {
    background-color: #2E3A57;

}

.card-title {
    color: white;
}

.card-text {
    color: #dad9d9;
}

.tools-used {
    display: flex;
    justify-content: start;
    align-items: center;
}

.tools-used div img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
</style>