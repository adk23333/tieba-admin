<script setup lang="ts">
import TransRoundCard from "@/components/TransRoundCard.vue";
import {onMounted, ref} from "vue";
import {closeToast, showConfirmDialog, showLoadingToast, showNotify} from 'vant';
import {getKeywords, handlerInfo, handlerSwitch, reviewerInfo, reviewerSwitch, updateKeywords} from "@/utils/api";

onMounted(() => {
    reviewerInfo(res => reviewerStatus.value = res.data.data.status);
    handlerInfo(res => handlerStatus.value = res.data.data.status);
    getKeywords(res => keywords.value = res.data.data.keywords);
})

const reviewerStatus = ref(false);
const revLoading = ref(false);
const switchReviewerStatus = (newValue: boolean) => {
    const str = newValue ? "打开" : "关闭";
    showConfirmDialog({
        title: '警告',
        message: `是否${str}审查器？`,
    }).then(() => {
        reviewerStatus.value = newValue;
        revLoading.value = true;
        reviewerSwitch(res => {
                if(newValue===res.data.data.status){
                    showNotify({type: 'success', message: res.data.msg});
                }else {
                    showNotify({type: 'warning', message:'服务端发生了一些意外，切换失败'});
                }
                reviewerStatus.value = res.data.data.status;
                revLoading.value = false;
            },
            () => showNotify({type: 'danger', message: "请检查您的网络是否正常"}),
        );
    }).catch(() => {
        reviewerStatus.value = !newValue;
    });
};

const keywords = ref("");
const editEnable = ref(false);
const enableBtnText = ref("修改");
const switchBtn = () => {
    if (editEnable.value) {
        showLoadingToast({
            duration: 0,
            message: "更新关键词中...",
            forbidClick: true,
        })
        updateKeywords(keywords.value,
            res => {
                showNotify({type: 'success', message: res.data.msg});
                editEnable.value = !editEnable.value;
                enableBtnText.value = editEnable.value ? '保存' : '修改';
            },
            err => {
                showNotify({type: 'danger', message: err.toString()});
            },
            () => closeToast());
    } else {
        editEnable.value = !editEnable.value;
        enableBtnText.value = editEnable.value ? '保存' : '修改';
    }

}

const handlerStatus = ref(false);
const hdlLoading = ref(false);
const switchHandlerStatus = (newValue: boolean) => {
    const str = newValue ? "打开" : "关闭";
    showConfirmDialog({
        title: '警告',
        message: `是否${str}权限管理？`,
    }).then(() => {
        handlerStatus.value = newValue;
        hdlLoading.value = true;

        handlerSwitch(res => {
                if(newValue===res.data.data.status){
                    showNotify({type: 'success', message: res.data.msg});
                }else {
                    showNotify({type: 'warning', message:'服务端发生了一些意外，切换失败'});
                }
                handlerStatus.value = res.data.data.status;
                hdlLoading.value = false;
            },
            () => showNotify({type: 'danger', message: "请检查您的网络是否正常"}),
        );

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
                                    @update:model-value="switchReviewerStatus"
                                    :loading="revLoading"/>
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
                        <van-button round size="small" @click="switchBtn" :text="enableBtnText"></van-button>
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
                                    @update:model-value="switchHandlerStatus"
                                    :loading="hdlLoading"/>
                    </template>
                </van-cell>
            </template>
        </TransRoundCard>
    </div>
</template>

<style>

</style>
