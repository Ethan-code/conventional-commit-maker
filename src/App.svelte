<script>
	import Clipboard from 'svelte-clipboard';

	let type = 'feat';
	let issueNo = 'EMS-';
	let message = '';

	let openaiToken = '';

	$: result = `${type}(${issueNo}): ${message}`;

	function OpenaiFetchAPI() {
		console.log('Calling GPT 3.5 Turbo');
		const url = 'https://api.openai.com/v1/chat/completions';
		const messages = [
			{
				role: 'user',
				content: `Please output all non proper noun text in lowercase without quotation marks.`,
			},
			{
				role: 'user',
				content: `Translate the following text into English: ${message}`,
			},
		];

		if (!openaiToken) {
			alert('請輸入 OpenAI Token 才可進行翻譯！');
			return;
		}
		fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${openaiToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages,
				max_tokens: 50,
				temperature: 0,
				top_p: 1,
				n: 1,
				stream: false,
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				message = data.choices[0].message.content;
			})
			.catch((error) => {
				console.log('Something bad happened ' + error);
			});
	}

	function testSendMessage() {
		chrome.runtime.sendMessage({ command: 'hello', message: 'hola' }, (response) => {
			if (!response.success) {
				console.log('error sending message', response);
			} else {
				console.log('Sucesss ::: ', response.message);
			}
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
	<button on:click={testSendMessage}>訊息傳送測試</button>

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
		background-color: #fcfaf2;
	}

	input#message,
	input#openai-token {
		width: 100%;
		box-sizing: border-box;
	}
</style>
