<script>
	import Clipboard from 'svelte-clipboard';

	let type = 'feat';
	let issueNo = 'EMS-';
	let message = '';

	let openaiToken = '';

	$: result = `${type}(${issueNo}): ${message}`;

	function OpenaiFetchAPI() {
		console.log('Calling GPT3');
		var url = 'https://api.openai.com/v1/completions';
		var bearer = `Bearer ${openaiToken}`;

		if (!openaiToken) {
			alert('請輸入 OpenAI Token 才可進行翻譯！');
			return;
		}
		fetch(url, {
			method: 'POST',
			headers: {
				Authorization: bearer,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'text-davinci-003',
				prompt: `Translate '${message}' to English`,
				max_tokens: 50,
				temperature: 0,
				top_p: 1,
				n: 1,
				stream: false,
				logprobs: null,
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				console.log(data['choices'][0].text);
				message = data['choices'][0].text;
			})
			.catch((error) => {
				console.log('Something bad happened ' + error);
			});
	}
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

	<label for="openai-token">OpenAI Token</label>
	<input name="openai-token" id="openai-token" type="password" bind:value={openaiToken} />
	<button on:click={OpenaiFetchAPI}>中翻英</button>

	<h2>Result</h2>
	<blockquote>{result}</blockquote>
	<Clipboard
		text={result}
		let:copy
		on:copy={() => {
			alert('已複製到剪貼簿');
		}}
	>
		<button on:click={copy}>複製</button>
	</Clipboard>
</main>

<style>
	main {
		width: 500px;
		padding: 1.5rem;
		border-radius: 1em;
		background-color: #FCFAF2;
	}

	input#message,
	input#openai-token {
		width: 100%;
		box-sizing: border-box;
	}
</style>
