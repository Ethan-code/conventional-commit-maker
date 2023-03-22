<script>
	let type = 'feat';
	let issueNo = '';
	let message = '';

	$: result = `${type}(${issueNo}): ${message}`
</script>

<main>
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

	<h1>這真是史詩般的訊息</h1>
	<p>{result}</p>
</main>

<style>
	main {
		width: 500px;
	}

	input#message {
		width: 100%;
	}
</style>