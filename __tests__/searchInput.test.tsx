import { describe, it, expect as jestExpect } from '@jest/globals'
import { waitFor } from '@testing-library/dom'
import { act, fireEvent, render, screen } from '@testing-library/react'

import useQueryParams from '@/hooks/useQueryParams'
import SearchInput from '@/components/shared/inputs/SearchInput'

// Mock the custom hooks
jest.mock('@/hooks/useQueryParams', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/hooks/useDebounce', () => ({
    __esModule: true,
    default: jest.fn((value) => value),
}))

describe('SearchInput', () => {
    const mockAdd = jest.fn()
    const mockRemove = jest.fn()
    const mockAddMultiple = jest.fn()
    const mockIsInQuery = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
        jest.mocked(useQueryParams).mockReturnValue({
            add: mockAdd,
            remove: mockRemove,
            query: null,
            addMultiple: mockAddMultiple,
            isInQuery: mockIsInQuery,
        })
    })

    it('renders with default placeholder', () => {
        render(<SearchInput />)
        jestExpect(screen.getByTestId('search-input')).toBeInTheDocument()
    })

    it('renders with custom placeholder', () => {
        const placeholder = 'Custom placeholder'
        render(<SearchInput placeholder={placeholder} />)
        jestExpect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    })

    it('shows search icon by default', () => {
        const { container } = render(<SearchInput />)
        jestExpect(container.querySelector('svg')).toHaveClass('lucide-search')
    })

    it('updates query params on input change', async () => {
        jest.useFakeTimers()

        render(<SearchInput />)
        const input = screen.getByTestId('search-input')

        fireEvent.change(input, { target: { value: 'test query' } })

        act(() => {
            jest.advanceTimersByTime(500)
        })

        await waitFor(() => {
            jestExpect(mockAdd).toHaveBeenCalledWith('search', 'test query')
        })

        fireEvent.change(input, { target: { value: '' } })

        act(() => {
            jest.advanceTimersByTime(500)
        })

        await waitFor(() => {
            jestExpect(mockRemove).toHaveBeenCalledWith('search')
        })

        jest.useRealTimers()
    })

    it('shows loader icon while searching', async () => {
        jest.useFakeTimers()
        const { container } = render(<SearchInput />)
        const input = screen.getByTestId('search-input')

        fireEvent.change(input, { target: { value: 'test query' } })

        // pretend as if 500ms has passed
        act(() => {
            jest.advanceTimersByTime(500)
            jestExpect(container.querySelector('svg')).toHaveClass(
                'lucide-loader'
            )
        })

        act(() => {
            jest.advanceTimersByTime(400)
        })

        await waitFor(() => {
            jestExpect(container.querySelector('svg')).toHaveClass(
                'lucide-search'
            )
        })

        jest.useRealTimers()
    })
})
