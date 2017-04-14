<style scoped lang="less">
  @import "../less/colors.less";
  .rin-button-mixin(@size, @border: 4px, @margin: 0, @padding: 0) {
    @diameter: (@size + 2 * @border);
    @p_m_tb: (@diameter - 20px) / 2;
    @p_m_lr0: (@diameter - 40px) / 2;
    @p_m_lr1: @p_m_lr0;
    .rin-tooltip-wrap {
      margin-top: -1 * @diameter;
      .rin-tooltip {
        height: @size;
        border-radius: @diameter / 2;
        margin: @margin;
        padding: @padding;
        p {
          padding: 0;
          margin: 0;
          line-height: (@size - 2 * @border);
          font-size: @size / 2;
        }
      }
      &.rin-tooltip-right {
        right: -1 * @p_m_lr1 / 2;
        .rin-tooltip {
          padding-right: @diameter;
          p {
            margin-left: @p_m_lr1;
            padding-left: @p_m_lr1;
          }
        }
      }
      &.rin-tooltip-left {
        left: -1 * @p_m_lr1;
        maring-right: -1rem;
        p {
          margin-right: @p_m_lr1;
        }
      }
    }
  }
  
  .rin-button:hover .rin-tooltip {
    display: block;
    max-width: 256px;
    opacity: 1;
  }
  
  .rin-tooltip-wrap {
    position: absolute;
    z-index: -1;
    &.rin-tooltip-right {
      rin-tooltip {
        float: right;
      }
    }
    &.rin-tooltip-left {
      .rin-tooltip {
        float: left;
      }
    }
    .rin-tooltip {
      position: relative;
      display: inline-block;
      padding: 0;
      margin: 0;
      width: auto;
      max-width: 0;
      color: white;
      background-color: @color-primary-2;
      border: 4px solid @color-primary-0;
      opacity: 0;
      overflow: hidden;
      transition: all .3s ease-in-out;
      p {
        white-space: nowrap;
      }
    }
  }
  
  .rin-button-mixin(52px, 4px, 6px);
  
  #rin-toolbar {
    .rin-button-mixin(58px, 4px, 10px);
  
    .rin-user-face {
      .rin-button-mixin(58px, 4px, 6px);
    }
  }
  
  .rin-button-small {
    .rin-button-mixin(20px);
  }
</style>

<template>
  <div class="rin-tooltip-wrap" :class="`rin-tooltip-${direction}`">
    <div class="rin-tooltip">
      <p>
        {{ info }}
        <slot name="html"></slot>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavTooltip',
    props: {
      info: {
        type: String,
        default: '',
      },
      direction: {
        type: String,
        default: 'right',
      },
    },
  };

</script>