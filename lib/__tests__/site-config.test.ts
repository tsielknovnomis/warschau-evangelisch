import { describe, it, expect } from 'vitest'
import { siteConfig } from '@/lib/site-config'

describe('siteConfig', () => {
  it('uses the verified address (Miodowa 21, 00-246)', () => {
    expect(siteConfig.address.street).toBe('ul. Miodowa 21')
    expect(siteConfig.address.postalCode).toBe('00-246')
    expect(siteConfig.address.city).toBe('Warszawa')
  })

  it('uses the BNP Paribas bank account confirmed by the board (17.07.2026)', () => {
    expect(siteConfig.bank.name).toBe('BNP Paribas')
    expect(siteConfig.bank.bic).toBe('PPABPLPK')
    expect(siteConfig.bank.pln).toBe('13 1600 1462 1728 8283 8000 0001')
    expect(siteConfig.bank.eurIban).toBe('PL56 1600 1462 1728 8283 8000 0003')
    expect(siteConfig.bank.verify).toBe(false)
  })

  it('exposes contact emails and no phone number', () => {
    expect(siteConfig.contact.general).toBe('info@warschau-evangelisch.de')
    expect(siteConfig.contact.pastor).toBe('pfarrer@warschau-evangelisch.de')
    expect(siteConfig.contact.phone).toBeNull()
  })

  it('marks the pastor as to-be-verified and lists the confirmed board', () => {
    expect(siteConfig.people.pastor.name).toBe('Dr. Grzegorz Olek')
    expect(siteConfig.people.pastor.verify).toBe(true)
    expect(siteConfig.people.board).toEqual([
      'Jürgen Wandel',
      'Jens Boysen',
      'Simon von Kleist',
    ])
  })

  it('keeps social links without twitter/x', () => {
    expect(siteConfig.social.youtube).toContain('youtube.com')
    expect(siteConfig.social.instagram).toContain('instagram.com')
    expect(siteConfig.social.facebook).toContain('facebook.com')
    expect('twitter' in siteConfig.social).toBe(false)
  })

  it('records the KRS number', () => {
    expect(siteConfig.krs).toBe('0000590323')
  })
})
