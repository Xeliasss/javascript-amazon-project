export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];


function getDeliveryOption(deliveryOptionId) {

    let deliveryOptions

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOptions = option;
        }
    })
    return deliveryOption || deliveryOptions[0];
}