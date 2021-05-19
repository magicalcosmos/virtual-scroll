<template>
  <div id="app">
    <VirtualList :size="40" :remain="8" :items="items">
      <Item slot-scope="{item}" :item="item"></Item> 
    </VirtualList>
  </div>
</template>

<script>
import VirtualList from './components/virtual-list';
import Item from './components/item';
const n = 100000;
const items = new Array(n);
for (let i = 0; i < n; i++) {
  items[i] = {
    id: i,
    value: i
  };
}
export default {
  name: 'App',
  components: {
    VirtualList,
    Item
  },
  data() {
    return {
      items
    };
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
