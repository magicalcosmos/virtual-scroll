<template>
  <div id="app">
    <VirtualList :size="40" :remain="8" :items="items" :variable="true">
      <Item slot-scope="{item}" :item="item"></Item> 
    </VirtualList>
  </div>
</template>

<script>
import VirtualList from './components/virtual-list';
import Item from './components/item';
let items = [];
for (let i = 0; i < 10000; i++) {
  items.push({
    id: i,
    value: i
  });
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
  box-sizing: border-box;
}
</style>
