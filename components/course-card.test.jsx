import React from 'react'
import { render, screen } from '@testing-library/react'
import CourseCard from './course-card'

describe('CourseCard', () => {
  const courseInfo = {
    title: 'Introduction to Programming',
    description:
      'Learn the basics of programming with this introductory course.',
    imageUrl: 'path/to/image.jpg',
  }

  test('renders the course title and description', () => {
    render(<CourseCard course={courseInfo} />)
    const titleElement = screen.getByText(courseInfo.title)
    const descriptionElement = screen.getByText(courseInfo.description)

    expect(titleElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
  })

  test('renders the course image', () => {
    render(<CourseCard course={courseInfo} />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', courseInfo.imageUrl)
  })
})
