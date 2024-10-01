<template>
    <div class="redirect-message">
        <p>Press <span class="badge bg-light text-dark">Ctrl</span> + <span class="badge bg-light text-dark">M</span> to
            open the guie</p>
    </div>
</template>

<script>
export default {
    name: 'RedirectMessage'
}
</script>

<style>
.redirect-message {
    background-color: #0F172A;
    color: white;
    padding: 6px 0px;
    text-align: center;
    font-family: "Playpen Sans", cursive;
    font-size: 12.5px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
}

.redirect-message p {
    margin: 0;
}
</style>