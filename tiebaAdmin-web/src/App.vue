<script lang="ts">
import TransRoundCard from "@/components/TransRoundCard.vue";
import {ref} from "vue";
import {showConfirmDialog} from 'vant';

export default {
    components: {TransRoundCard},
    setup() {
        const checked = ref(true);
        const onUpdateValue = (newValue) => {
            const str = newValue?"打开":"关闭";
            showConfirmDialog({
                title: '警告',
                message: `是否${str}审查器？`,
            }).then(() => {
                checked.value = newValue;
            });
        };
        return {checked, onUpdateValue};
    },
};
</script>

<template>
    <div class="entry-cards">
        <TransRoundCard>
            <template #context>
                <h2>审查器</h2>
                <van-cell center title="状态">
                    <template #right-icon>
                        <van-switch v-model="checked" @update:model-value="onUpdateValue"/>
                    </template>
                </van-cell>
            </template>
        </TransRoundCard>
    </div>
</template>

<style>

</style>
