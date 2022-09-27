const loadUserConfig = () => {
    const loginLi = document.getElementById("login-link");
    const logoutLi = document.getElementById("logout-link");

    const user = localStorage.getItem("loggedUser");
    if (user == undefined) {
        loginLi.style.display = 'block';
        logoutLi.style.display = 'none';
    } else {
        loginLi.style.display = 'none';
        logoutLi.style.display = 'block';

        const userInfo = JSON.parse(user);
        document.getElementById("user-fullname").innerText = userInfo.name;
    }
};

const isAdmin = () => {
    const user = localStorage.getItem("loggedUser");
    if (user == undefined) {
        return false;
    }

    const userInfo = JSON.parse(user);
    return userInfo.admin;
};

loadUserConfig();

const contadorVisitas = async () => {
    const contador = document.getElementById("contador");

    if (contador != undefined) {
        // let response = await fetch("/api/contador", {
        //     method: 'POST'
        // });


        // if (response.ok) {
        //     let value = await response.text();
        //     console.log('Contador', value);

        //     contador.innerText = value;
        //     document.getElementById("padre-contador").style.display = 'block'; 
        // } else {
        //     console.log('error');
        // }

        fetch("/api/contador", { method: 'POST' })
            .then(response => response.text())
            .then(value => {
                contador.innerText = value;
                document.getElementById("padre-contador").style.display = 'block';
            });
    }
}

contadorVisitas();

const logout = () => {
    localStorage.removeItem("loggedUser");

    loadUserConfig();
};

const updateCart = () => {
    let items = localStorage.getItem("cart");
    if (items == undefined) {
        items = new Map();
    } else {
        items = new Map(Object.entries(JSON.parse(items)));
    }

    const cartBadge = document.getElementById("cart-count");
    let total = 0;
    if (items.size > 0) {
        total = Array.from(items)
            .map(([key, value]) => value)
            .reduce((a, b) => a + b);
    }
    console.log("total", total);
    cartBadge.innerText = total;
}

updateCart();