<template>
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
        <el-form-item
            label="Activity name"
            prop="name"
        >
            <el-input v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item>
            <el-button
                type="primary"
                @click="submitForm(ruleFormRef)"
            >
                Create
            </el-button>
            <el-button @click="closeForm(ruleFormRef)">Close</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElButton, ElInput } from 'element-plus';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';

interface RuleForm {
    name: string;
}

const formSize = ref<ComponentSize>('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
    name: '',
});

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
            console.log('submit!');
        } else {
            console.log('error submit!', fields);
        }
    });
};

const props = defineProps({
    close: Function,
});
const closeForm = (formEl: FormInstance | undefined) => {
    props.close && props.close();
};
</script>
