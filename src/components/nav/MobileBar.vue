<script setup lang="ts">
import $config from '@/utils/_config'

const props = defineProps<{ items: { index: string; text: string; icon: string }[], show: boolean }>()

let realNavShow = ref(false) // real navigation, which is fixed on the top, actually is not a bar in this case; menu button is always visible

const handleExpand = () => {
  realNavShow.value = !realNavShow.value
  document.body.style.overflow = realNavShow.value ? 'hidden' : 'auto'
}

const links = [{ label: 'Home', icon: 'i-my-home', to: '/', color: 'rgb(var(--color-gray-600))' }].concat(props.items.map(it => ({
  label: it.text,
  icon: it.icon,
  to: it.index,
  color: 'rgb(var(--color-gray-600))'
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
      <Icon :name="realNavShow ? 'uil:multiply' : 'my:options'" size="1.8rem"
        style="color:rgb(var(--color-gray-600))" />
    </div>
    <Transition name="fade">
      <div class="real-nav" v-if="realNavShow">
        <UAvatar size="2xl" :src="$config.avatar" alt="avatar" />
        <h1>Jasonzyt</h1>
        <p class="quote select-none">
          <Icon class="align-text-top" name="ic:round-format-quote" size="1.2em" style="transform: rotate(180deg);" />
          <span>Do the right thing, wait to get fired.</span>
          <Icon class="align-text-top" name="ic:round-format-quote" size="1.2em" />
        </p>
        <NavSocialBar class="my-2" size="1.2rem" />
        <UDivider class="py-4" />
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

.real-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
  background-color: #fff;
  color: rgb(var(--color-gray-500));
  text-align: center;
  z-index: 9;
}

.real-nav h1 {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.quote {
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  width: fit-content;
  color: rgb(var(--color-gray-600));
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  font-size: calc(100vw / 26);
  font-family: Ubuntu, serif;
}
</style>