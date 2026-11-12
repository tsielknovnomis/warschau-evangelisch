import { describe, it, expect } from 'vitest'
import { obfuscateEmail, deobfuscateEmail } from '@/lib/email-obfuscation'

describe('email obfuscation', () => {
  it('writes the address the way the board asked for', () => {
    expect(obfuscateEmail('info@warschau-evangelisch.de')).toBe(
      'info [klammeraffe] warschau [minus] evangelisch [punkt] de',
    )
    expect(obfuscateEmail('pfarrer@warschau-evangelisch.de')).toBe(
      'pfarrer [klammeraffe] warschau [minus] evangelisch [punkt] de',
    )
  })

  it('round-trips back to the real address', () => {
    for (const a of ['info@warschau-evangelisch.de', 'a.b-c@x-y.z.de']) {
      expect(deobfuscateEmail(obfuscateEmail(a))).toBe(a)
    }
  })

  it('never contains a plain @', () => {
    expect(obfuscateEmail('info@warschau-evangelisch.de')).not.toContain('@')
  })
})
