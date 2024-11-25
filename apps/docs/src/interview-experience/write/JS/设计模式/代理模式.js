class User {
	constructor(name) {
		this.name = name;
		this.status = "offline";
		this.followers = [];
	}

	subscribe(user, notify) {
		user.followers.push({ user, notify });
	}

	online() {
		this.status = "online";
	}
}

export const createProxyUser = (name) => {
	const user = new User(name);

	const proxyUser = new Proxy(user, {
		set: (target, prop, value) => {
			target[prop] = value;
			if (prop === "status") {
				notifyStatusHandlers();
			}
		},
	});

	const notifyStatusHandlers = (user, status) => {
		if (status === "online") {
			user.followers.forEach(({ notify }) => {
				notify(user);
			});
		}
	};

	return proxyUser;
};
