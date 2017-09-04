import { h, Component } from 'preact'
import style from './style'

export default class Spinner extends Component {
  render () {
    return (
      <div class={style.spinnerContainer}>
        <svg class={style.spinner}
             width='65px'
             height='65px'
             viewBox='0 0 66 66'
             xmlns='http://www.w3.org/2000/svg'>
          <circle class={style.path}
                  fill='none'
                  strokeWidth='6'
                  strokeLinecap='round'
                  cx='33'
                  cy='33'
                  r='30'>
          </circle>
        </svg>
      </div>
    )
  }
}