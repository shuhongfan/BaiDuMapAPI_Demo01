<template>
  <div class="divBasePagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-size="limit"
      :total="total"
      :small="small">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  props: {
    total: {
      required: false,
      default: 0
    },
    limit: {
      required: false,
      default: 10
    },
    small: {
      required: false,
      type: Boolean,
      default: false
    },
    currentPage: {
      required: false,
      default: 1
    }
  },
  methods: {
    // 当前页变化
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    },
    // size变化
    handleSizeChange(val) {
      this.$emit('size-change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index';
</style>
<style lang="scss">
.divBasePagination{
  .el-input{
    .el-input__inner{
      background: #f8f5f5;
      border: 1px solid #f8f5f5;
      &:hover{
          border: 1px solid #887e7e;
      }
    }
  }
}
.divBasePagination .el-input .el-input__inner:focus{

border: 1px solid #FFB200;
}

</style>
