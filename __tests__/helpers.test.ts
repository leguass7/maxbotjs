import { extractExtension, isValidURL, replaceAll } from '../src/helpers'
import decamelcase from '../src/helpers/decamelcase'

describe('Test helpers', () => {
  it('Deveria descamelizar strings', done => {
    const expected = { test_one: 'test' }
    const expected2 = [{ test_one: 'test1' }, { test_two: 'test2' }]
    const decamelized = decamelcase({ testOne: 'test' }) as {}
    expect(decamelized).toEqual(expect.objectContaining(expected))
    const arr = decamelcase([{ testOne: 'test1' }, { testTwo: 'test2' }]) as typeof expected2

    arr.forEach((obj, i) => {
      expect(obj).toEqual(expect.objectContaining(expected2[i]))
    })

    expect({ ...decamelized, test_one: 'test_one', 1: 'test1' }).toEqual(
      expect.objectContaining({
        test_one: 'test_one',
        1: 'test1'
      })
    )

    done()
  })

  it('Should test replaceAll', () => {
    expect(replaceAll('primeiro segundo', ' ')).toEqual('primeiro,segundo')
    expect(replaceAll('primeiro segundo', ' ', '')).toEqual('primeirosegundo')
    expect(replaceAll('primeiro segundo', [' ', 'e'], '')).toEqual('primirosgundo')
    expect(replaceAll('')).toEqual('')
  })

  test('Should return ext of a url', () => {
    const expected = 'pdf'
    expect(extractExtension('design.pdf')).toEqual(expected)
    expect(extractExtension('http://example.com/include/marquee/design.pdf')).toEqual(expected)
    expect(extractExtension('/marquee/design.pdf?width=792&height=294')).toEqual(expected)
    expect(extractExtension('http://example.com/some/page.html#fragment1')).toEqual('html')
    expect(extractExtension('http://example.com/dynamic.php?foo=bar#fragment1')).toEqual('php')
    expect(extractExtension('http://example.com/dynamic/')).toEqual('')
  })

  it('Should test valid url', () => {
    expect(isValidURL('design.pdf')).toEqual(false)
    expect(isValidURL('http://example.com/include/marquee/design.pdf')).toEqual(true)
  })
})

export {}
