import { h, Component } from 'preact'
import style from './style'
import Repo from '../repo'

export default class ReposList extends Component {
  render ({handlerOnOpenDialog, data, filterLang}) {
    return(
      <div>
        {data.map(item => <Repo handlerOnOpenDialog={handlerOnOpenDialog}
                                filterLang={filterLang}
                                item={item}
                                key={item.id}/>)}
      </div>
    )
  }
}