import { h, Component } from 'preact'
import style from './style'
import languageColors from '../../lib/language-colors'

export default class Repo extends Component {

  handlerOnOpenDialog = itemId => event => {
    this.props.handlerOnOpenDialog(itemId)
  }

  render ({item}) {
    const languageColor = {
      backgroundColor: item.language && languageColors[item.language]
        ? languageColors[item.language].color
        : '#586069'
    }

    const stars = item.stargazers_count < 1000
      ? item.stargazers_count
      : (item.stargazers_count / 1000).toFixed(1) + 'k'

    return(
      <div class={style.repo}
           onClick={this.handlerOnOpenDialog(item.id)}>
        <h2 class={style.repoName}>{item.full_name}</h2>
        <h3 class={style.repoDescription}>{item.description}</h3>
        {item.fork
          ? <span class={style.repoForked}>Forked</span>
          : null}
        {stars
          ? <span class={style.repoStars}>
              <i class={style.repoStarsIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14px">
                  <path fillRule="evenodd" fill="#586069" d="M 14 6 l -4.9 -0.64 L 7 1 L 4.9 5.36 L 0 6 l 3.6 3.26 L 2.67 14 L 7 11.67 L 11.33 14 l -0.93 -4.74 Z"/>
                </svg>
              </i>
              {stars}
            </span>
          : null}
        <time class={style.repoUpdatedAt} dateTime={item.updated_at}>Updated at: {item.updated_at.slice(0,10)}</time>
        {item.language
          ? <span class={style.repoLanguage}>
              <i class={style.repoLanguageIcon}
                  style={languageColor}></i>
              {item.language}
            </span>
          : null
        }
      </div>
    )
  }
}
