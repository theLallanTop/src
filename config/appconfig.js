const environment = {
  development: {
    isProduction: false,
    apiUrl: 'http://ec2-35-154-173-252.ap-south-1.compute.amazonaws.com',
    accessCode: 'AVLR70ED20AW10RLWA',
    rsaKey: 'http://ec2-35-154-173-252.ap-south-1.compute.amazonaws.com/payment',
    redirect_url: 'http://ec2-35-154-173-252.ap-south-1.compute.amazonaws.com/payment/redirect-url',
    cancel_url: 'http://ec2-35-154-173-252.ap-south-1.compute.amazonaws.com/payment/redirect-url',
    merchantId: '127192'

  },
  production: {
    isProduction: true,
    apiUrl: 'http://ec2-35-154-173-252.ap-south-1.compute.amazonaws.com',
    accessCode: 'AVLR70ED20AW10RLWA',
    rsaKey: 'http://ec2-35-154-173-252.ap-south-1.compute.amazonaws.com/payment',
    redirect_url: 'http://ec2-35-154-173-252.ap-south-1.compute.amazonaws.com/payment/redirect-url',
    cancel_url: 'http://ec2-35-154-173-252.ap-south-1.compute.amazonaws.com/payment/redirect-url',
    merchantId: '127192'
  }
}[process.env.NODE_ENV || 'development'];

let AuthToken;
let OrderId;



module.exports = Object.assign(
  {},
  environment,

);
