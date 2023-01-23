import React, { PropsWithChildren } from "react"
import ReactDOM from "react-dom"

interface IPortal extends PropsWithChildren<{ id: string }> {}
export class Portal extends React.Component<IPortal> {
  el: HTMLDivElement
  root: HTMLDivElement | null
  constructor(props: IPortal) {
    super(props)
    this.root = document.getElementById(props.id) as HTMLDivElement
    if (!this.root) {
      const body = document.getElementsByTagName("body")[0]
      this.root = document.createElement("div")
      this.root.setAttribute("id", props.id)
      body.appendChild(this.root)
    }
    this.el = document.createElement("div")
  }

  componentDidMount() {
    this.root && this.root.appendChild(this.el)
  }

  componentWillUnmount() {
    this.root && this.root.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
