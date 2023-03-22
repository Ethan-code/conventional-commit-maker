<script>
	import Clipboard from "svelte-clipboard";

	let type = 'feat';
	let issueNo = '';
	let message = '';

	$: result = `${type}(${issueNo}): ${message}`
</script>

<main>
	<h1>Conventional Commit Maker</h1>
	<label for="type">類型</label>
	<select name="type" id="type" bind:value={type}>
		<option value="feat">feat: 新增功能</option>
		<option value="fix">fix: 修復 bug</option>
		<option value="refactor">refactor: 重構程式碼</option>
		<option value="style">style: 更新程式碼風格</option>
		<option value="docs">docs: 修改文件</option>
		<option value="chore">chore: 建構輔助工具</option>
	</select>
	<label for="scope">範圍 (Jira Issue 編號)</label>
	<input name="scope" id="scope" bind:value={issueNo} />
	<label for="message">Commit 訊息</label>
	<input name="message" id="message" bind:value={message} />

	<h2>Result</h2>
	<blockquote>{result}</blockquote>
	<Clipboard
		text="{result}"
		let:copy
		on:copy={() => {
			alert('已複製到剪貼簿');
		}}>
		<button on:click={copy}>複製</button>
	</Clipboard>
</main>

<style>
	main {
		width: 500px;
	}

	input#message {
		width: 100%;
	}
</style>