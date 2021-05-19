<template>
  <div class="viewport">
    <!--custom scroll bar-->
    <div class="scroll-list" ref="refScrollList" @scroll.passive="handleScroll">
      <div :style="blankFileStyle">
        <div v-for="item in showDataList" :vid="item.id" :key="item.id" ref="items">
           <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      size: Number,
      items: Array
    },
    computed: {
      // 容器最后一个元素的索引
      endIndex() {
        let endIndex = this.startIndex + this.containSize * 2;
        if (!this.items[endIndex]) {
          endIndex = this.items.length - 1;
        }
        return endIndex;
      },
      // 定义一个待显示的列表元素
      showDataList() {
        let startIndex = 0;
        if (this.startIndex <= this.containSize) {
          startIndex = 0;
        } else {
          startIndex = this.startIndex - this.containSize;
        }
        return this.items.slice(startIndex, this.endIndex);
      },
      // 定义空白样式
      blankFileStyle() {
        let startIndex = 0;
        if (this.startIndex <= this.containSize) {
          startIndex = 0;
        } else {
          startIndex = this.startIndex - this.containSize;
        }
        return {
          paddingTop: startIndex * this.size + 'px',
          paddingBottom: (this.items.length - this.endIndex) * this.size + 'px'
        };
      }
    },
    data() {
      return {
        containSize: 0,
        startIndex: 0
      };
    },
    created() {
      
    },
    methods: {
      // 计算容器的最大容积
      getContainSize() {
        this.containSize = ~~(this.$refs.refScrollList.offsetHeight / this.size) + 2;
      },
      // listen scroll event
      handleScroll() {
       let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
       let fps = 30;
       let interval = 1000 / fps;
       let then = Date.now();
       requestAnimationFrame(() => {
          let now = Date.now(); 
          this.setDataStartIndex();
          if (now - then >= interval) {
            then = now;
            requestAnimationFrame(arguments.callee);
          }
       });
      },
      setDataStartIndex() {
        let currentIndex = ~~(this.$refs.refScrollList.scrollTop / this.size);
          // ‰∏çÁî®ÂÅö‰ªª‰ΩïÊìç‰Ωú
          if (this.startIndex === currentIndex) {
            return;
          }
          this.startIndex = currentIndex;
          // ÊáíÂä†ËΩΩ
          if (this.startIndex + this.containSize > this.items.length) {
            console.log('ÊªöÂä®Âà∞‰∫ÜÂ∫ïÈÉ®');
          }
      }
    },
    mounted() {
      this.getContainSize();
      window.onresize = this.getContainSize;
      window.orientationchange = this.getContainSize;
    }
  };
</script>
<style lang="scss">
 .viewport {
   height: 100%;
   width: 100%;
   .scroll-list {
     height: 100%;
     overflow: auto;
     width: 100%;
   }
 }
</style>
