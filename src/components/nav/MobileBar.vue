<script setup lang="ts">
import $config from '@/utils/_config'

const props = defineProps<{ items: { index: string; text: string; icon: string }[], show: boolean }>()

const $emit = defineEmits<{ select: [index: string] }>()

let realNavShow = ref(false)

const handleExpand = () => {
  realNavShow.value = !realNavShow.value
  document.body.style.overflow = realNavShow.value ? 'hidden' : 'auto'
}

const handleSelect = (index: string) => {
  $emit('select', index)
  handleExpand()
}

const links = [{ label: 'Home', icon: 'i-my-home', to: '/', color: '#666' }].concat(props.items.map(it => ({
  label: it.text,
  icon: it.icon,
  to: it.index,
  color: '#666'
})))

</script>

<template>
  <div class="sm:hidden">
    <Transition name="fade">
      <div class="logo" v-show="show">
        <NavBarTitle :show="true">Jasonzyt's Blog</NavBarTitle>
      </div>
    </Transition>
    <div class="expand" @click="handleExpand">
      <Icon :name="realNavShow ? 'uil:multiply' : 'my:options'" size="1.8rem" style="color:#666; fill: #666"
        mode="svg" />
    </div>
    <Transition name="fade">
      <div class="real-nav" v-if="realNavShow">
        <UAvatar size="2xl" :src="$config.avatar" alt="avatar" />
        <h1>Jasonzyt</h1>
        <p class="quote">
          <Icon class="align-text-top" name="ic:round-format-quote" size="1.2em" style="transform: rotate(180deg);" />
          <span>Do the right thing, wait to get fired.</span>
          <Icon class="align-text-top" name="ic:round-format-quote" size="1.2em" />
        </p>
        <NavSocialBar class="my-2" size="1.2rem" />
        <UDivider class="py-4" />
        <!-- <el-menu mode="vertical" @select="handleSelect">
          <el-menu-item index="home">
            <Icon name="my:home" style="fill: #666" />
            Home
          </el-menu-item>
          <el-menu-item v-for="item in items" :key="item.index" :index="item.index">
            <MyIcon :name="item.icon"></MyIcon>
            {{ item.text }}
          </el-menu-item>
        </el-menu> -->
        <UVerticalNavigation :links="links"
          :ui="{ padding: 'px-6 py-3', size: 'text-xl', icon: { base: 'mr-4 fill-gray-600' }, label: 'text-gray-600' }" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.logo {
  position: fixed;
  top: 1.2rem;
  left: 2rem;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0);
  z-index: 8;
}

.expand {
  position: fixed;
  top: 1.2rem;
  right: 2rem;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0);
  z-index: 10;
}

.el-divider {
  margin: 12px 0;
}

.real-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
  background-color: #fff;
  color: #333;
  text-align: center;
  z-index: 9;
}

.real-nav .el-avatar {
  display: inline-block;
}

.real-nav h1 {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.real-nav .el-menu {
  --el-menu-border-color: rgba(0, 0, 0, 0);
}

.real-nav .el-menu-item {
  font-size: 1rem;
  color: #666;
}

.quote {
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  width: fit-content;
  color: #666;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  font-size: calc(100vw / 26);
  font-family: Ubuntu, serif;
}

.quote .el-icon+span {
  margin-left: 0.5rem;
}

.quote span {
  user-select: none;
}

.quote span+.el-icon {
  margin-left: 0.5rem;
}
</style>