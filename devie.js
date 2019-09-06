class Content {
	constructor(group, texts) {
		this.group = group;
		this.texts = texts;
	}

	print() {
		if(group) {
			console.group(this.group);
		}

		this.texts.forEach(console.log);

		if(group) {
			console.groupEnd(this.group);
		}
	}
}

class WatchCenter {
	static send(ldap, message) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			
		};

		xhr.open('POST', 'http://api.noti.daumkakao.io/send/personal/kakaotalk');
		xhr.send(`to=${ldap}&msg=${encodeURIComponent(message)}`);
	}
}

class DevNewbie {
	constructor(name) {
		this.checkName(name);
		this.initName(name);
		this.welcome();
		this.steps = new Steps();
	}

	checkName(name) {
		if(!name.match(/[\w\d]+\.[\w\d]+/gi)) {
			throw '"아이디.확장자" 형식으로 입력해 주세요.';
		}
	}

	initName(name) {
		this.ldap = name;
		this.name = name.replace(/^(\w)(\w+).*/gi, (input, first, second) => first.toUpperCase() + second);;
	}

	welcome() {
		console.log('%c환영해요. %s! 개발의 세계로 오신 것을 환영합니다 😀', 'font-size: 20pt', this.name);
	}

	start() {
		this.steps.printAndIncrease();
	}

	next() {
		this.steps.printAndIncrease();
	}

	static renderTemplate(leave) {
		let template = document.importNode(document.querySelector('#template'), true).content;
		template.querySelector('#user').innerText = leave.ldapId;
		template.querySelector('#type').innerText = leave.leaveTypeLabel;
		template.querySelector('#period').innerText = leave.schedule;
		return template;
	}

	static getLeaveRequests(handler, page = 1) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == XMLHttpRequest.DONE) {
				if(xhr.status == 200) {
					let response = JSON.parse(xhr.responseText);
					response.content.forEach(handler);
				} else {
					console.log('정상적인 응답 코드가 아니예요. ' + xhr.status);
				}
			}
		}

		xhr.open('GET', 'http://mojito.dev.9rum.cc:18080/api/agit/leave-request/posts?page=1');
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send(null);
	}

	static handleLeave(leave) {
		let rendered = DevNewbie.renderTemplate(leave);
		document.querySelector('#leaves').appendChild(rendered);
	}
}