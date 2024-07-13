class fetchUser {
    async authorize(initdata:string, invcitCode:number): Promise<any> {
		const response = await fetch('https://api.bebracoin.com/authorize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// Данные, которые необходимо отправить на сервер
				initdata: initdata,
				invitCode: invcitCode,
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}
	async sniff_bebra(userId:number, sign: string): Promise<any> {
		const response = await fetch('https://api.bebracoin.com/sniff_bebra', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// Данные, которые необходимо отправить на сервер
				userId: userId,
				sign: sign,
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}

	async waiting_for_payment(userId:number, sign: string): Promise<any> {
		const response = await fetch('https://api.bebracoin.com/waiting_for_payment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// Данные, которые необходимо отправить на сервер
				userId: userId,
				sign: sign,
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}


	async request_payout(userId:number, sign: string): Promise<any> {
		const response = await fetch('https://api.bebracoin.com/request_payout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// Данные, которые необходимо отправить на сервер
				userId: userId,
				sign: sign,
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}

	
}



export const FetchUser = new fetchUser();
