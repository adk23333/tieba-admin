<script setup lang="ts">
import TransRoundCard from "@/components/TransRoundCard.vue";
import {onMounted, ref} from "vue";
import {showConfirmDialog} from 'vant';
import {getKeywords, handlerInfo, reviewerInfo} from "@/utils/api";

onMounted(() => {
    reviewerInfo(res => reviewerStatus.value = res.data.data.status);
    handlerInfo(res => handlerStatus.value = res.data.data.status);
    getKeywords(res => keywords.value = res.data.data.keywords);
})

const reviewerStatus = ref(false);
const switchReviewerStatus = (newValue) => {
    const str = newValue ? "打开" : "关闭";
    showConfirmDialog({
        title: '警告',
        message: `是否${str}审查器？`,
    }).then(() => {
        reviewerStatus.value = newValue;
    }).catch(() => {
        reviewerStatus.value = !newValue;
    });
};

const keywords = ref("");
const editEnable = ref(false);

const handlerStatus = ref(false)
const switchHandlerStatus = (newValue) => {
    const str = newValue ? "打开" : "关闭";
    showConfirmDialog({
        title: '警告',
        message: `是否${str}权限管理？`,
    }).then(() => {
        handlerStatus.value = newValue;
    }).catch(() => {
        handlerStatus.value = !newValue;
    });
};
</script>

<template>
    <div class="entry-cards">
        <TransRoundCard>
            <template #context>
                <h2>审查器</h2>
                <van-cell center title="状态">
                    <template #right-icon>
                        <van-switch active-color="#00ff00"
                                    v-model="reviewerStatus"
                                    @update:model-value="switchReviewerStatus"/>
                    </template>
                </van-cell>
                <van-cell-group inset>
                    <van-field
                            :disabled="!editEnable"
                            v-model="keywords"
                            label-align="top"
                            rows="1"
                            autosize
                            label="关键词"
                            type="textarea"
                            placeholder="keyword1,keyword2,..."
                    />
                </van-cell-group>
                <van-cell center title="">
                    <template #right-icon>
                        <van-button round size="small">修改</van-button>
                    </template>
                </van-cell>
            </template>
        </TransRoundCard>
        <TransRoundCard>
            <template #context>
                <h2>权限管理</h2>
                <van-cell center title="状态">
                    <template #right-icon>
                        <van-switch active-color="#00ff00"
                                    v-model="handlerStatus"
                                    @update:model-value="switchHandlerStatus"/>
                    </template>
                </van-cell>
            </template>
        </TransRoundCard>
    </div>
</template>

<style>

</style>
