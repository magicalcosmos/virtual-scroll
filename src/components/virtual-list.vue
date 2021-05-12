<template>
  <div class="viewport" ref="viewport" @scroll="scrollFn">
    <!--custom scroll bar-->
    <div class="scroll-bar" ref="scrollBar"></div>
    <div class="scroll-list" :style="{transform: `translate3d(0, ${offset}px, 0)`}">
      <div v-for="item in visibleData" :vid="item.id" :key="item.id" ref="items">
         <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import throttle from 'lodash/throttle';
  export default {
    props: {
      size: Number,
      remain: Number,
      items: Array,
      variable: Boolean
    },
    computed: {
      // 渲染三屏使用
      prevCount() {
        return Math.min(this.start, this.remain);
      },
      // 渲染三屏使用
      nextCount() {
        return Math.min(this.remain, this.items.length - this.end);
      },
      visibleData() {
        let start = this.start - this.prevCount;
        let end = this.end + this.nextCount;
        return this.items.slice(start, end);
      }
    },
    data() {
      return {
        start: 0,
        end: this.remain,
        offset: 0,
        position: []
      };
    },
    created() {
      this.scrollFn = throttle(this.handleScroll, 100, { leading: false });
    },
    methods: {
      getStartIndex(value) {
        let start = 0;
        let end = this.position.length - 1;
        let temp = null;
        while (start < end) {
          let middleIndex = parseInt((start + end) / 2);
          let middleValue = this.position[middleIndex].bottom;
          if (middleValue == value) {
            return middleIndex + 1;
          } else if (middleValue < value) {
            start = middleIndex + 1;
          } else if (middleValue > value) {
            if (temp == null || temp > middleIndex) {
              temp = middleIndex;
            }
            end = middleIndex - 1;
          }
        }
        return temp;
      },
      handleScroll() {
        let scrollTop = this.$refs.viewport.scrollTop;
        if (this.variable) {
          this.start = this.getStartIndex(scrollTop);
          this.end = this.start + this.remain;
          const line = this.position[this.start - this.prevCount];
          this.offset = line ? line.top : 0;
        } else {
          // plain render
          this.start = Math.floor(scrollTop / this.size);  
          this.end = this.start + this.remain;
          this.offset = this.start * this.size - this.prevCount * this.size;
        }
      },
      cacheList() {
        this.position = this.items.map((item, index) => ({
          height: this.size,
          top: index * this.size,
          bottom: (index + 1) * this.size
        }));
      }
    },
    updated() {
      this.$nextTick(() => {
        let nodes = this.$refs.items;
        if (nodes && nodes.length) {
          nodes.forEach(node => {
            let { height } = node.getBoundingClientRect();
            let id = node.getAttribute("vid") - 0; // -0 表示拿到一个数
            let oldHeight = this.position[id].height;
            let val = oldHeight - height; // 当前高度是否有变化
            if (val) {
              this.position[id].height = height;
              this.position[id].bottom -= this.position['id'].bottom - val; //底部变了，后面都要修改
              for (let i = id + 1; i < this.position.length; ++i) {
                this.position[i].top = this.position[i - 1].bottom;
                this.position[i].bottom = this.position[i].bottom - val;
              }
            }
          });
          this.$refs.scrollBar.style.height = this.position[this.position.length - 1].bottom + 'px';
        }
      });
    },
    mounted() {
      this.$refs.viewport.style.height = this.size * this.remain + 'px';
      this.$refs.scrollBar.style.height = this.items.length * this.size + 'px';
      // after a  while, get real dom heigt and update
      this.cacheList();
    }
  };
</script>
<style lang="scss">
 .viewport {
   overflow-y: scroll;
   position: relative;
 }
 .scroll-list {
   position:absolute;
   top: 0;
   width: 100%;
 }
</style>
