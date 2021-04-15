<template>
  <div style="border-top: 1px solid red; padding: 20px">{{item.value}}</div>
</template>
<script>
  export default {
    props: {
      item: Object
    }    
  };
</script>
