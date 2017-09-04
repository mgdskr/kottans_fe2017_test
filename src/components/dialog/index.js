import { h, Component } from 'preact'
import {getLanguagesShares} from '../../lib/utils'
import languageColors from '../../lib/language-colors'
import style from './style'

export default class Dialog extends Component {

  componentDidUpdate() {
    if (!this.props.dialogItem.languages.length) {return}

    const $piechart = document.querySelector('.piechart')
    const ctx = $piechart.getContext('2d')
    const initialShift = 1.5 * Math.PI
    let shift = initialShift
    const centerX = 100
    const centerY = 75
    const languagesInPercent = getLanguagesShares(this.props.dialogItem.languages)
    Object.keys(languagesInPercent).forEach((language, id) => {
        const share = languagesInPercent[language]
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
    const languagesInPercent = getLanguagesShares(languages)

    return (
      <div>
        <a href={htmlUrl}>{fullName}</a>

        {languagesInPercent
          ? <canvas className="piechart"></canvas>
          : null
        }

        {languagesInPercent
          ? <ul>
            {Object.keys(languagesInPercent)
            .map(language =>
              <li>
                <i class={style.languageIcon}
                   style={{
                     backgroundColor: language && languageColors[language]
                       ? languageColors[language].color
                       : '#586069'
                   }}></i>
                {language}
                <span>{languagesInPercent[language].toFixed(1)}%</span>
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