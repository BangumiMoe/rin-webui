<style lang="less">
  @import "../less/colors.less";
  .rin-button-mixin(@size, @border: 4px) {
    @diameter: (@size + 2 * @border);
    @p_m_tb: (@diameter - 20px) / 2;
    @p_m_lr0: (@diameter - 40px) / 2;
    @p_m_lr1: 10px + @p_m_lr0;
    .rin-tooltip {
      border-radius: @diameter / 2;
      p {
        margin: @p_m_tb @p_m_lr0;
      }
    }
    .rin-tooltip-right .rin-tooltip {
      padding-right: @diameter;
      p {
        margin-left: @p_m_lr1;
      }
    }
    .rin-tooltip-left .rin-tooltip {
      padding-left: @diameter;
      p {
        margin-right: @p_m_lr1;
      }
    }
  }
  
  .rin-tooltip-wrap {
    position: absolute;
    top: -4px;
    width: 0;
    height: calc(~"100% + 8px");
    z-index: -1;
  }
  
  .rin-tooltip-wrap.rin-tooltip-right {
    right: -4px;
  }
  
  .rin-tooltip-right .rin-tooltip {
    float: right;
  }
  
  .rin-tooltip-wrap.rin-tooltip-left {
    left: -4px;
  }
  
  .rin-tooltip-left .rin-tooltip {
    float: left;
  }
  
  .rin-button:hover .rin-tooltip {
    display: block;
    max-width: 256px;
    opacity: 1;
  }
  
  .rin-tooltip {
    z-index: 2;
    padding: 0;
    width: auto;
    height: 100%;
    max-width: 0;
    background-color: @color-primary-2;
    transition: all .2s ease-in-out;
    color: @color-primary-1;
    position: relative;
    opacity: 0;
    overflow: hidden;
    p {
      white-space: nowrap;
      color: @color-primary-4;
      height: 20px;
      line-height: 20px;
      text-shadow: none;
    }
  }
  
  .rin-button-mixin(40px);
  /* for rin-logo */
  
  .rin-logo {
    .rin-button-mixin(48px);
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