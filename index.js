let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

        const itemInput = document.getElementById('item-input');
        const addBtn = document.getElementById('add-btn');
        const shoppingListEl = document.getElementById('shopping-list');
        const clearBtn = document.getElementById('clear-btn');
        function renderList() {
            shoppingListEl.innerHTML = '';
            shoppingList.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name}</span>
                    <div>
                        <button class="purchase-btn">${item.purchased ? 'Unpurchase' : 'Purchase'}</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
                if (item.purchased) {
                    li.classList.add('purchased');
                }

                li.querySelector('.purchase-btn').addEventListener('click', () => {
                    shoppingList[index].purchased = !shoppingList[index].purchased;
                    saveToLocalStorage();
                    renderList();
                });

                li.querySelector('.delete-btn').addEventListener('click', () => {
                    shoppingList.splice(index, 1);
                    saveToLocalStorage();
                    renderList();
                });

                shoppingListEl.appendChild(li);
            });
        }
        function saveToLocalStorage() {
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        }
        function loadFromLocalStorage() {
            const storedList = localStorage.getItem('shoppingList');
            if (storedList) {
                shoppingList = JSON.parse(storedList);
            } else {
                shoppingList = [];
            }
        }
        addBtn.addEventListener('click', () => {
            const itemName = itemInput.value.trim();
            if (itemName !== '') {
                shoppingList.push({ name: itemName, purchased: false });
                saveToLocalStorage();
                renderList();
                itemInput.value = '';
            }
        });
        clearBtn.addEventListener('click', () => {
            shoppingList = [];
            saveToLocalStorage();
            renderList();
        }); 
        loadFromLocalStorage();
        renderList();
