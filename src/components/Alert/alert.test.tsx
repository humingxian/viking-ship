import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertType, AlertProps } from './alert'

const defaultProps: AlertProps = {
  title: 'this is default alert',
  closable: false
}

const testProps: AlertProps = {
  title: 'Success',
  type: AlertType.Success,
  className: 'klass'
}

const widthDescriptionProps: AlertProps = {
  title: 'this is alert width description',
  description: 'description info'
}

const closableProps: AlertProps = {
  title: 'close',
  closable: true,
  onClose: jest.fn()
}

describe('test Alert component', () => {
  it('should render the correct default alert without close', () => {
    const wrapper = render(<Alert {...defaultProps} />)
    const element = wrapper.container.querySelector('.alert')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert alert-default')
    const closeSpan = wrapper.container.querySelector('.alert-close') as HTMLSpanElement
    expect(closeSpan).not.toBeInTheDocument()
  })
  it('should render the correct alert based on different props', () => {
    const wrapper = render(<Alert {...testProps} />)
    const element = wrapper.container.querySelector('.alert')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert-success klass')
  })
  it('should render the correct alert width description', () => {
    const wrapper = render(<Alert {...widthDescriptionProps} />)
    const element = wrapper.container.querySelector('.alert')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert-with-description')
    const descriptionSpan = wrapper.container.querySelector('.alert-description') as HTMLSpanElement
    expect(descriptionSpan).toBeInTheDocument()
  })
  it('should render the closable alert when onClose have to be called ', () => {
    const wrapper = render(<Alert {...closableProps} />)
    const element = wrapper.container.querySelector('.alert')
    expect(element).toBeInTheDocument()
    const closeSpan = wrapper.container.querySelector('.alert-close') as HTMLSpanElement
    fireEvent.click(closeSpan)
    expect(closableProps.onClose).toHaveBeenCalled()
  })
})