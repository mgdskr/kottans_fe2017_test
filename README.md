[link to app root] (https://mgdskr.github.io/)
такие ссылки тоже должны работать
[https://mgdskr.github.io/kottans?sort=full_name&order=asc&has_open_issues&language=css](https://mgdskr.github.io/kottans?sort=full_name&order=asc&has_open_issues&language=css)

За основу для проекта взял preact, без redux, позже пожалел об этом. По базовым требованиям сделал все, кажется ничего не упустил.
* `master` should be hosted with [GitHub Pages](https://pages.github.com/)
Вот это не понял, апп выложил на GitHub Pages

По бонусным

* progress indicator (for slow connections)
есть спиннер
* date can be entered in user-preferred locale or with datepicker
дeфолтный дейтпикер
* stars count is nicely rounded (5627 => 5.6k)
done
* repos languages are hidden when filtering by language
done
* submit button is pressed with "Enter" key
done

### Router

Роутер есть
только в сортировке явно указан порядок и asc и desc, а не только desc

2. sorting was enabled

`/kottans?sort=updated`

3. sorting order was reversed

`/kottans?sort=updated&order=desc`


* router ignores opening link in a new tab (with keyboard or context menu)
нет
* application state is restored after reloading
да
* history navigation is sensible
да
* [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) is used
да

### Performance

* total app size (HTML + CSS + JS) <= 14Kb (including dependencies, minified & gzipped)
собственно преакт был выбран ради этой цели, но в итоге 49.3Kb

* the app is served over `https://`
github pages отдает `https://`, но для этого ничего не нужно делать, или я скорее всего не понял задание


