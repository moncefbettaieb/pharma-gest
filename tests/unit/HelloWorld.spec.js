import { mount } from '@vue/test-utils'
import HelloWorld from "@/components/HelloWorld.vue"

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    // Définir la propriété `msg` qui sera passée au composant
    const msg = 'Hello Vue 3!'
    
    // Monter le composant avec le prop `msg`
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })

    // Vérifier que le texte rendu correspond à la valeur du prop
    expect(wrapper.text()).toMatch(msg)
  })
})
