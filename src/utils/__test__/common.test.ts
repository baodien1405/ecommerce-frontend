import { HttpStatusCode } from '@/constants'
import { AxiosError } from 'axios'
import { describe, it, expect } from 'vitest'
import {
  convertTitleCase,
  formatAmount,
  getBase64,
  isAxiosError,
  isAxiosUnprocessableEntityError
} from '../common.util'
import { RcFile } from 'antd/lib/upload'

describe('isAxiosError', () => {
  it('should return boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('should return boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})

// Test for getBase64 function
describe('getBase64', () => {
  it('should return a base64 string when given a valid file', async () => {
    // Create a mock file
    const file = new File(['test'], 'test.txt', { type: 'text/plain' }) as RcFile

    // Call the getBase64 function with the mock file
    const result = await getBase64(file)
    // Check if the result is a base64 string
    expect(result).toMatch(/^data:text\/plain;base64,/)
  })

  it('should reject with an error when given an invalid file', async () => {
    // Create a mock invalid file
    const invalidFile = {} as RcFile

    // Call the getBase64 function with the mock invalid file and expect it to throw an error
    await expect(getBase64(invalidFile)).rejects.toThrow()
  })
})

describe('formatAmount', () => {
  it('should format amount correctly with default parameters', () => {
    const result = formatAmount(1000)
    expect(result).toBe('$1,000.00')
  })

  it('should format amount correctly with custom parameters', () => {
    const result = formatAmount(1000, 'en-GB', 'GBP', 3)
    expect(result).toBe('£1,000.00')
  })

  it('should format amount correctly with different currency', () => {
    const result = formatAmount(1000, 'en-US', 'EUR')
    expect(result).toBe('€1,000.00')
  })

  it('should format amount correctly with different maximumFractionDigits', () => {
    const result = formatAmount(1000, 'en-US', 'USD', 3)
    expect(result).toBe('$1,000.00')
  })
})

describe('convertTitleCase', () => {
  it('should convert a string to title case', () => {
    expect(convertTitleCase('hello world')).toBe('Hello World')
  })

  it('should not capitalize exception words', () => {
    expect(convertTitleCase('a tale of two cities')).toBe('A Tale of Two Cities')
  })

  it('should capitalize the first word even if it is an exception word', () => {
    expect(convertTitleCase('the great gatsby')).toBe('The Great Gatsby')
  })

  it('should handle empty strings', () => {
    expect(convertTitleCase('')).toBe('')
  })

  it('should handle strings with only one word', () => {
    expect(convertTitleCase('hello')).toBe('Hello')
  })
})
