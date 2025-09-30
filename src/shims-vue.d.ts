declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // The `any` here can be replaced with your props/emit types if needed
  const component: DefineComponent<{}, {}, any>
  export default component
}