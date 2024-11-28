<template>
    <div>
        <div class="card" style="width: 35rem;">
            <img src="@/assets/project_library_image.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Library Project</h5>
                <p class="card-text">I made an API to process books from a Library. In this project I test the
                    consumption of the API on the web to see how it behaves.</p>
                <div class="tools-used">
                    <div><img src="@/assets/logo_vue.png" alt=""></div>
                    <div><img src="@/assets/logo_springboot.png" alt="" style="width: 33px; height: 30px;"></div>
                    <div><img src="@/assets/logo_hibernate.png" alt=""></div>
                    <div><img src="@/assets/logo_mysql.png" alt="" style="border-radius: 5px;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardLibraryComponent'
}
</script>

<style>
.card-img-top {
    width: 100%;
    height: 13rem;
    object-fit: cover;
}

.card {
    border: #1d265d dashed 2px;
    background-color: transparent;
}

.card-body{
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