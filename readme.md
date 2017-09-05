[link to app root](https://mgdskr.github.io/)

_За основу для проекта взял preact, без redux, позже пожалел об этом. По базовым требованиям сделал все, кажется ничего не упустил._

* `master` should be hosted with [GitHub Pages](https://pages.github.com/)

_Вот это не понял, апп выложил на GitHub Pages_

_По бонусным_

* progress indicator (for slow connections)

_есть спиннер_

* date can be entered in user-preferred locale or with datepicker

_дeфолтный дейтпикер_

* stars count is nicely rounded (5627 => 5.6k)

_done_

* repos languages are hidden when filtering by language

_done_

* submit button is pressed with "Enter" key

_done_

### Router

_Роутер есть только в сортировке явно указан порядок и asc и desc, а не только desc_

2. sorting was enabled

`/kottans?sort=updated`

3. sorting order was reversed

`/kottans?sort=updated&order=desc`


* router ignores opening link in a new tab (with keyboard or context menu)

_нет_

* application state is restored after reloading

_у меня все работало, а как выложил так сразу перестало_

* history navigation is sensible

_да_

* [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) is used

_да_

### Performance

* total app size (HTML + CSS + JS) <= 14Kb (including dependencies, minified & gzipped)

_собственно преакт был выбран ради этой цели, но в итоге 49.3Kb_

* the app is served over `https://`

_github pages отдает `https://`, но для этого ничего не нужно делать, или я скорее всего не понял задание_


