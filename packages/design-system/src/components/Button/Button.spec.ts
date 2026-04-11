import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Button from './Button.vue'

describe('Button', () => {
  it('renderiza o elemento button', () => {
    const wrapper = mount(Button, {
        slots: { default: 'Salvar' },
      })

    expect(wrapper.find('[data-testid="ds-button"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Salvar')
  })

})
