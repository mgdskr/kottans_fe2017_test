import { h, Component } from 'preact'
import {getLanguagesShares} from '../../lib/utils'
import languageColors from '../../lib/language-colors'
import style from './style'

export default class Dialog extends Component {

  componentDidMount() {

    const $piechart = document.querySelector('.piechart')
    $piechart.width = 150;
    $piechart.height = 150;
    const ctx = $piechart.getContext('2d')
    const initialShift = 1.5 * Math.PI
    let shift = initialShift
    const centerX = 75
    const centerY = 75
    const radius = 50
    const languagesInPercent = getLanguagesShares(this.props.dialogItem.languages)
    Object.keys(languagesInPercent).forEach((language, id) => {
        const share = languagesInPercent[language]
        const angle = share / 100 * 2 * Math.PI + shift
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, shift, angle)
        ctx.closePath()
        ctx.fillStyle = languageColors[language] ? languageColors[language].color : '#586069'
        ctx.strokeStyle = '#fff'
        ctx.fill()
        shift = angle
      }
    )
  }


  handlerOnClick = event => {
    if (event.target.id === 'dialogContainer' || event.target.id === 'dialogClose') {
      this.props.handlerOnCloseDialog()
    }
  }

  render ({dialogItem}) {
    const {fullName, htmlUrl, sourceUrl, sourceName, contributors, languages, pulls} = dialogItem

    const languagesInPercent = getLanguagesShares(languages)

    return (
      <div id="dialogContainer"
           class={style.dialogContainer}
           onClick={this.handlerOnClick}>
        <div id="dialog"
             class={style.dialog}>
          <span id="dialogClose"
                class={style.dialogClose}
                onClick={this.handlerOnClick}>
            &times;
          </span>
          <a class={style.dialogTitle} href={htmlUrl}><h3>{fullName}</h3></a>
          {sourceUrl &&
            <span class={style.dialogSource}>
              Forked from
              <a class={style.dialogSourceLink} href={sourceUrl}>{sourceName}</a>
            </span>
          }

          {languagesInPercent &&
            <div class={style.languagesContainer}>
              <canvas className="piechart"></canvas>
              <ul class={style.languagesList}>
                {Object.keys(languagesInPercent)
                .map(language =>
                  <li class={style.language}>
                    <i class={style.languageIcon}
                       style={{
                         backgroundColor: language && languageColors[language]
                           ? languageColors[language].color
                           : '#586069'
                       }}></i>
                    {language}
                    <span class={style.languageShare}>{languagesInPercent[language].toFixed(1)}%</span>
                  </li>)}
              </ul>
            </div>
          }

          <div class={style.repoDetails}>
            {contributors &&
              <div>
                <h4>Contributors list</h4>
                <ul class={style.contributorsList}>{contributors.map(
                  ({html_url, avatar_url, login, contributions}) => <li class={style.contributor}>
                    <img class={style.contributorAvatar}
                         src={avatar_url}
                         alt={login}/>
                    <div class={style.contributorDetails}>
                      <a class={style.contributorLink}
                         href={html_url}>
                        {login}
                      </a>
                      <span class={style.contributions}>{contributions} commits</span>
                    </div>
                  </li>)}
                </ul>
              </div>
            }

            {pulls.length
              ? <div class={style.pullsContainer}>
                  <h4>Pull requests</h4>
                  <ul class={style.pullsList}>{ pulls.map(
                    ({title, html_url}) => <li class={style.pullItem}>
                      <a class={style.pullItemLink} href={html_url}>{title}</a>
                    </li>)}
                  </ul>
                </div>
              : null
            }
          </div>

        </div>
      </div>
    )
  }
}