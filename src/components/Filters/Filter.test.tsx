import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Filters from './Filters'

describe('Filter component', () => {
const genres = ['Action', 'Comedy', 'Drama']
  const onGenreButtonClick = vi.fn()
  const selectedGenre = 'Action'


  it('renders component and adds all categories as a genre', () => {
    render(<Filters genres={genres} selectedGenre={selectedGenre} onGenreButtonClick={onGenreButtonClick} />)
    expect(screen.getByText('All Categories')).toBeInTheDocument()
    genres.forEach(genre => {
      expect(screen.getByText(genre)).toBeInTheDocument()
    })
  })

  it('highlights the selected genre button', () => {
    render(<Filters genres={genres} selectedGenre={selectedGenre} onGenreButtonClick={onGenreButtonClick} />)
    const selectedButton = screen.getByText(selectedGenre)
    expect(selectedButton).not.toHaveClass('btn-outline')
  })

  it('calls onGenreButtonClick with the correct genre only once', () => {
    render(<Filters genres={genres} selectedGenre={selectedGenre} onGenreButtonClick={onGenreButtonClick} />)
    
    const allCategoriesButton = screen.getByText('All Categories')
    fireEvent.click(allCategoriesButton)
    expect(onGenreButtonClick).toHaveBeenCalledTimes(1)
    expect(onGenreButtonClick).toHaveBeenCalledWith('')

    genres.forEach((genre, index) => {
      const genreButton = screen.getByText(genre)
      fireEvent.click(genreButton)
      expect(onGenreButtonClick).toHaveBeenCalledTimes(index + 2) // +2 because allCategoriesButton was clicked first
      expect(onGenreButtonClick).toHaveBeenCalledWith(genre)
    })
})
})