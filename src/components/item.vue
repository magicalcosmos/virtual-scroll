<template>
  <div style="border-top: 1px solid red; height: 39px; line-height:39px">{{item.value}}</div>
</template>
<script>
  export default {
    props: {
      item: Object
    }    
  };
</script>
