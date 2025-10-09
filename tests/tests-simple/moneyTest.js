import  {formatCurrency} from '../../scripts/utils/money.js';

console.log('test suite: formatCurrency');
 
console.log('converts cents to dollars and cents string');

if (formatCurrency(2095) === '20.95') {
    console.log('formatCurrency test passed');
}else{
    console.error('formatCurrency test failed');
}

console.log('works with 0');

if (formatCurrency(0) === '0.00') {
    console.log('formatCurrency test passed');
}else{
    console.error('formatCurrency test failed');
}

console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {
    console.log('formatCurrency test passed');
}else{
    console.error('formatCurrency test failed');
}
if (formatCurrency(2000.4) === '20.00') {
    console.log('formatCurrency test passed');
}else{
    console.error('formatCurrency test failed');
}