import { h, Component } from 'preact'
import {getLanguagesShares} from '../../lib/utils'
import languageColors from '../../lib/language-colors'
import style from './style'

export default class Dialog extends Component {

  componentDidMount() {
    const $piechart = document.querySelector('.piechart')
    const ctx = $piechart.getContext('2d')
    // const shares = [50, 30, 15, 5]
    // const colors = ['red', 'green', 'blue', 'yellow', 'black']
    const initialShift = 1.5 * Math.PI
    let shift = initialShift
    const centerX = 100
    const centerY = 75
    Object.keys(this.languagesInPercent).forEach((language, id) => {
        const share = this.languagesInPercent[language]
        console.log('language share', language, share)
        const angle = share / 100 * 2 * Math.PI + shift
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, 50, shift, angle)
        ctx.closePath()
        ctx.fillStyle = languageColors[language] ? languageColors[language].color : '#586069'
        ctx.fill()
        shift = angle
      }
    )
  }


  render ({dialogItem}) {
    const {fullName, htmlUrl, sourceUrl, sourceName, contributors, languages, pulls} = dialogItem
    this.languagesInPercent = getLanguagesShares(languages)

    return (
      <div>
        <a href={htmlUrl}>{fullName}</a>

        {this.languagesInPercent
          ? <canvas className="piechart"></canvas>
          : null
        }

        {this.languagesInPercent
          ? <ul>{Object.keys(this.languagesInPercent).
            map(language =>
              <li>
                <i class={style.languageIcon}
                   style={{
                     backgroundColor: language && languageColors[language]
                       ? languageColors[language].color
                       : '#586069'
                   }}></i>
                {language}
                <span>{this.languagesInPercent[language].toFixed(1)}%</span>
              </li>)}
            </ul>
          : null
        }

        {contributors
          ? <ul>{contributors.map(
            ({html_url, avatar_url, login, contributions}) => <li>
              <a href={html_url}>
                <img src={avatar_url} alt={login}/>
                {login}
              </a>
              <span>Contributions: {contributions}</span>
            </li>)}
          </ul>
          : null
        }

        {pulls.length
          ? <div>
              <h5>Pull requests</h5>
              <ul>{ pulls.map(
                ({title, html_url}) => <li>
                  <a href={html_url}>{title}</a>
                </li>)}
              </ul>
            </div>
          : null
        }

        {sourceUrl
          ? <span>Forked from <a href={sourceUrl}>{sourceName}</a></span>
          : null
        }

      </div>
    )

  }
}