import { h, Component } from 'preact'
import style from './style'

export default class Repo extends Component {

  handlerOnOpenDialog = itemId => event => {
    console.log(itemId)
    this.props.handlerOnOpenDialog(itemId)
  }

  render ({item}) {
    return(
      <div onClick={this.handlerOnOpenDialog(item.id)}>
        Name#{item.full_name}
        #{item.description}
        #{item.fork}
        STARS#{item.stargazers_count}
        #{item.updated_at}
        #{item.language}
        #ISSUES{item.open_issues_count}
        END

      </div>
    )
  }
}
