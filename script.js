document.addEventListener("DOMContentLoaded", function() {

    const addToOrderButtons = document.querySelectorAll('.btn.btn-info');
    
    addToOrderButtons.forEach(function(button) {
        button.addEventListener('click', function() {

            const parentCard = button.closest('.card-body');

            const productName = parentCard.querySelector('b').innerText;

            const quantity = parseInt(parentCard.querySelector('input[name="quantity"]').value);

            const pricePerItem = parseFloat(productName.split(' - ')[1].split(' ')[0]);
            const totalPrice = pricePerItem * quantity;


            const orderedItemCard = document.createElement('div');
            orderedItemCard.classList.add('card', 'mt-4');

            const orderedItemCardBody = document.createElement('div');
            orderedItemCardBody.classList.add('card-body');


            orderedItemCardBody.innerHTML = `<p>${productName} - ${quantity} item/s (${totalPrice} PHP)</p>`;


            document.querySelector('#ordered-items').appendChild(orderedItemCard);
            orderedItemCard.appendChild(orderedItemCardBody);
        });
    });


    const voidItemButton = document.getElementById('void-item');
    voidItemButton.addEventListener('click', function() {
        const orderedItemsContainer = document.getElementById('ordered-items');
        const lastItem = orderedItemsContainer.lastElementChild;
        if (lastItem) {
            orderedItemsContainer.removeChild(lastItem);
        }
    });


    const payButton = document.getElementById('pay');
    payButton.addEventListener('click', function() {
        const cashInput = document.getElementById('cash');
        const cashAmount = parseFloat(cashInput.value);
        const totalAmount = calculateTotalAmount();

        if (cashAmount >= totalAmount) {
            const change = cashAmount - totalAmount;
            alert(`Payment successful! Change: ${change.toFixed(2)} PHP`);
            clearOrderedItems(); // Optionally clear ordered items after payment
        } else {
            alert('Insufficient amount!');
        }
    });


    function calculateTotalAmount() {
        let total = 0;
        const orderedItems = document.querySelectorAll('#ordered-items .card-body p');
        orderedItems.forEach(function(item) {
            const totalPriceString = item.innerText.split('(')[1].split(' ')[0];
            const totalPrice = parseFloat(totalPriceString);
            total += totalPrice;
        });
        return total;
    }


    function clearOrderedItems() {
        const orderedItemsContainer = document.getElementById('ordered-items');
        orderedItemsContainer.innerHTML = ''; // Clear the content
    }
});
