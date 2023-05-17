<template>
    <div class="card">
        <slot name="context"></slot>
    </div>
</template>

<style scoped>
.card {
    position: relative;
    width: 280px;

    margin: 30px;
    /* 设置阴影 */
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    /* 设置card的背景色 */
    background: rgba(255, 255, 255, 0.2);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
}
</style>
