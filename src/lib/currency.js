export const currency = function(number){
    return new Intl.NumberFormat('en-HN', {style: 'decimal',currency: 'HNL', minimumFractionDigits: 2}).format(number);
};
