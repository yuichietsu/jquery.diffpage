# jquery.diffpage

WEBページの差分を視覚的に表示します。

## 使用方

比較結果を表示するdivを用意します。

```html:sample
<div id="result"></div>
```

```css:sample
div#result
{
	border: 1px solid #000;
	width: 800px;
	height: 600px;
}
```

比較対象のURLを指定します。
```javascript:sample
$(function() {
	$('#result').diffpage({
		'oldUrl' : 'test/old.html',
		'newUrl' : 'test/new.html'
	});
});
```

比較対象のURLはirameにロードするので、結果を埋め込むページからiframeで参照できるURLである必要があります。

## 使用例

* [簡単な例](https://yuichietsu.github.io/jquery.diffpage/samples/sample2.html)
* [差分の表示パターンの設定例](https://yuichietsu.github.io/jquery.diffpage/samples/sample3.html)
