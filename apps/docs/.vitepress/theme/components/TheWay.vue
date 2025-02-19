<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph/vue3';

const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineColor: 'rgba(255, 255, 255, 0.6)',
    defaultNodeColor: 'transparent',
    defaultNodeBorderWidth: 0,
    defaultNodeBorderColor: 'transparent',
    defaultNodeFontColor: '#ffffff',
    defaultNodeShape: 1,
    toolBarDirection: 'h',
    toolBarPositionH: 'right',
    toolBarPositionV: 'bottom',
    defaultLineShape: 6,
    defaultJunctionPoint: 'lr',
    backgroundColor: 'rgb(101, 163, 13)',
    layout: {
        layoutName: 'tree',
        from: 'left',
        min_per_width: 310,
        min_per_height: 70,
    },
};

const graphRef = ref<RelationGraphComponent>();

const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'a' },
            { id: 'b', text: 'b' },
            { id: 'b1', text: 'b1' },
            { id: 'b1-1', text: 'b1-1' },
            { id: 'b1-2', text: 'b1-2' },
            { id: 'b1-3', text: 'b1-3' },
            { id: 'b1-4', text: 'b1-4' },
            { id: 'b1-5', text: 'b1-5' },
            { id: 'b1-6', text: 'b1-6' },
            { id: 'b2', text: 'b2' },
            { id: 'b2-1', text: 'b2-1' },
            { id: 'b2-2', text: 'b2-2' },
            { id: 'c', text: 'c' },
            { id: 'c1', text: 'c1' },
            { id: 'c2', text: 'c2' },
            { id: 'c3', text: 'c3' },
        ],
        lines: [
            { from: 'a', to: 'b', text: '' },
            { from: 'b', to: 'b1', text: '' },
            { from: 'b1', to: 'b1-1', text: '' },
            { from: 'b1', to: 'b1-2', text: '' },
            { from: 'b1', to: 'b1-3', text: '' },
            { from: 'b1', to: 'b1-4', text: '' },
            { from: 'b1', to: 'b1-5', text: '' },
            { from: 'b1', to: 'b1-6', text: '' },
            { from: 'b', to: 'b2', text: '' },
            { from: 'b2', to: 'b2-1', text: '' },
            { from: 'b2', to: 'b2-2', text: '' },
            { from: 'a', to: 'c', text: '' },
            { from: 'c', to: 'c1', text: '' },
            { from: 'c', to: 'c2', text: '' },
            { from: 'c', to: 'c3', text: '' },
        ],
    };

    const graphInstance = graphRef.value!.getInstance();
    console.log('graphInstance:', graphInstance);
    if (graphInstance) {
        await graphInstance.setJsonData(__graph_json_data);
        await graphInstance.moveToCenter();
        await graphInstance.zoomToFit();
    }
};
onMounted(() => {
    showGraph();
});
</script>

<template>
    <div>
        <div
            ref="myPage"
            class="my-graph"
            style="height: calc(100vh)"
        >
            <RelationGraph
                ref="graphRef"
                :options="graphOptions"
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
:deep(.relation-graph) {
    .rel-map {
        background: linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13));
        .rel-node-shape-1 {
        }
    }
    .rel-toolbar {
        color: #ffffff;
        .c-current-zoom {
            color: #ffffff;
        }
    }
}
</style>
