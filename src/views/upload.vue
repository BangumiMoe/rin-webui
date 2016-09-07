<template>
<div id="rin-main" class="rin-row" style="width: calc(100% - 128px);flex-direction: column;overflow-y: auto;">
	<rin-head title="Publish" :isback="true"></rin-head>
	<rin-upload-box></rin-upload-box>
</div>	
</template>
<script>
import RinUploadBox from '../components/rin-upload-box';
import RinHead from '../components/rin-head';

export default {
  components: {
    RinUploadBox,
    RinHead,
  },
};
</script>